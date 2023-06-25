import React from "react";

const Footer = () => {
    return (
        <footer>
            <div className="container mx-auto py-6 mt-6 flex flex-col items-center">
                <span className="ml-4 font-extrabold text-2xl bg-gradient-to-r from-black to-red-500 text-transparent bg-clip-text">
                    Anterno.id
                </span>
                <div className="flex flex-row gap-10 mt-6">
                    <i className="fa-brands fa-square-instagram text-4xl"></i>
                    <i className="fa-brands fa-square-twitter text-4xl"></i>
                    <i className="fa-brands fa-square-facebook text-4xl"></i>
                    <i className="fa-brands fa-square-whatsapp text-4xl"></i>
                </div>
                <div className="mt-6 h-[1px] bg-gray-400 w-full"></div>
                <div className="text-base text-center font-bold mt-4">
                    Copyright © 2023 Anterno. Powered by{" "}
                    <u>
                        <a href="https://www.luxodev.com/" target="_blank">
                            Luxodev
                        </a>
                    </u>
                </div>
                <div className="text-base text-center mt-2">
                    Springville Residence No.AA-18, Kali Rungkut, Kec. Rungkut,
                    Kota SBY, Jawa Timur 60293
                </div>
            </div>
        </footer>
    );
};

export default Footer;
