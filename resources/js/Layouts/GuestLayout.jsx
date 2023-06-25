import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <div className='flex flex-col items-center'>
                        <img src="/image/logo.svg" alt="Anterno.id" className='w-24 h-24' />
                        <span className="md:ml-4 font-extrabold text-3xl bg-gradient-to-r from-black to-red-500 text-transparent bg-clip-text"><a href="/">Anterno.id</a></span>
                    </div>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
