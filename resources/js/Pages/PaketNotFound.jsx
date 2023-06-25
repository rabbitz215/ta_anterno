import { Head, Link } from '@inertiajs/react'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const PaketNotFound = (props) => {
    return (
        <>
            <Head title="Cek Paket" />
            <div className='min-h-screen flex flex-col'>
                {
                    props.notFound &&
                    <Navbar />
                }
                <div className="container mx-auto mt-8 text-center flex-grow">
                    <h1 className="text-3xl font-semibold">Package Not Found</h1>
                    <p className="mt-4">Sorry, we couldn't find package with the phone number you're looking for.</p>
                    <Link href={route('landingpage')} className="inline-block mt-4 px-6 py-2 bg-[#D11F40] text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Back to Home</Link>
                </div>
                {
                    props.notFound &&
                    <div id='contact'>
                        <Footer />
                    </div>
                }
            </div>
        </>
    )
}

export default PaketNotFound
