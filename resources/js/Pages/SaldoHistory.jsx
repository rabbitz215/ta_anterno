import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const SaldoHistory = (props) => {

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
            { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">History Saldo</h2>}
        >
            <Head title="History Saldo" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {props.data.length == 0 && <div className='p-4 text-base font-bold'>Tidak ada history untuk customer ini</div>}
                        <div className="p-4">
                            {
                                props.data &&
                                <>
                                    <p><span className='font-bold'>Nama</span> : {props.data.nama}</p>
                                    <p><span className='font-bold'>No Telp</span> : {props.data.no_telp}</p>
                                </>
                            }
                        </div>
                        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                            <thead>
                                <tr>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
                                    >
                                        Tanggal
                                    </th>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
                                    >
                                        Type History
                                    </th>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
                                    >
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    props.data.saldo_histories.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{new Date(item.created_at).toLocaleString('id-ID', { hour12: false })}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.history_type}</td>
                                                <td className={`whitespace-nowrap px-4 py-2 ${item.history_type == "Deposit Saldo" ? "text-green-600" : "text-red-600"}`}>{item.history_type == "Deposit Saldo" ? "+" : "-"}{formatRupiah(item.total)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default SaldoHistory
