"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import { deleteProduct, getAllProducts } from "@/app/api/api";
import { useRouter } from "next/navigation";

const TABLE_HEAD = [
    "Item",
    "Images",
    "Model",
    "Materials",
    "Size",
    "Technique",
    "Color",
    "Price",
    "Remarks",
    "MOQ",
    "Description",
    "Edit",
    "Delete"
];

const ProductManagement = () => {
    const router = useRouter();
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllProducts();
                if (response.result) {
                    setTableRows(response.data.data);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    const [expandedRows, setExpandedRows] = useState([]);

    const handleToggleDescription = (index) => {
        if (expandedRows.includes(index)) {
            setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
        } else {
            setExpandedRows([...expandedRows, index]);
        }
    };

    const handleDelete = async(id)=>{
        console.log("popped delete", id);
        const res = await deleteProduct(id);
        console.log(res);
        location.reload();
    }
    return (
        <div className="py-8">
            <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">
                Product Management
            </h1>

            <Link href="/admin-panel/products-management/add-new" className="bg-green-600 text-white py-2 px-4 rounded-lg inline-block font-semibold">
                    Add New Product
            </Link>
            <Card>
                <h2 className="text-2xl mx-2  font-bold my-8 text-gray-800">
                    All Products
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                {TABLE_HEAD.map((head, index) => (
                                    <th key={index} className="py-2 px-4">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((row, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-4 px-4">{row.item}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex">
                                            {row.images.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt="image"
                                                    className="w-12 h-12 object-cover rounded-full mr-2"
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">{row.model}</td>
                                    <td className="py-4 px-4">{row.materials}</td>
                                    <td className="py-4 px-4">
                                        {row.productDetails &&
                                            row.productDetails
                                                .map(({ length, width, height, weight }, index) => (
                                                    <span key={index} className="block">
                                                        {`${length}x${width}x${height} ${weight}g`}
                                                    </span>
                                                ))}
                                    </td>
                                    <td className="py-4 px-4">{row.technique}</td>
                                    <td className="py-4 px-4">{row.color}</td>
                                    <td className="py-4 px-4">${row.pricePerPiece}</td>
                                    <td className="py-4 px-4">{row.remarks}</td>
                                    <td className="py-4 px-4">{row.moq}</td>
                                    <td className="py-4 px-4 h-7">
                                        <div className="overflow-hidden">
                                            <div
                                                className={`${
                                                    expandedRows.includes(index) ? "block" : "h-7"
                                                }`}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {row.description}
                                                </Typography>
                                            </div>
                                            {row.description.length > 50 && (
                                                <button
                                                    className="text-white  font-semibold mt-5 px-3 bg-slate-400 focus:outline-none"
                                                    onClick={() => handleToggleDescription(index)}
                                                >
                                                    {expandedRows.includes(index)
                                                        ? "See less"
                                                        : "See more"}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">   <Link href={`/admin-panel/products-management/${row.item}`} key={index}>modify</Link></td>
                                    <td className="py-4 px-4 hover:cursor-pointer" onClick={()=>handleDelete(row.id)}>  Delete </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ProductManagement;
