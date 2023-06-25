import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import moment from "moment-timezone";

const ExportPage = (props) => {
    const [startDate, setStartDate] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    );
    const [endDate, setEndDate] = useState(new Date());

    const exportLead = (e) => {
        e.preventDefault();

        axios
            .get(`/export`, {
                responseType: "blob",
                params: {
                    start_date: moment(startDate).format("YYYY-MM-DD"),
                    end_date: moment(endDate).format("YYYY-MM-DD"),
                },
            })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                    "download",
                    `AnternoId_report_${moment(startDate).format(
                        "YYYYMMDD"
                    )}-${moment(endDate).format("YYYYMMDD")}.xlsx`
                );
                document.body.appendChild(link);
                link.click();
                setEndDate(new Date());
            });
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Export Page
                </h2>
            }
        >
            <Head title="Export Page" />
            <div className="bg-white p-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full mx-auto mt-9">
                <div className="flex flex-col md:flex-row md:gap-4">
                    <div className="form-group mb-6">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            Start Date
                        </label>
                        <br />
                        <Flatpickr
                            value={startDate}
                            onChange={(start) => setStartDate(start[0])}
                            options={{
                                dateFormat: "Y-m-d",
                                disableMobile: true,
                            }}
                            className="form-input rounded-md shadow-sm"
                            placeholder="Select start date"
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label className="form-label inline-block mb-2 text-gray-700">
                            End Date
                        </label>
                        <br />
                        <Flatpickr
                            value={endDate}
                            onChange={(end) => setEndDate(end[0])}
                            options={{
                                dateFormat: "Y-m-d",
                                disableMobile: true,
                            }}
                            className="form-input rounded-md shadow-sm"
                            placeholder="Select end date"
                        />
                    </div>
                </div>
                <button
                    type="button"
                    onClick={(e) => {
                        exportLead(e);
                    }}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Download
                </button>
            </div>
        </AuthenticatedLayout>
    );
};

export default ExportPage;
