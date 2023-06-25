import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

const UrutanPage = (props) => {
    const [updatedUrutan, setUpdatedUrutan] = useState({});
    const [data, setData] = useState(props.data);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    useEffect(() => {
        axios.get(`/get_urutan?date=${formattedDate}`).then((response) => {
            setData(response.data);
        });
    }, [formattedDate]);

    const handleSave = () => {
        axios
            .post("/urutan", updatedUrutan)
            .then(function (response) {
                toast.success("Urutan berhasil di update!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                axios
                    .get(`/get_urutan/?date=${formattedDate}`)
                    .then(function (response) {
                        setData(response.data);
                    });
            })
            .catch(function (error) {
                console.error(error);
                toast.error("Urutan gagal di update!", {
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

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formatted = selectedDate.toLocaleDateString("en-GB", options);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Urutan Kiriman
                </h2>
            }
        >
            <Head title="Urutan Kiriman" />

            <ToastContainer />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                    <div className="flex justify-between">
                        <div className="p-6 text-gray-900">
                            <div className="flex gap-4 items-center">
                                <div className="font-bold">Tanggal</div>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                                <thead>
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                            Nama
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                            No Telp
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                            Alamat
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                            Link Maps
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                            Type/Status
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                            Kecamatan
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                            Urutan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                    {item.nama_penerima}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <a
                                                        href={`https://wa.me/${
                                                            item.no_telp_penerima.startsWith(
                                                                "0"
                                                            )
                                                                ? "62" +
                                                                  item.no_telp_penerima.substring(
                                                                      1
                                                                  )
                                                                : item.no_telp_penerima
                                                        }`}
                                                        target="_blank"
                                                        className="hover:underline"
                                                    >
                                                        {item.no_telp_penerima}
                                                    </a>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    {item.alamat}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    {item.link_maps !== null ? (
                                                        <a
                                                            href={`https://${item.link_maps}`}
                                                            target="_blank"
                                                            className="hover:underline"
                                                        >
                                                            Klik Disini
                                                        </a>
                                                    ) : (
                                                        <p>
                                                            Tidak ada Link Maps
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <span
                                                        className={`text-xs inline-block py-1 ml-2 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${
                                                            item.type ==
                                                            "Pickup"
                                                                ? "bg-orange-600"
                                                                : item.type ==
                                                                  "Kirim"
                                                                ? "bg-purple-600"
                                                                : "bg-blue-600"
                                                        }`}
                                                        style={{
                                                            width: "6rem",
                                                        }}
                                                    >
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    {item.kecamatan
                                                        ? item.kecamatan
                                                        : "Tidak ada kecamatan"}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <input
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-12 p-2.5"
                                                        value={
                                                            updatedUrutan[
                                                                item.id
                                                            ] || item.urutan
                                                        }
                                                        type="number"
                                                        onChange={(e) =>
                                                            setUpdatedUrutan({
                                                                ...updatedUrutan,
                                                                [item.id]:
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ),
                                                            })
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {data.length == 0 ? (
                                <div className="p-6 text-base font-bold">
                                    Tidak ada kiriman untuk tanggal {formatted}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    {data.length > 0 ? (
                        <button
                            onClick={handleSave}
                            type="button"
                            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Simpan Urutan
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UrutanPage;
