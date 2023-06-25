import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-[#F0F0F0]">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="md:ml-6 flex flex-row text-center items-center">
                        <a href="/">
                            <img
                                className="hidden md:inline"
                                src="/image/logo.svg"
                                alt="Anterno.id"
                                width="60px"
                                height="70px"
                            />
                        </a>
                        <span className="md:ml-4 font-extrabold text-3xl bg-gradient-to-r from-black to-red-500 text-transparent bg-clip-text">
                            <a href="/">Anterno.id</a>
                        </span>
                    </div>
                    <div>
                        <button className="bg-[#D11F40] h-full hidden sm:inline md:inline hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <a href="#contact">HUBUNGI KAMI</a>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
