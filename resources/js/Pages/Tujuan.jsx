import axios from "axios";
import moment from "moment/moment";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Tujuan = ({
    customerId,
    shipmentId,
    removeTujuan,
    urutan,
    totalHarga,
    date,
}) => {
    const [receiverName, setReceiverName] = useState("");
    const [receiverMobileNumber, setReceiverMobileNumber] = useState("");
    const [receiverAddress, setReceiverAddress] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [type, setType] = useState("Kirim");

    const latitudeRegex = /@(-?\d+\.?\d*),/;
    const longitudeRegex = /,(-?\d+\.?\d*)/;

    const handleSubmitTujuan = (e) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");

        if (receiverName == "") {
            toast.warning("Silahkan isi Nama Penerima !!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (receiverMobileNumber == "") {
            toast.warning("Silahkan isi No Telp Penerima !!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (receiverAddress == "") {
            toast.warning("Silahkan isi Alamat Penerima !!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (type == "") {
            toast.warning("Silahkan pilih type pengiriman !!", {
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
            e.preventDefault();
            const destinationLinkMaps = mapLink;
            const destinationLatitudeMatch =
                destinationLinkMaps.match(latitudeRegex);
            const destinationLongitudeMatch =
                destinationLinkMaps.match(longitudeRegex);
            const destinationCoordinates =
                destinationLatitudeMatch && destinationLongitudeMatch
                    ? parseFloat(destinationLatitudeMatch[1]) +
                      "," +
                      parseFloat(destinationLongitudeMatch[1])
                    : null;
            axios
                .post("/tujuan", {
                    nama_penerima: receiverName,
                    no_telp_penerima: receiverMobileNumber,
                    alamat_penerima: receiverAddress,
                    link_maps: mapLink,
                    customer_id: customerId,
                    type: type,
                    urutan: urutan,
                    status: "Belum Dikirim",
                    shipment_id: shipmentId,
                    newTotalHarga: totalHarga,
                    latlng: destinationCoordinates,
                    tanggal_kiriman: formattedDate,
                })
                .then(function (response) {
                    toast.success("Tujuan berhasil dibuat", {
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
                    toast.error("Sorry, Tujuan gagal di buat!", {
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

    return (
        <div className="grid md:grid-cols-6 mt-3">
            <div className="form-group mb-6 md:mx-3">
                <label className="form-label inline-block mb-2 text-gray-700">
                    No Telp Penerima
                </label>
                <input
                    value={receiverMobileNumber}
                    onChange={(e) =>
                        setReceiverMobileNumber(e.currentTarget.value)
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
            </div>
            <div className="form-group mb-6 md:mx-3">
                <label className="form-label inline-block mb-2 text-gray-700">
                    Nama Penerima
                </label>
                <input
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.currentTarget.value)}
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
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.currentTarget.value)}
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
                    value={mapLink}
                    onChange={(e) => setMapLink(e.currentTarget.value)}
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
                <div className="flex flex-col md:flex-row">
                    <button
                        onClick={(e) => handleSubmitTujuan(e)}
                        type="button"
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Simpan
                    </button>
                    <button
                        onClick={removeTujuan}
                        type="button"
                        className="inline-block mt-3 md:mt-0 md:ml-3 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tujuan;
