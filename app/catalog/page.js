import React from "react";

const Catalog = () => {
    return (
        <div className="mx-4 md:mx-8 lg:mx-28">
            <h1 className="my-4 mb-8 text-2xl font-bold text-center uppercase md:text-3xl hover:text-green-700">
                Catalog
            </h1>
            <div className="flex flex-col items-start px-4 py-6 mx-auto mb-8 rounded shadow-md md:px-10 md:py-8 lg:px-20 lg:py-10 bg-slate-100">
                <a
                    href="https://barc.portal.gov.bd/sites/default/files/files/barc.portal.gov.bd/page/f152389f_b9fa_4fa6_8cc2_148df01aed6d/2023-06-25-07-23-97982a5e7178e796cf550f598b845147.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 text-sm md:text-base lg:text-lg hover:font-bold hover:text-green-700"
                >
                    📃 2020 Maafcraft Catalog
                </a>
                <a
                    href="https://barc.portal.gov.bd/sites/default/files/files/barc.portal.gov.bd/page/f152389f_b9fa_4fa6_8cc2_148df01aed6d/2023-06-25-07-23-97982a5e7178e796cf550f598b845147.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 text-sm md:text-base lg:text-lg hover:font-bold hover:text-green-700"
                >
                    📃 2021 Maafcraft Catalog PDF
                </a>
                <a
                    href="https://barc.portal.gov.bd/sites/default/files/files/barc.portal.gov.bd/page/f152389f_b9fa_4fa6_8cc2_148df01aed6d/2023-06-25-07-23-97982a5e7178e796cf550f598b845147.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 text-sm md:text-base lg:text-lg hover:font-bold hover:text-green-700"
                >
                    📃 2022 Maafcraft Catalog PDF
                </a>
                <a
                    href="https://barc.portal.gov.bd/sites/default/files/files/barc.portal.gov.bd/page/f152389f_b9fa_4fa6_8cc2_148df01aed6d/2023-06-25-07-23-97982a5e7178e796cf550f598b845147.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base lg:text-lg hover:font-bold hover:text-green-700"
                >
                    📃 2023 Maafcraft Catalog* Latest PDF
                </a>
            </div>
        </div>
    );
};

export default Catalog;
