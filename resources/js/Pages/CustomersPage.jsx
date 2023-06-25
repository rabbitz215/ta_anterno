import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditSaldoPage from './EditSaldoPage';

const CustomersPage = (props) => {

    const [datas, setDatas] = useState([])
    const [isEditSaldo, setIsEditSaldo] = useState(false)
    const [selectedCustomerId, setSelectedCustomerId] = useState(null)

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
            { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
    }

    const getCustomer = () => {
        axios.get('/load_customers')
            .then(function (response) {
                setDatas(response.data)
            })
    }

    useEffect(() => {
        getCustomer()
    }, [])

    return (
        <>
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customers Page</h2>}
            >

                <Head title='Customers Page' />

                <ToastContainer />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                                    <thead>
                                        <tr>
                                            <th
                                                className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                                            >
                                                No Telp
                                            </th>
                                            <th
                                                className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                                            >
                                                Nama
                                            </th>
                                            <th
                                                className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                                            >
                                                Saldo Deposit
                                            </th>
                                            <th
                                                className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {
                                            datas.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="whitespace-nowrap p-4 font-medium text-gray-900">
                                                            {item.no_telp}
                                                        </td>
                                                        <td className="whitespace-nowrap p-4 font-medium text-gray-900">
                                                            {item.nama}
                                                        </td>
                                                        <td className="whitespace-nowrap p-4 font-medium text-gray-900">
                                                            {formatRupiah(item.saldo)}
                                                        </td>
                                                        <td className="whitespace-nowrap font-medium text-gray-900">
                                                            <button onClick={() => { setIsEditSaldo(!isEditSaldo); setSelectedCustomerId(item.id) }} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Tambah Saldo</button>
                                                            <a href={route('history', item.id)} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Saldo History</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isEditSaldo && <EditSaldoPage onEdit={() => getCustomer()} setIsEditSaldo={setIsEditSaldo} selectedCustomerId={selectedCustomerId} />
                }
            </AuthenticatedLayout>
        </>
    )
}

export default CustomersPage
