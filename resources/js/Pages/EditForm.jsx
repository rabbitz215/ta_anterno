import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditTujuan from "./EditTujuan";
import Tujuan from "./Tujuan";

const EditForm = ({ shipment, onDeleteDestination, selectedDate }) => {
    const latitudeRegex = /@(-?\d+\.?\d*),/;
    const longitudeRegex = /,(-?\d+\.?\d*)/;

    const [noTelp, setNoTelp] = useState(shipment.customer.no_telp);
    const [nama, setNama] = useState(shipment.customer.nama);
    const [alamat, setAlamat] = useState(shipment.alamat);
    const [linkMap, setLinkMap] = useState(shipment.link_maps);
    const [statusShipment, setStatusShipment] = useState(
        shipment.status_shipment
    );
    const [totalHarga, setTotalHarga] = useState(shipment.total_harga);
    const [hargaSingle, setHargaSingle] = useState(0);
    const [hargaMultiple, setHargaMultiple] = useState(0);

    const [shipmentId, setShipmentId] = useState(shipment.id);
    const [customerId, setCustmerId] = useState(shipment.customer.id);

    const [tujuanCount, setTujuanCount] = useState(0);
    const [urutan, setUrutan] = useState(1);

    const [isEdit, setIsEdit] = useState(false);

    const [destinations, setDestinations] = useState(shipment.destinations);

    useEffect(() => {
        getHarga();
    }, []);

    const getHarga = () => {
        axios.get("/get_harga").then(function (response) {
            response.data.map((item) => {
                setHargaSingle(item.kiriman_single);
                setHargaMultiple(item.kiriman_multiple);
            });
        });
    };

    const handleHarga = () => {
        if (shipment.destinations.length === 0) {
            setTotalHarga(hargaSingle);
        } else {
            if (totalHarga === hargaSingle) {
                setTotalHarga(hargaMultiple * 2);
            } else {
                setTotalHarga(totalHarga + hargaMultiple);
            }
        }
    };

    const handleKurangHarga = () => {
        if (destinations.length === 0 || destinations.length === 2) {
            setTotalHarga(totalHarga - hargaSingle);
        } else {
            setTotalHarga(totalHarga - hargaMultiple);
        }
    };

    const handleEdit = (e) => {
        e.preventDefault();

        setIsEdit(true);
    };

    const handleCloseEdit = (e) => {
        e.preventDefault();

        onDeleteDestination();
        setTujuanCount(0);
        setTotalHarga(shipment.total_harga);
        setIsEdit(false);
    };

    const handleAddTujuan = () => {
        setDestinations((prevDestinations) => [
            ...prevDestinations,
            {
                destinationUniqueId: prevDestinations.length + 1,
                id: null,
                nama_penerima: "",
                no_telp_penerima: "",
                alamat: "",
                link_maps: "",
                type: "Kirim",
                latitude: null,
                longitude: null,
                sedang_dikirim_timestamps: null,
                sudah_dikirim_timestamps: null,
                tanggal_kiriman: selectedDate,
                urutan: null,
                status: "Belum Dikirim",
                photo: "",
                shipment_id: shipmentId,
            },
        ]);
        handleHarga();
    };

    const removeTujuan = () => {
        setTujuanCount(tujuanCount - 1);
        handleKurangHarga();
    };

    const handleSaveShipment = (e) => {
        e.preventDefault();
        const destinationLinkMaps = linkMap;
        const destinationLatitudeMatch = destinationLinkMaps
            ? destinationLinkMaps.match(latitudeRegex)
            : null;
        const destinationLongitudeMatch = destinationLinkMaps
            ? destinationLinkMaps.match(longitudeRegex)
            : null;
        const destinationCoordinates =
            destinationLatitudeMatch && destinationLongitudeMatch
                ? parseFloat(destinationLatitudeMatch[1]) +
                  "," +
                  parseFloat(destinationLongitudeMatch[1])
                : null;

        axios
            .post(`/shipments/${shipmentId}`, {
                no_telp: noTelp,
                nama: nama,
                alamat: alamat,
                link_maps: linkMap,
                total_harga: totalHarga,
                latlng: destinationCoordinates,
                updatedDestinations: destinations,
                tanggal_kiriman: selectedDate,
            })
            .then(function (response) {
                toast.success("Shipment berhasil di update!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch(function (error) {
                toast.error("Sorry, Shipment gagal di update!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
    };

    const handleRemoveShipment = (e) => {
        e.preventDefault();

        axios
            .delete(`/shipments/${shipmentId}`)
            .then(function (response) {
                toast.success("Shipment berhasil di hapus!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                onDeleteDestination();
            })
            .catch(function (response) {
                toast.error("Shipment gagal di hapus!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
    };

    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(money);
    };

    return (
        <>
            <div className="p-6 my-4 h-auto">
                <div className="ml-0 md:ml-3 mb-4">
                    <span className="text-base font-bold">
                        Status Shipment :{" "}
                    </span>
                    <span
                        className={`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${
                            statusShipment == "Not Completed"
                                ? "bg-red-600"
                                : "bg-green-600"
                        }`}
                        style={{ width: "6rem" }}
                    >
                        {statusShipment}
                    </span>
                </div>
                <form>
                    <div className="grid md:grid-cols-5">
                        <div className="form-group mb-6 md:mx-3 relative">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                No Telp
                            </label>
                            <div className="flex">
                                {isEdit ? (
                                    <input
                                        value={noTelp}
                                        onChange={(e) =>
                                            setNoTelp(e.currentTarget.value)
                                        }
                                        type="number"
                                        className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="No Telp Penerima"
                                    ></input>
                                ) : (
                                    <p>
                                        <a
                                            href={`https://wa.me/${
                                                noTelp.startsWith("0")
                                                    ? "62" + noTelp.substring(1)
                                                    : noTelp
                                            }?text=Link check paket : https://anterno.id/cekpaket/${noTelp}`}
                                            target="_blank"
                                        >
                                            {noTelp}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Nama
                            </label>
                            {isEdit ? (
                                <input
                                    value={nama}
                                    onChange={(e) =>
                                        setNama(e.currentTarget.value)
                                    }
                                    type="text"
                                    className="form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Nama"
                                ></input>
                            ) : (
                                <p>{nama}</p>
                            )}
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Alamat
                            </label>
                            {isEdit ? (
                                <input
                                    value={alamat}
                                    onChange={(e) =>
                                        setAlamat(e.currentTarget.value)
                                    }
                                    type="text"
                                    className="form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Alamat"
                                ></input>
                            ) : (
                                <p>{alamat}</p>
                            )}
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Link Maps
                            </label>
                            {isEdit ? (
                                <input
                                    value={linkMap}
                                    onChange={(e) =>
                                        setLinkMap(e.currentTarget.value)
                                    }
                                    type="text"
                                    className="form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Link Maps"
                                ></input>
                            ) : linkMap ? (
                                <p>
                                    <a href={linkMap} target="_blank">
                                        Klik Disini
                                    </a>
                                </p>
                            ) : (
                                <>
                                    <p>
                                        <a href={linkMap} target="_blank">
                                            Tidak ada link Maps
                                        </a>
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700 md:pb-4"></label>
                            <div className="flex flex-col md:flex-col lg:flex-row">
                                {isEdit == false ? (
                                    <button
                                        onClick={(e) => handleEdit(e)}
                                        type="button"
                                        className="px-6 lg:mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    ""
                                )}
                                {isEdit == false ? (
                                    <button
                                        onClick={(e) => handleRemoveShipment(e)}
                                        type="button"
                                        className="px-6 mt-3 lg:mt-0 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Delete
                                    </button>
                                ) : (
                                    ""
                                )}
                                {isEdit && (
                                    <button
                                        onClick={(e) => handleSaveShipment(e)}
                                        type="button"
                                        className="px-6 lg:mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Simpan
                                    </button>
                                )}
                                {isEdit && (
                                    <button
                                        onClick={(e) => handleCloseEdit(e)}
                                        type="button"
                                        className="px-6 py-2.5 mt-3 lg:mt-0 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-6 md:mx-3">
                        {isEdit && (
                            <button
                                onClick={(e) => handleAddTujuan(e)}
                                type="button"
                                className="px-6 mt-3 md:mt-0 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                <i className="fa-regular fa-plus"></i> Add
                                tujuan
                            </button>
                        )}
                    </div>
                </form>
                {!isEdit && (
                    <div className="px-3 mb-2 grid grid-cols-3 md:grid-cols-5">
                        <div className="font-bold">No Telp</div>
                        <div className="font-bold">Nama Penerima</div>
                        <div className="font-bold">Alamat</div>
                        <div className="font-bold">Type</div>
                        <div className="font-bold">Status</div>
                    </div>
                )}
                {!isEdit &&
                    destinations.map((destination, index) => {
                        return (
                            <div
                                key={index}
                                className="p-3 grid grid-cols-3 md:grid-cols-5"
                            >
                                <div className="mb-2">
                                    {destination.no_telp_penerima}
                                </div>
                                <div className="mb-2">
                                    {destination.nama_penerima}
                                </div>
                                <div className="mb-2">{destination.alamat}</div>
                                <div className="mb-2">
                                    <span
                                        className={`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${
                                            destination.type == "Pickup"
                                                ? "bg-orange-600"
                                                : destination.type == "Kirim"
                                                ? "bg-purple-600"
                                                : "bg-blue-600"
                                        }`}
                                        style={{ width: "6rem" }}
                                    >
                                        {destination.type}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span
                                        className={`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${
                                            destination.status ==
                                            "Belum Dikirim"
                                                ? "bg-red-600"
                                                : destination.status ==
                                                  "Sedang Dikirim"
                                                ? "bg-orange-500"
                                                : "bg-green-600"
                                        }`}
                                        style={{ width: "6rem" }}
                                    >
                                        {destination.status}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                {isEdit &&
                    destinations.map((destination, index) => (
                        <>
                            <hr></hr>
                            <EditTujuan
                                index={index}
                                destinations={destinations}
                                setDestinations={setDestinations}
                                destination={destination}
                                hargaSingle={hargaSingle}
                                hargaMultiple={hargaMultiple}
                                totalHarga={totalHarga}
                                onDeleteDestination={onDeleteDestination}
                                shipmentId={shipmentId}
                                setTotalHarga={setTotalHarga}
                                urutan={urutan}
                                destinationUniqueId={
                                    destination.destinationUniqueId
                                }
                            />
                        </>
                    ))}
                {/* {Array.from({ length: tujuanCount }).map((_, index) => (
                    <Tujuan
                        key={index}
                        totalHarga={totalHarga}
                        urutan={urutan}
                        customerId={customerId}
                        shipmentId={shipmentId}
                        removeTujuan={removeTujuan}
                    />
                ))} */}
                {isEdit && shipment.destinations.length && (
                    <p className="form-label text-gray p-4">
                        Total Harga : {formatRupiah(totalHarga)}
                    </p>
                )}
            </div>
        </>
    );
};

export default EditForm;
