import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Tujuan from "./Tujuan";

const FormKiriman = ({ shipments, selectedDate }) => {
    const latitudeRegex = /@(-?\d+\.?\d*),/;
    const longitudeRegex = /,(-?\d+\.?\d*)/;

    const [isDisabled, setIsDisabled] = useState(true);
    const [simpanDisabled, setSimpanDisabled] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);

    const [tujuanCount, setTujuanCount] = useState(0);

    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState("");

    const [shipmentId, setShipmentId] = useState("");

    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [alamat, setAlamat] = useState("");
    const [linkMap, setLinkMap] = useState("");

    const [urutan, setUrutan] = useState(1);

    const [totalHarga, setTotalHarga] = useState(0);
    const [hargaSingle, setHargaSingle] = useState(0);
    const [hargaMultiple, setHargaMultiple] = useState(0);

    const getHarga = () => {
        axios.get("/get_harga").then(function (response) {
            response.data.map((item) => {
                setHargaSingle(item.kiriman_single);
                setHargaMultiple(item.kiriman_multiple);
            });
        });
    };

    const handleHarga = () => {
        if (tujuanCount === 0) {
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
        if (totalHarga == hargaMultiple * 2) {
            setTotalHarga(hargaSingle);
        } else {
            setTotalHarga(totalHarga - hargaMultiple);
        }
    };

    const handleAddTujuan = () => {
        setTujuanCount(tujuanCount + 1);
        setUrutan(urutan + 1);
        handleHarga();
    };

    const getDestinations = () => {
        axios
            .get("/tujuan")
            .then(function (response) {
                if (response.data) {
                    setUrutan(urutan + 1 + response.data);
                } else {
                    setUrutan(2);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getDestinations();
        getHarga();
    }, []);

    const handleSaveCustomer = (e) => {
        e.preventDefault();
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

        if (mobileNumber == "") {
            toast.warning("Silahkan isi No telp terlebih dahulu", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (name == "") {
            toast.warning("Silahkan isi Nama terlebih dahulu", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (alamat == "") {
            toast.warning("Silahkan isi Alamat shipment terlebih dahulu", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            axios
                .post("/customer", {
                    nama: name,
                    no_telp: mobileNumber,
                })
                .then(function (response) {
                    setCustomerId(response.data.id);
                    axios
                        .post("/shipments", {
                            alamat: alamat,
                            link_maps: linkMap,
                            customer_id: response.data.id,
                            status_shipment: "Not Completed",
                            total_harga: hargaSingle,
                            tanggal_kiriman: formattedDate,
                        })
                        .then(function (response) {
                            setShipmentId(response.data.id);
                            const destinationLinkMaps = linkMap;
                            const destinationLatitudeMatch =
                                destinationLinkMaps.match(latitudeRegex);
                            const destinationLongitudeMatch =
                                destinationLinkMaps.match(longitudeRegex);
                            const destinationCoordinates =
                                destinationLatitudeMatch &&
                                destinationLongitudeMatch
                                    ? parseFloat(destinationLatitudeMatch[1]) +
                                      "," +
                                      parseFloat(destinationLongitudeMatch[1])
                                    : null;
                            setIsDisabled(false);
                            setTujuanCount(1);
                            setSimpanDisabled(true);
                            axios.post("/tujuan", {
                                nama_penerima: name,
                                no_telp_penerima: mobileNumber,
                                alamat_penerima: alamat,
                                link_maps: linkMap,
                                type: "Pickup",
                                status: "Belum Dikirim",
                                urutan: shipments.length == 0 ? 1 : urutan - 1,
                                shipment_id: response.data.id,
                                newTotalHarga: hargaSingle,
                                latlng: destinationCoordinates,
                                tanggal_kiriman: formattedDate,
                            });
                            toast.success("Shipment berhasil di buat", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            handleHarga();
                        })
                        .catch(function (err) {
                            toast.error("Sorry, Shipment gagal di buat!", {
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
                })
                .catch(function (err) {
                    toast.error("Sorry, Shipment gagal di buat!", {
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
        }
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);

        if (mobileNumber == "") {
            setCustomers([]);
        } else {
            axios.get("/load_customers").then(function (response) {
                var data = response.data;
                setCustomers(
                    data.filter((item) => item.no_telp.includes(mobileNumber))
                );
            });
        }
    };

    const removeTujuan = () => {
        if (tujuanCount === 1) {
            toast.warning("Minimal 1 tujuan", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            setTujuanCount(tujuanCount - 1);
            setUrutan(urutan - 1);
            handleKurangHarga();
        }
    };

    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(money);
    };

    return (
        <div className="p-6 h-auto">
            <form>
                <div className="grid md:grid-cols-5">
                    <div className="form-group mb-6 md:mx-3 relative">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            No Telp
                        </label>
                        <div className="flex">
                            <input
                                value={mobileNumber}
                                onChange={(e) =>
                                    setMobileNumber(e.currentTarget.value)
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
          rounded-l-lg
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="No Telp"
                            ></input>
                            <button
                                onClick={(e) => {
                                    toggleDropdown(e);
                                }}
                                className="inline-block px-4 py-1 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div
                            className={`left-0 w-full mt-2 ${
                                showDropdown ? "" : "hidden"
                            }`}
                        >
                            <ul className="bg-white border border-gray-300 rounded-b max-h-32 overflow-auto">
                                {customers.map((customer) => (
                                    <li
                                        key={customer.id}
                                        onClick={() => {
                                            setName(customer.nama);
                                            setShowDropdown(false);
                                            setMobileNumber(customer.no_telp);
                                            setAlamat(customer.address);
                                            setLinkMap(customer.link_maps);
                                        }}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {customer.no_telp}-{customer.nama}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="form-group mb-6 md:mx-3">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            Nama
                        </label>
                        <input
                            value={name}
                            onChange={(e) => {
                                setName(e.currentTarget.value);
                            }}
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
                    </div>
                    <div className="form-group mb-6 md:mx-3">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            Alamat
                        </label>
                        <input
                            value={alamat}
                            onChange={(e) => setAlamat(e.currentTarget.value)}
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
                    </div>
                    <div className="form-group mb-6 md:mx-3">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            Link Maps
                        </label>
                        <input
                            value={linkMap}
                            onChange={(e) => setLinkMap(e.currentTarget.value)}
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
                    </div>
                    <div className="form-group mb-6 md:mx-3">
                        <label className="form-label inline-block mb-2 text-gray-700 md:pb-4"></label>
                        <div className="flex flex-col md:flex-row">
                            {simpanDisabled ? (
                                ""
                            ) : (
                                <button
                                    onClick={handleSaveCustomer}
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Simpan
                                </button>
                            )}
                            {isDisabled ? (
                                ""
                            ) : (
                                <button
                                    onClick={handleAddTujuan}
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out md:ml-3"
                                >
                                    + Tujuan
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            <hr></hr>
            {Array.from({ length: tujuanCount }).map((_, index) => (
                <Tujuan
                    key={index}
                    totalHarga={totalHarga}
                    urutan={urutan}
                    customerId={customerId}
                    shipmentId={shipmentId}
                    removeTujuan={removeTujuan}
                    date={selectedDate}
                />
            ))}
            {tujuanCount > 0 && (
                <p className="form-label text-gray p-4">
                    Total Harga : {formatRupiah(totalHarga)}
                </p>
            )}
        </div>
    );
};

export default FormKiriman;
