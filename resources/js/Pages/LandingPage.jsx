import { Head } from '@inertiajs/react'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Navbar from './Navbar';

const LandingPage = () => {

    const [noTelp, setNoTelp] = useState("")

    const handleSearch = () => {
        if (noTelp == "") {
            toast.error('Silahkan isi No Telp terlebih dahulu', {
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
            window.location.href = `/cekpaket/${noTelp}`
        }
    }

    return (
        <>
            <Head title="Tracker" />
            <ToastContainer />
            <Navbar />

            <section className="bg-cover min-h-fit bg-center pt-12">
                <div className="container mx-auto flex flex-wrap items-center justify-center">
                    <div className="">
                        <img src="/image/delivery.svg" className='mx-auto w-8/12 md:w-10/12' alt="Anterno.id" />
                    </div>
                    <div className="mt-4 md:mt-0 max-w-md mx-4">
                        <div className='flex flex-row'>
                            <div className="mb-4 h-[4px] bg-[#333333] rounded w-2/12"></div>
                            <div className='ml-1 mb-4 h-[4px] bg-[#333333] rounded w-1'></div>
                        </div>
                        <span className='text-3xl md:text-4xl font-bold text-[#D11F40]'>Lacak Pengirimanmu Disini!</span>
                        <p className="break-normal mt-2">Kami <span className='font-bold'><i>Anterno.id</i></span> adalah website untuk melacak pengiriman paket yang didukung oleh Jasa Pengiriman Lion Parcel dengan kurir dari kami yang terjamin cepat, dan aman, sehingga memudahkan Anda untuk melacak riwayat pengiriman paket anda.</p>
                        <button className='mt-4 bg-[#D11F40] hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'><a href="#tracker">LACAK PAKET</a></button>
                    </div>
                </div>
            </section>

            <section id='tracker' className='bg-[#F0F0F0] py-8 my-12'>
                <div className="container mx-auto flex flex-wrap items-center justify-center">
                    <div className="w-full">
                        <div className="mx-auto bg-gradient-to-r from-[#D11F40] via-stone-400 to-neutral-400 w-9/12 overflow-hidden shadow-xl rounded-lg">
                            <div className="p-6">
                                <h2 className="text-white text-lg md:text-2xl mb-4">Lacak Paket Disini</h2>
                                <div className='flex flex-col md:flex-row'>
                                    <input value={noTelp} onChange={(e) => setNoTelp(e.currentTarget.value)} type="number" placeholder="08xxxxxxxxxx"
                                        className="block mt-2 w-full md:w-10/12 h-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></input>
                                    <button
                                        className="inline-block h-full mt-2 w-full md:ml-4 md:w-3/12 bg-[#D11F40] hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => handleSearch()}
                                        type="submit">
                                        Lacak
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div id='contact'>
                <Footer />
            </div>
        </>
    )
}

export default LandingPage
