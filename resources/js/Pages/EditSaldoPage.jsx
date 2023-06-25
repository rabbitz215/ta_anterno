import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSaldoPage = ({ selectedCustomerId, setIsEditSaldo, onEdit }) => {

    const [saldo, setSaldo] = useState(0)

    const handleSave = (e) => {
        e.preventDefault()

        if (saldo < 1) {
            toast.warning('Saldo tidak boleh 0!', {
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
            axios.put(`/update_saldo/${selectedCustomerId}`, {
                'saldo': saldo,
            })
                .then(function (response) {
                    toast.success('Saldo berhasil di update!', {
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
                    setIsEditSaldo(false)
                    onEdit()
                })
        }
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Tambah Saldo
                            </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto gap-4">
                            <div className="mb-3 pt-0">
                                <input type="number" value={saldo} onChange={(e) => setSaldo(e.target.value)} placeholder="Placeholder" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full" />
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setIsEditSaldo(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-600 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={(e) => handleSave(e)}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default EditSaldoPage
