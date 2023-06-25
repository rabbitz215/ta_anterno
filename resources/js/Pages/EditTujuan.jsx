import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const EditTujuan = ({
    destinations,
    setDestinations,
    destination,
    hargaSingle,
    hargaMultiple,
    shipmentId,
    totalHarga,
    setTotalHarga,
    urutan,
    destinationUniqueId,
}) => {
    const latitudeRegex = /@(-?\d+\.?\d*),/;
    const longitudeRegex = /,(-?\d+\.?\d*)/;

    const [namaPenerima, setNamaPenerima] = useState(destination.nama_penerima);
    const [noTelpPenerima, setNoTelpPenerima] = useState(
        destination.no_telp_penerima
    );
    const [alamatPenerima, setAlamatPenerima] = useState(destination.alamat);
    const [linkMapPenerima, setLinkMapPenerima] = useState(
        destination.link_maps
    );
    const [type, setType] = useState(destination.type);
    const [tujuanId, setTujuanId] = useState(destination.id);

    const [status, setStatus] = useState(destination.status);
    const [image, setImage] = useState(destination.photo);

    const [latitude, setLatitude] = useState(destination.latitude);
    const [longitude, setLongitude] = useState(destination.longitude);

    useEffect(() => {
        handleChanges();
    }, [
        namaPenerima,
        noTelpPenerima,
        alamatPenerima,
        linkMapPenerima,
        type,
        status,
    ]);

    const handleChanges = () => {
        const destinationLinkMaps = linkMapPenerima;
        const destinationLatitudeMatch = destinationLinkMaps
            ? destinationLinkMaps.match(latitudeRegex)
            : null;
        const destinationLongitudeMatch = destinationLinkMaps
            ? destinationLinkMaps.match(longitudeRegex)
            : null;

        setDestinations((prevDestinations) =>
            prevDestinations.map((dest) => {
                if (dest.shipment_id === shipmentId && dest.id === tujuanId) {
                    return {
                        ...dest,
                        id: tujuanId,
                        nama_penerima: namaPenerima,
                        no_telp_penerima: noTelpPenerima,
                        alamat: alamatPenerima,
                        link_maps: linkMapPenerima,
                        type: type,
                        latitude: destinationLatitudeMatch
                            ? parseFloat(destinationLatitudeMatch[1])
                            : null,
                        longitude: destinationLongitudeMatch
                            ? parseFloat(destinationLongitudeMatch[1])
                            : null,
                        status: status,
                        photo: image,
                        urutan: urutan,
                    };
                } else {
                    return dest;
                }
            })
        );
    };

    const handleRemoveDestination = async () => {
        if (destinations.length === 1) {
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
            setDestinations((prevDestinations) =>
                prevDestinations.filter((dest) => {
                    if (destinationUniqueId) {
                        return !(
                            dest.shipment_id === shipmentId &&
                            dest.id === tujuanId &&
                            dest.destinationUniqueId === destinationUniqueId
                        );
                    } else {
                        return !(
                            dest.shipment_id === shipmentId &&
                            dest.id === tujuanId
                        );
                    }
                })
            );
            if (destinations.length <= 2) {
                setTotalHarga(hargaSingle);
            } else {
                setTotalHarga(totalHarga - hargaMultiple);
            }
        }
    };

    return (
        <div className="grid md:grid-cols-4 lg:grid-cols-6 mt-3">
            <div className="form-group mb-6 md:mx-3">
                <label className="form-label inline-block mb-2 text-gray-700">
                    No Telp Penerima
                </label>
                <input
                    value={noTelpPenerima}
                    onChange={(e) => setNoTelpPenerima(e.currentTarget.value)}
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
            </div>
            <div className="form-group mb-6 md:mx-3">
                <label className="form-label inline-block mb-2 text-gray-700">
                    Nama Penerima
                </label>
                <input
                    value={namaPenerima}
                    onChange={(e) => setNamaPenerima(e.currentTarget.value)}
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
                    placeholder="Nama Penerima"
                ></input>
            </div>
            <div className="form-group mb-6 md:mx-3">
                <label className="form-label inline-block mb-2 text-gray-700">
                    Alamat
                </label>
                <input
                    value={alamatPenerima}
                    onChange={(e) => setAlamatPenerima(e.currentTarget.value)}
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
                    value={linkMapPenerima}
                    onChange={(e) => setLinkMapPenerima(e.currentTarget.value)}
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
                <label className="form-label inline-block mb-2 text-gray-700">
                    Type
                </label>
                <select
                    value={type}
                    onChange={(e) => setType(e.currentTarget.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                >
                    <option value="Kirim">Kirim</option>
                    <option value="Kirim & Pickup">Kirim & Pickup</option>
                </select>
            </div>
            <div className="form-group mb-6 md:mx-3">
                <label className="form-label inline-block mb-2 text-gray-700 md:pb-4"></label>
                <div className="flex flex-col md:flex-col lg:flex-row">
                    <button
                        onClick={() =>
                            handleRemoveDestination(destinationUniqueId)
                        }
                        type="button"
                        className="inline-block mt-3 lg:mt-0 lg:ml-3 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        <AiFillDelete />
                    </button>
                </div>
            </div>
            <div className="form-group mb-6 md:mx-3">
                <div className="flex flex-col">
                    {status !== null && (
                        <label className="form-label inline-block mb-2 text-gray-700">
                            Status
                        </label>
                    )}
                    <span
                        className={`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${
                            status == "Belum Dikirim"
                                ? "bg-red-600"
                                : status == "Sedang Dikirim"
                                ? "bg-orange-500"
                                : status == "Sudah Dikirim" && "bg-green-600"
                        }`}
                        style={{ width: "6rem" }}
                    >
                        {status}
                    </span>
                </div>
            </div>
            <div className="form-group mb-6 md:mx-3">
                {status == "Sudah Dikirim" && image !== null && (
                    <div className="flex flex-col">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            Photo
                        </label>
                        <img
                            src={`./uploads/${image}`}
                            className="w-20"
                            alt="Photo Bukti Kiriman"
                        />
                    </div>
                )}
            </div>
            {latitude && longitude && (
                <>
                    <div className="form-group mb-6 md:mx-3">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            Latitude Lokasi Photo
                        </label>
                        <p>{latitude}</p>
                    </div>
                    <div className="form-group mb-6 md:mx-3">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            Longitude Lokasi Photo
                        </label>
                        <p>{longitude}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default EditTujuan;
