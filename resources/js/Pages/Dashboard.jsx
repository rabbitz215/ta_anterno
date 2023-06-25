import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "./EditForm";
import FormKiriman from "./FormKiriman";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

export default function Dashboard(props) {
    const [isForm, setIsForm] = useState(false);
    const [shipments, setShipments] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const loadShipments = (date) => {
        setIsLoading(true);
        const formattedDate = moment(date).format("YYYY-MM-DD");
        axios
            .get(`/shipments/?date=${formattedDate}`)
            .then(function (response) {
                setShipments(response.data);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        loadShipments(date);
    };

    useEffect(() => {
        loadShipments(selectedDate);
    }, []);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = selectedDate.toLocaleDateString("en-GB", options);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

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
                        <div className="p-6 text-gray-900 items-center">
                            {isForm ? (
                                <button
                                    onClick={() => {
                                        setIsForm(!isForm);
                                        loadShipments(selectedDate);
                                    }}
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Close and Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsForm(!isForm)}
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Tambah Kiriman
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isForm && (
                            <FormKiriman
                                shipments={shipments}
                                selectedDate={selectedDate}
                            />
                        )}
                    </div>

                    <div className="px-6 my-6 text-lg font-bold">
                        Kiriman tanggal {formattedDate}
                    </div>
                    {isLoading ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="p-6 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : shipments.length > 0 ? (
                        shipments.map((shipment, index) => (
                            <div
                                key={index}
                                className="lg:mx-6 bg-white my-4 overflow-hidden rounded-lg shadow-sm sm:rounded-lg"
                            >
                                <EditForm
                                    onDeleteDestination={(e) => loadShipments()}
                                    shipment={shipment}
                                    selectedDate={selectedDate}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="px-6 text-base">
                            Tidak ada kiriman untuk tanggal {formattedDate}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
