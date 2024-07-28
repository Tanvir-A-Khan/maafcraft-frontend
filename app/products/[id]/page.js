"use client";
import { useStateContext } from "@/app/Context/AppContext";
import { addToCart, getAProduct } from "@/app/api/api";
import { extractDataFromJWT } from "@/app/auth";
import Spinner from "@/app/components/Spinner";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { } from "@/app/utils/service";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactImageZoom from "react-image-zoom";
import Rating from "react-rating";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function DisplayOutput({ text }) {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br/>") }}
        />
    );
}

function getTotalWeight(productDetails) {
    let totalWeight = 0;
    productDetails.forEach((detail) => {
        const weight = parseFloat(detail.weight);
        totalWeight += weight;
    });
    return totalWeight;
}

const ViewProduct = ({ params }) => {
    const { id } = params;
    console.log(id);
    const [loading, setLoading] = useState(true);
    const [ratingValue, setRatingValue] = useState(1);
    const [cbm, setCbm] = useState(1);
    const [temp, setTemp] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState({});
    const [images, setImages] = useState([""]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [img, setImg] = useState("");

    useEffect(() => {
        const getProduct = async () => {
            const prod = await getAProduct(id);
            setImages(prod.data.images);
            // console.log(prod.data.images);
            setData(prod.data);
            setImg(prod.data.images[0]);
            setQuantity(prod.data.moq);
            setRatingValue(Math.ceil(prod.data.rating));
            let c = 1;
            prod.data.productDetails.forEach((detail) => {
                c *= detail.length * detail.height * detail.width;
            });
            setTemp(c / 1000000.0);
            setCbm(c / 1000000.0);
            setLoading(false);
        };
        getProduct();
    }, [id]);

    const handleQuantity = (e) => {
        if (Number(e.target.value) < Number(data.moq)) {
            toast.error("Quantity cannot be less than " + data.moq);
            return;
        }
        setQuantity(e.target.value);
        setCbm(temp * e.target.value);
    };

    const handleHover = (image, index) => {
        setImg(image);
        setSelectedImageIndex(index);
    };

    const zoomProps = {
        width: 400,
        zoomWidth: 400,
        img: img,
        zoomPosition: "right",
    };

    const handleRating = (rate) => {
        setRatingValue(rate);
    };

    const { globalState } = useStateContext();
    const [email, setEmail] = useState("");
    useEffect(() => {
        if (globalState) {
            const data = extractDataFromJWT(globalState);
            if (data) {
                setEmail(data.sub);
            }
        }
    }, [globalState]);

    const handleAddCart = async () => {
        if (!email) {
            toast.error("Please login first to add to cart");
            return;
        }

        const res = await addToCart({
            productName: data.item,
            image: images[0],
            weight: getTotalWeight(data.productDetails),
            cbm: cbm.toFixed(4),
            quantity: quantity,
            email: email,
            price: data.pricePerPiece,
        });
        toast.success(res?.message);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col items-center mx-4 md:mx-16 lg:mx-32">
            <Toaster position="top-center" reverseOrder={true} />
            <div className="flex flex-col w-full gap-8 mt-4 md:flex-row">
                <div className="flex flex-col items-center gap-4 md:items-start">
                    <div className="z-2 hidden bg-black border-2 border-green-600 rounded-md md:block">
                        <ReactImageZoom {...zoomProps} />
                    </div>
                    {/* for smaller screen */}
                    <Zoom>
                        <div className="bg-black  border-green-600 md:hidden">
                            <img src={img} alt="image" />
                        </div>
                    </Zoom>
                    <div className="flex items-center gap-2 md:flex-row md:gap-4">
                        {images.map((image, index) => (
                            // (console.log(image);
                            <div
                                key={index}
                                className={`border-2 transition-all cursor-pointer ${
                                    index === selectedImageIndex
                                        ? "border-green-500"
                                        : "border-transparent"
                                } overflow-hidden`}
                            >
                                <img
                                    src={ image }
                                    alt={image}
                                    onMouseOver={() =>
                                        handleHover(image,
                                            index
                                        )
                                    }
                                    className="object-cover w-16 h-16 md:w-24 md:h-24"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-start w-full md:w-1/2">
                    <h2 className="pb-4 text-2xl font-semibold md:text-3xl">
                        {data.item}
                    </h2>
                    <hr className="w-full border-gray-400" />
                    <div className="py-4 space-y-2 text-sm text-gray-700 md:space-y-4 md:text-base">
                        <p>
                            <strong>Name:</strong> {data.item}
                        </p>
                        <p>
                            <strong>Model:</strong> {data.model}
                        </p>
                        <p>
                            <strong>Materials:</strong> {data.materials}
                        </p>
                        <p>
                            <strong>Technique:</strong> {data.technique}
                        </p>
                        <p>
                            <strong>Color:</strong> {data.color}
                        </p>
                        <p>
                            <strong>FOB Price/Pcs:</strong> {data.pricePerPiece}
                        </p>
                        <p>
                            <strong>MOQ:</strong> {data.moq}
                        </p>
                        <table className="mt-3 border-2 border-gray-400 rounded-md">
                            <thead className="border-b-2 border-gray-400">
                                <tr>
                                    <th className="p-2">Details</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Total CBM</th>
                                    <th className="p-2">Total Carton</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2">
                                        <div>
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="text-xs *:w-14">
                                                        <th className="w-20">
                                                            Size
                                                        </th>
                                                        <th className="w-10">
                                                            L
                                                        </th>
                                                        <th className="w-10">
                                                            W
                                                        </th>
                                                        <th className="w-10">
                                                            H
                                                        </th>
                                                        <th className="w-10">
                                                            Weight
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.productDetails.map(
                                                        (detail, index) => (
                                                            <tr
                                                                key={index}
                                                                className="text-xs *:w-14"
                                                            >
                                                                <td>
                                                                    {
                                                                        detail.productSize
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        detail.length
                                                                    }{" "}
                                                                    cm
                                                                </td>
                                                                <td>
                                                                    {
                                                                        detail.width
                                                                    }{" "}
                                                                    cm
                                                                </td>
                                                                <td>
                                                                    {
                                                                        detail.height
                                                                    }{" "}
                                                                    cm
                                                                </td>
                                                                <td>
                                                                    {
                                                                        detail.weight
                                                                    }{" "}
                                                                    gm
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                    <td className="flex flex-col gap-3 p-2 border-none">
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={handleQuantity}
                                            className="w-20 h-12 text-lg text-center border-2 border-gray-400 rounded-md"
                                        />
                                    </td>
                                    <td className="p-2">
                                        {cbm.toFixed(3)} m<sup>3</sup>
                                    </td>
                                    <td className="p-2">{quantity}</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <div className="flex flex-col items-start">
                            <Rating
                                initialRating={ratingValue}
                                readonly
                                onClick={handleRating}
                                emptySymbol={
                                    <img
                                        src="/src/blackstar.png"
                                        className="icon"
                                        width={40}
                                        height={40}
                                    />
                                }
                                fullSymbol={
                                    <img
                                        src="/src/yellowstar.png"
                                        className="icon"
                                        width={40}
                                        height={40}
                                    />
                                }
                            />
                            <strong>Rating: {data.rating}/5.0</strong>
                        </div> */}
                        <div className="flex gap-4 mt-4 flex-row">
                            <button
                                type="button"
                                className="w-44 px-4 py-2 text-sm font-bold text-white transition-all bg-orange-500 rounded md:w-40 hover:bg-green-600"
                                onClick={handleAddCart}
                            >
                                ADD TO CART
                            </button>
                            <WhatsAppButton />
                        </div>
                        <p className="text-wrap text-left p-2 my-2 mt-3 bg-green-100 rounded">
                            <strong>Note:</strong> {data.remarks}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full mt-8">
                <div className="w-full px-4 py-2 font-semibold text-gray-600 bg-gray-200 border-2 rounded-t-lg hover:cursor-pointer">
                    DESCRIPTION
                </div>
                <hr />
                <div className="p-4 border-2 rounded-b-lg">
                    <DisplayOutput text={data.description} />
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
