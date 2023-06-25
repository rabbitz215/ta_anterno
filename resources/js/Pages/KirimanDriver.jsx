import axios from "axios";
import Compressor from "compressorjs";
import React, { useState } from "react";
import { useGeolocated } from "react-geolocated";
import { toast } from "react-toastify";

const KirimanDriver = ({ item, onSave }) => {
    const [status, setStatus] = useState(item.status);

    const [file, setFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleFileInputChange = async (event) => {
        setFile(event.target.files[0]);
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
    };

    const { coords, getPosition, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000,
        forceRequest: true,
    });

    const handleUploadClick = async () => {
        if (file == null) {
            toast.warning("Silahkan pilih foto terlebih dahulu", {
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
            new Compressor(file, {
                quality: 0.6,
                success: async (compressedImage) => {
                    const formData = new FormData();

                    formData.append("file", compressedImage);

                    if (coords) {
                        formData.append("latitude", coords.latitude);
                        formData.append("longitude", coords.longitude);
                    }

                    setIsLoading(true);
                    try {
                        await axios
                            .post(`/upload_foto/${item.id}`, formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            })
                            .then(function (response) {
                                toast.success("Foto bukti berhasil di upload", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                });
                                setFile(null);
                                setPreviewURL(null);
                            })
                            .catch(function (error) {
                                console.log(error.message);
                                toast.error("Foto bukti gagal di upload", {
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
                            .finally(() => {
                                setIsLoading(false);
                                onSave();
                            });
                    } catch (error) {
                        console.log(error);
                    }
                },
            });
        }
    };

    const handleStatusChange = async () => {
        const newStatus =
            status === "Sedang Dikirim" ? "Sudah Dikirim" : "Sedang Dikirim";
        setIsLoading(true);
        await axios
            .put(`/update_status/${item.id}`, {
                status: newStatus,
            })
            .then(function (response) {
                toast.success("Status berhasil di rubah", {
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
                console.log(error.message);
                toast.error("Shipment tidak berhasil di rubah", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setStatus(item.status);
            })
            .finally(() => {
                setStatus(newStatus);
                setIsLoading(false);
                onSave();
            });
    };

    return (
        <div className="bg-white my-2 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-4 md:p-0 my-2 h-auto">
                <form>
                    <div
                        className={`grid grid-cols-2 md:grid-cols-4 ${
                            !isGeolocationEnabled
                                ? "lg:grid-cols-9"
                                : "lg:grid-cols-8"
                        }`}
                    >
                        <div className="form-group mb-6 md:mx-3 relative">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                No Telp
                            </label>
                            <div className="flex">
                                <a
                                    className="font-bold"
                                    href={`https://wa.me/${
                                        item.no_telp_penerima.startsWith("0")
                                            ? "62" +
                                              item.no_telp_penerima.substring(1)
                                            : item.no_telp_penerima
                                    }`}
                                    target="_blank"
                                >
                                    {item.no_telp_penerima}
                                </a>
                            </div>
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Nama
                            </label>
                            <p className="font-bold">{item.nama_penerima}</p>
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Alamat
                            </label>
                            <p className="font-bold">{item.alamat}</p>
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Link Maps
                            </label>
                            <p className="font-bold">
                                <a href={item.link_maps} target="_blank">
                                    Klik disini
                                </a>
                            </p>
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Type Kiriman
                            </label>
                            <span
                                className={`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${
                                    item.type == "Pickup"
                                        ? "bg-orange-600"
                                        : item.type == "Kirim"
                                        ? "bg-purple-600"
                                        : "bg-blue-600"
                                }`}
                                style={{ width: "6rem" }}
                            >
                                {item.type}
                            </span>
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Status Kiriman
                            </label>
                            <span
                                className={`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${
                                    item.status == "Belum Dikirim"
                                        ? "bg-red-600"
                                        : item.status == "Sedang Dikirim"
                                        ? "bg-orange-500"
                                        : "bg-green-600"
                                }`}
                                style={{ width: "6rem" }}
                            >
                                {item.status}
                            </span>
                        </div>
                        <div className="form-group mb-6 md:mx-3">
                            <label className="form-label inline-block mb-2 text-gray-700">
                                Photo Bukti
                            </label>
                            {item.photo == "" || item.photo == null ? (
                                <p>No Photo</p>
                            ) : (
                                <img
                                    src={`./uploads/${item.photo}`}
                                    className="w-24"
                                ></img>
                            )}
                        </div>
                        {!isGeolocationEnabled && (
                            <div className="form-group mb-6 md:mx-3">
                                <label className="form-label inline-block mb-2 text-gray-700">
                                    Location permission
                                </label>
                                <div>
                                    Location is not enabled by the user.{" "}
                                    <button
                                        onClick={getPosition}
                                        type="button"
                                        className="inline-block my-2 px-6 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Enable Location
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="form-group md:mx-3">
                            <div className="flex flex-col md:flex-col">
                                {status === "Sudah Dikirim" ? (
                                    isLoading ? (
                                        <>
                                            <div role="status">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentFill"
                                                    />
                                                </svg>
                                                <span className="sr-only">
                                                    Loading...
                                                </span>
                                            </div>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <input
                                                accept="image/*,capture=camera"
                                                capture="camera"
                                                type="file"
                                                onChange={handleFileInputChange}
                                            />
                                            {previewURL && (
                                                <img
                                                    src={previewURL}
                                                    alt="Image Preview"
                                                    className="w-24 mt-2"
                                                />
                                            )}
                                            <button
                                                onClick={() =>
                                                    handleUploadClick()
                                                }
                                                type="button"
                                                className="inline-block my-2 px-6 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >
                                                Upload Foto
                                            </button>
                                        </>
                                    )
                                ) : isLoading ? (
                                    <>
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                        Loading...
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className={`inline-block my-2 px-6 py-1.5 bg-${
                                            status == "Belum Dikirim"
                                                ? "orange"
                                                : "green"
                                        }-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-${
                                            status == "Belum Dikirim"
                                                ? "orange"
                                                : "green"
                                        }-700 hover:shadow-lg focus:bg-${
                                            status == "Belum Dikirim"
                                                ? "orange"
                                                : "green"
                                        }-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-${
                                            status == "Belum Dikirim"
                                                ? "orange"
                                                : "green"
                                        }-800 active:shadow-lg transition duration-150 ease-in-out`}
                                        onClick={handleStatusChange}
                                    >
                                        {status === "Belum Dikirim"
                                            ? "Kirim"
                                            : "Selesai"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default KirimanDriver;
