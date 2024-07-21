"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import AllCategories from "../components/AllCategories";
import Spinner from "../components/Spinner";
import { getAllProducts } from "../api/api";
import Product from "../components/Product";
import { usePathname } from "next/navigation";

const AllProductCat = () => {
    const pathname = usePathname();
    const location = process.env.IMAGE_STORAGE_LOCATION;
    // const router = useRouter();
    console.log(pathname);

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const productsResponse = await getAllProducts();
            setProducts(productsResponse?.data?.data);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading || !products) {
        return <Spinner />;
    }

    return (
        <div className="flex md:flex-row flex-col justify-start gap-5 mx-4 my-3 md:mx-28">
            <div className="bg-slate-50">
                <AllCategories />
            </div>

            <div>
                <h1 className="pb-2 text-xs font-semibold ">
                    {" "}
                    {"🖇️"} {pathname}{" "}
                </h1>

                <div className="flex flex-wrap justify-center gap-5 mx-auto md:justify-start">
                    {products.map((data) => (
                        <Link href={`/products/${data.id}`} key={data.id}>
                            <Product
                                imageUrl={`./product_image/${data.images[0]}`}
                                productName={data.item}
                                price={data.pricePerPiece}
                                rating={data.rating}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProductCat;
