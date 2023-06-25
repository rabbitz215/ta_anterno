import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import Footer from "./Footer";
import MapPaket from "./MapPaket";
import Navbar from "./Navbar";
import PaketNotFound from "./PaketNotFound";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";
import "moment/locale/id";
import ReactPaginate from "react-paginate";
import "../../css/pagination.css";

const CekPaketHistory = (props) => {
    const [expandedIds, setExpandedIds] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const shipmentsPerPage = 5;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const pageCount = Math.ceil(
        Object.entries(props.shipments).length / shipmentsPerPage
    );

    const toggleExpanded = (id) => {
        if (expandedIds.includes(id)) {
            setExpandedIds(
                expandedIds.filter((existingId) => existingId !== id)
            );
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    };

    const isExpanded = (id) => {
        return expandedIds.includes(id);
    };

    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(money);
    };

    moment.locale("id-ID");
    return (
        <>
            <Head title="Cek Paket History" />
            <Navbar />
            <div className="min-h-screen">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                        <div className="flex md:ml-6 items-center gap-6 text-lg">
                            <Link
                                href={route("cekpaket", props.customer.no_telp)}
                                className={`relative text-black hover:text-red-500 ${
                                    route().current("cekpaket")
                                        ? "font-bold"
                                        : ""
                                }`}
                            >
                                Kiriman hari ini
                                {route().current("cekpaket") && (
                                    <div className="absolute left-0 bottom-0 w-full h-1 bg-red-500"></div>
                                )}
                            </Link>
                            <Link
                                href={route(
                                    "cekPaketHistory",
                                    props.customer.no_telp
                                )}
                                className={`relative text-black hover:text-red-500 ${
                                    route().current("cekPaketHistory")
                                        ? "font-bold"
                                        : ""
                                }`}
                            >
                                Riwayat
                                {route().current("cekPaketHistory") && (
                                    <div className="absolute left-0 bottom-0 w-full h-1 bg-red-500"></div>
                                )}
                            </Link>
                        </div>
                        {Object.entries(props.shipments).length > 0 ? (
                            Object.entries(props.shipments)
                                .slice(
                                    currentPage * shipmentsPerPage,
                                    (currentPage + 1) * shipmentsPerPage
                                )
                                .map(([date, shipments]) => (
                                    <div key={date} className="mt-6">
                                        <h2>
                                            Pengiriman tanggal :{" "}
                                            <span className="font-bold text-black">
                                                {moment(date).format(
                                                    "dddd, D MMMM YYYY"
                                                )}
                                            </span>
                                        </h2>
                                        {shipments.map((shipment) => (
                                            <div
                                                key={shipment.id}
                                                className="bg-[#F0F0F0] my-2 overflow-hidden shadow-sm rounded-lg sm:rounded-lg"
                                            >
                                                <div className="p-6">
                                                    <div>
                                                        <div
                                                            onClick={() =>
                                                                toggleExpanded(
                                                                    shipment.id
                                                                )
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex justify-between">
                                                                <div className="text-2xl font-bold">
                                                                    {
                                                                        props
                                                                            .customer
                                                                            .no_telp
                                                                    }
                                                                </div>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className={`h-6 w-6 transform ${
                                                                        isExpanded(
                                                                            shipment.id
                                                                        )
                                                                            ? "rotate-180"
                                                                            : ""
                                                                    }`}
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M19 9l-7 7-7-7"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <div
                                                                className={
                                                                    isExpanded(
                                                                        shipment.id
                                                                    )
                                                                        ? "mb-6"
                                                                        : "mb-0"
                                                                }
                                                            >
                                                                <div>
                                                                    Nama
                                                                    Pengirim:{" "}
                                                                    {
                                                                        props
                                                                            .customer
                                                                            .nama
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Alamat
                                                                    Pengirim:{" "}
                                                                    {
                                                                        shipment.alamat
                                                                    }
                                                                </div>
                                                                <div>
                                                                    Harga
                                                                    Pengiriman:{" "}
                                                                    {formatRupiah(
                                                                        shipment.total_harga
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {isExpanded(
                                                            shipment.id
                                                        ) && (
                                                            <div className="gap-2">
                                                                <div className="text-2xl font-bold">
                                                                    Informasi
                                                                    Penerima
                                                                </div>
                                                                {shipment.destinations.map(
                                                                    (
                                                                        destination,
                                                                        i
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className="bg-white my-2 overflow-hidden shadow-sm rounded-lg sm:rounded-lg"
                                                                        >
                                                                            <div className="md:flex md:justify-between">
                                                                                <div className="p-6">
                                                                                    <p className="mb-2 font-bold text-xl">
                                                                                        Paket
                                                                                        #
                                                                                        {i +
                                                                                            1}
                                                                                    </p>
                                                                                    <div className="text-base">
                                                                                        Nama
                                                                                        Penerima:{" "}
                                                                                        <div className="font-bold mb-2">
                                                                                            {
                                                                                                destination.nama_penerima
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="text-base">
                                                                                        No.
                                                                                        Telp
                                                                                        Penerima:{" "}
                                                                                        <div className="font-bold mb-2">
                                                                                            {
                                                                                                destination.no_telp_penerima
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="text-base">
                                                                                        Alamat
                                                                                        Penerima:{" "}
                                                                                        <div className="font-bold mb-2">
                                                                                            {
                                                                                                destination.alamat
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    {destination.latitude !==
                                                                                        null &&
                                                                                    destination.longitude !==
                                                                                        null ? (
                                                                                        <div className="text-base">
                                                                                            Map
                                                                                            Link:{" "}
                                                                                            <p className="font-bold mb-2">
                                                                                                <a
                                                                                                    href={`https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`}
                                                                                                    target="_blank"
                                                                                                >
                                                                                                    Klik
                                                                                                    Disini
                                                                                                </a>
                                                                                            </p>
                                                                                        </div>
                                                                                    ) : (
                                                                                        ""
                                                                                    )}
                                                                                    <div className="text-base">
                                                                                        Status:
                                                                                        <div>
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
                                                                                                style={{
                                                                                                    width: "6rem",
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    destination.status
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                        {destination.sedang_dikirim_timestamps && (
                                                                                            <div className="text-base font-bold mt-4 mb-2">
                                                                                                Jejak
                                                                                                waktu
                                                                                                pengiriman
                                                                                            </div>
                                                                                        )}
                                                                                        <p>
                                                                                            {destination.sedang_dikirim_timestamps &&
                                                                                                new Date(
                                                                                                    destination.sedang_dikirim_timestamps
                                                                                                ).toLocaleString(
                                                                                                    "en-GB",
                                                                                                    {
                                                                                                        day: "numeric",
                                                                                                        month: "long",
                                                                                                        year: "numeric",
                                                                                                        hour: "numeric",
                                                                                                        minute: "numeric",
                                                                                                        second: "numeric",
                                                                                                    }
                                                                                                )}
                                                                                            {destination.sedang_dikirim_timestamps !==
                                                                                            null ? (
                                                                                                <span
                                                                                                    className={`flex flex-col md:inline-block text-xs mt-2 md:mt-0 py-1 md:ml-2 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full bg-orange-500`}
                                                                                                    style={{
                                                                                                        width: "6rem",
                                                                                                    }}
                                                                                                >
                                                                                                    Sedang
                                                                                                    Dikirim
                                                                                                </span>
                                                                                            ) : (
                                                                                                ""
                                                                                            )}
                                                                                        </p>
                                                                                        <p className="mt-4">
                                                                                            {destination.sudah_dikirim_timestamps &&
                                                                                                new Date(
                                                                                                    destination.sudah_dikirim_timestamps
                                                                                                ).toLocaleString(
                                                                                                    "en-GB",
                                                                                                    {
                                                                                                        day: "numeric",
                                                                                                        month: "long",
                                                                                                        year: "numeric",
                                                                                                        hour: "numeric",
                                                                                                        minute: "numeric",
                                                                                                        second: "numeric",
                                                                                                    }
                                                                                                )}
                                                                                            {destination.sudah_dikirim_timestamps !==
                                                                                            null ? (
                                                                                                <span
                                                                                                    className={`text-xs flex flex-col md:inline-block mt-2 md:mt-0 py-1 md:ml-2 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full bg-green-600`}
                                                                                                    style={{
                                                                                                        width: "6rem",
                                                                                                    }}
                                                                                                >
                                                                                                    Sudah
                                                                                                    Dikirim
                                                                                                </span>
                                                                                            ) : (
                                                                                                ""
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="pb-2 md:pb-0 md:pt-6 px-6">
                                                                                    {destination.photo ==
                                                                                        "" ||
                                                                                    destination.photo ==
                                                                                        null ? (
                                                                                        ""
                                                                                    ) : (
                                                                                        <>
                                                                                            <div className="font-bold text-base">
                                                                                                Foto
                                                                                                Bukti
                                                                                            </div>
                                                                                            <img
                                                                                                src={`/uploads/${destination.photo}`}
                                                                                                className="w-32 rounded-lg"
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                {isExpanded(shipment.id) && (
                                                    <div className="mt-4">
                                                        <MapPaket
                                                            shipment={shipment}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))
                        ) : (
                            <PaketNotFound />
                        )}
                        {Object.entries(props.shipments).length >=
                            shipmentsPerPage && (
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName={"react-paginate"}
                                previousLinkClassName={"previous_page"}
                                nextLinkClassName={"next_page"}
                                disabledClassName={"disabled"}
                                activeClassName={"active_page"}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div id="contact">
                <Footer />
            </div>
        </>
    );
};

export default CekPaketHistory;
