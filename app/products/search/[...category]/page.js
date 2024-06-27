"use client";
import { getAllProducts, getAllProductsOfCategory, searchProducts } from "@/app/api/api";
import AllCategories from "@/app/components/AllCategories";
import Product from "@/app/components/Product";
import Spinner from "@/app/components/Spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllProduct = ({ params }) => {
    const { category } = params;
    console.log(category);
    const [success, setSuccess] = useState(false);
    const pathname = usePathname();

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                
                searchProducts(
                    category[0], category[1], 0, 20
                ).then((res) => {
                    
                    setSuccess(res.result);
                    setProducts(res.data.data);
                    setLoading(false);

                    console.log(res);
                })
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, [params[0], params[1]]);

    if (loading) {
        return <Spinner />;
    }
    // if (products.length) {
    //     return <div>No product found</div>;
    // }

    return (
        <div className="flex justify-start gap-5 mx-4 my-3 md:mx-28">
            <div className="hidden lg:block bg-slate-50">
                <AllCategories />
            </div>
            <div>
                <h1 className="pb-2 text-xs font-semibold ">
                    {" "}
                    {"🖇️"} {pathname}{" "}
                </h1>
                <div className="flex flex-wrap justify-center gap-5 px-auto md:justify-start">
                    {products.map((data, index) => (
                        <Link href={`/products/${data.id}`} key={index}>
                            <Product
                                imageUrl={data.images[0]}
                                productName={data.item}
                                price={data.pricePerPiece}
                                rating = {data.rating}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProduct;
