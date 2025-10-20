import React from "react";

const Catalog = () => {
    return (
        <div className="mx-4 md:mx-8 lg:mx-28">
            <h1 className="my-4 mb-8 text-2xl font-bold text-center uppercase md:text-3xl hover:text-green-700">
                Catalog
            </h1>
            <div className="flex flex-col items-start px-4 py-6 mx-auto mb-8 rounded shadow-md md:px-10 md:py-8 lg:px-20 lg:py-10 bg-slate-100">
                <a
                    href="https://res.cloudinary.com/dsax7rav6/image/upload/v1760941596/Maafcraft_Catalog_2025_qsirnt.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 text-sm md:text-base lg:text-lg hover:font-bold hover:text-green-700"
                >
                    📃 2025 Maafcraft Catalog
                </a>
                <a
                    href="https://res.cloudinary.com/dsax7rav6/image/upload/v1760941592/Maafcraft_Catalog_2024_awjkv3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 text-sm md:text-base lg:text-lg hover:font-bold hover:text-green-700"
                >
                    📃 2024 Maafcraft Catalog PDF
                </a>
                <a
                    href="https://res.cloudinary.com/dsax7rav6/image/upload/v1760941591/Maafcraft_Catalog_2022_kfwefe.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 text-sm md:text-base lg:text-lg hover:font-bold hover:text-green-700"
                >
                    📃 2022 Maafcraft Catalog PDF
                </a>
            </div>
        </div>
    );
};

export default Catalog;
