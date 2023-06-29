import DriverLayout from "@/Layouts/DriverLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KirimanDriver from "./KirimanDriver";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

const DriverPage = (props) => {
    const [data, setData] = useState(props.kiriman);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    const loadKiriman = (date) => {
        const formattedDate = moment(date).format("YYYY-MM-DD");
        axios
            .get(`/get_kiriman?date=${formattedDate}`)
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        loadKiriman(date);
    };

    useEffect(() => {
        loadKiriman(selectedDate);
    }, []);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = selectedDate.toLocaleDateString("en-GB", options);

    return (
        <DriverLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Hai, {props.user}
                </h2>
            }
        >
            <Head title="Driver Page" />

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
                    <div className="px-6 my-6 text-lg font-bold">
                        Kiriman tanggal {formattedDate}
                    </div>
                    {isLoading ? (
                        <div className="m-6 bg-white my-2 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-4 md:p-0 my-2 h-auto">
                                <div className="text-lg p-6 font-bold">
                                    Loading....
                                </div>
                            </div>
                        </div>
                    ) : data.length > 0 ? (
                        data.map((item) => (
                            <KirimanDriver
                                onSave={() => loadKiriman(selectedDate)}
                                key={item.id}
                                item={item}
                            />
                        ))
                    ) : (
                        <div className="m-6 bg-white my-2 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-4 md:p-0 my-2 h-auto">
                                <div className="text-lg p-6 font-bold">
                                    Tidak ada kiriman untuk tanggal{" "}
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DriverLayout>
    );
};

export default DriverPage;
