import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingsPage = (props) => {
    const [hargaSingle, setHargaSingle] = useState(0)
    const [hargaMultiple, setHargaMultiple] = useState(0)

    const [isHarga, setIsHarga] = useState(true);
    const [hargaId, setHargaId] = useState("");

    useEffect(() => {
        props.data.map((item) => {
            setHargaSingle(item.kiriman_single)
            setHargaMultiple(item.kiriman_multiple)
        })

        getHargaSettings()
    }, [])

    const getHargaSettings = () => {
        axios.get('/get_harga')
            .then(function (response) {
                if (response.data.length == 0) {
                    setIsHarga(false);
                } else {
                    setHargaId(response.data.map(item => item.id))
                    setIsHarga(true);
                }
            })
    }

    const handleCreate = (e) => {
        e.preventDefault();

        axios.post('/settings/', {
            'kiriman_single': hargaSingle,
            'kiriman_multiple': hargaMultiple,
        })
            .then(function (response) {
                toast.success('Harga berhasil di buat!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setIsHarga(true)
                getHargaSettings()
            })
    }

    const handleSave = (e) => {
        e.preventDefault()
        axios.put(`/settings/${hargaId}`,
            {
                'kiriman_single': hargaSingle,
                'kiriman_multiple': hargaMultiple,
            }
        )
            .then(function (response) {
                toast.success('Harga berhasil di update!', {
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
                toast.error('Harga gagal di update!', {
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
    }

    return (
        <>
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings Page</h2>}
            >
                <Head title="Settings Page" />

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
                                                Harga Kiriman Single
                                            </th>
                                            <th
                                                className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                                            >
                                                Harga Kiriman Multiple
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td>
                                                <input value={hargaSingle} onChange={(e) => setHargaSingle(e.currentTarget.value)} type="number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-4 p-2.5'></input>
                                            </td>
                                            <td>
                                                <input value={hargaMultiple} onChange={(e) => setHargaMultiple(e.currentTarget.value)} type="number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-4 p-2.5'></input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {
                            isHarga ?
                                <button onClick={handleSave} type="button" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Simpan Harga</button>
                                :
                                <button onClick={handleCreate} type="button" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit Harga Baru</button>
                        }
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}

export default SettingsPage
