"use client";
import { addNewProduct, getAllProducts, getAllTypes, updateProduct } from "@/app/api/api";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
function imageToBase64(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const dataRef = {
    item: "",
    model: "",
    materials: "",
    productDetails: [
        { productSize: "", length: "", width: "", height: "", weight: "" },
    ],
    technique: "",
    category: "",
    subCategory: "Pat",
    dashboardView: "NONE",
    color: "",
    pricePerPiece: "",
    remarks: "",
    moq: "",
    images: [""],
    description: "",
};

const EditProduct = ({ params }) => {
    const { id } = params;
    const router = useRouter();
    const [category, setCategory] = useState([""]);
    const [categories, setCategories] = useState([""]);
    const [subCategories, setSubCategories] = useState([
        "Category 1",
        "Category 2",
        "Category 3",
    ]);
    const [formData, setFormData] = useState(dataRef);

    const getTypes = async () => {
        const categoriesResponse = await getAllTypes("ProductType");
        setCategories(categoriesResponse.data);
    };
    const getSubTypes = async (value) => {
        const categoriesResponse = await getAllTypes(value + "Type");
        // console.log(categoriesResponse.data);
        setSubCategories(categoriesResponse.data);
    };

    const getProds =async()=>{
        const res = await getAllProducts(id, "", 1, 1);
        console.log("data" , res.data);
        setFormData(res.data);
        
    }

    function trimString(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    useEffect(() => {
        setLoading(true);
        getTypes();
        getSubTypes("Jute");
        getProds();
        setLoading(false);

    }, []);

    const dashboard = [
        "NONE",
        "SLIDER",
        "DISCOUNT_PRODUCTS",
        "MOST_SELLING_ITEMS",
    ]; // Example dashboard views

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: trimString(value) });

        if (name == "category") {
            setCategory(value);
            console.log(value);
            getSubTypes(value);
        }
    };
    const [loading, setLoading] = useState(false);

    const handleDetailsChange = (index) => (e) => {
        const { name, value } = e.target;
        const updatedDetails = [...formData.productDetails];
        updatedDetails[index] = { ...updatedDetails[index], [name]: value };
        setFormData({ ...formData, productDetails: updatedDetails });
    };

    const handleAddProductDetails = () => {
        setFormData({
            ...formData,
            productDetails: [
                ...formData.productDetails,
                {
                    productSize: "",
                    length: "",
                    width: "",
                    height: "",
                    weight: "",
                },
            ],
        });
    };

    const handleRemoveProductDetails = (index) => () => {
        const updatedDetails = formData.productDetails.filter(
            (_, i) => i !== index
        );
        setFormData({ ...formData, productDetails: updatedDetails });
    };

    const handleImageChange = async (e, index) => {
        const newImages = [...formData.images];
        const image = e.target.files[0];
        const base64String = await imageToBase64(image);
        newImages[index] = base64String;
        setFormData({ ...formData, images: newImages });
    };

    const handleRemoveImageInput = (index) => () => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
    };
    const handleAddImageInput = () => {
        setFormData({
            ...formData,
            images: [...formData.images, ""],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("uploading ... ", formData);

        try {
            const res = await updateProduct(formData);

            if (res.result) {
                setFormData(dataRef);
            }

            toast(res.message);
            router.push("/admin-panel/products-management");
            // toast("Product added successfully");
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="bg-white p-8 rounded shadow-md">
            <p className="font-semibold text-2xl text-gray-800 mb-6 uppercase">
                Edit Product Info
            </p>
            <Toaster position="top-center" reverseOrder={true} />
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-4">
                            <label
                                htmlFor="item"
                                className="block text-gray-700 mb-2"
                            >
                                Item:
                            </label>
                            <input
                                type="text"
                                name="item"
                                value={formData.item}
                                onChange={handleChange}
                                placeholder="Item"
                                className="w-full p-4 border rounded shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="model"
                                className="block text-gray-700 mb-2"
                            >
                                Model:
                            </label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                placeholder="Model"
                                className="w-full p-4 border rounded shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="materials"
                                className="block text-gray-700 mb-2"
                            >
                                Materials:
                            </label>
                            <input
                                type="text"
                                name="materials"
                                value={formData.materials}
                                onChange={handleChange}
                                placeholder="Materials"
                                className="w-full p-4 border rounded shadow-sm"
                                required
                            />
                        </div>

                        {formData.productDetails.map((detail, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Product Details {index + 1}:
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        name="productSize"
                                        value={detail.productSize}
                                        onChange={handleDetailsChange(index)}
                                        placeholder="Size"
                                        className="w-full p-4 border rounded shadow-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="length"
                                        value={detail.length}
                                        onChange={handleDetailsChange(index)}
                                        placeholder="L"
                                        className="w-full p-4 border rounded shadow-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="width"
                                        value={detail.width}
                                        onChange={handleDetailsChange(index)}
                                        placeholder="W"
                                        className="w-full p-4 border rounded shadow-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="height"
                                        value={detail.height}
                                        onChange={handleDetailsChange(index)}
                                        placeholder="H"
                                        className="w-full p-4 border rounded shadow-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="weight"
                                        value={detail.weight}
                                        onChange={handleDetailsChange(index)}
                                        placeholder="Weight"
                                        className="w-full p-4 border rounded shadow-sm"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveProductDetails(
                                            index
                                        )}
                                        className="bg-red-500 text-white p-2 rounded shadow-sm hover:bg-red-600 transition duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddProductDetails}
                            className="w-full bg-blue-500 text-white p-4 rounded shadow-sm hover:bg-blue-600 transition duration-300 mb-4"
                        >
                            Add More Details
                        </button>

                        <div className="mb-4">
                            <label
                                htmlFor="technique"
                                className="block text-gray-700 mb-2"
                            >
                                Technique:
                            </label>
                            <input
                                type="text"
                                name="technique"
                                value={formData.technique}
                                onChange={handleChange}
                                placeholder="Technique"
                                className="w-full p-4 border rounded shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="block text-gray-700 mb-2"
                            >
                                Category:
                            </label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-4 border rounded shadow-sm bg-white"
                                required
                            >
                                {categories.map((category, index) => (
                                    <option value={category} key={index}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="block text-gray-700 mb-2"
                            >
                                Sub Category:
                            </label>
                            <select
                                name="subCategory"
                                id="subCategory"
                                value={formData.subCategory}
                                onChange={handleChange}
                                className="w-full p-4 border rounded shadow-sm bg-white"
                                required
                            >
                                {subCategories.map((category, index) => (
                                    <option value={category} key={index}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="dashboardView"
                                className="block text-gray-700 mb-2"
                            >
                                Dashboard View:
                            </label>
                            <select
                                name="dashboardView"
                                id="dashboardView"
                                onChange={handleChange}
                                className="w-full p-4 border rounded shadow-sm bg-white"
                                required
                            >
                                {dashboard.map((item, index) => (
                                    <option value={item} key={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="mb-4">
                            <label
                                htmlFor="color"
                                className="block text-gray-700 mb-2"
                            >
                                Color:
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                placeholder="Color"
                                className="w-full p-4 border rounded shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="pricePerPiece"
                                className="block text-gray-700 mb-2"
                            >
                                FOB Price Per Piece:
                            </label>
                            <input
                                type="text"
                                name="pricePerPiece"
                                value={formData.pricePerPiece}
                                onChange={handleChange}
                                placeholder="FOB Price Per Piece"
                                className="w-full p-4 border rounded shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="remarks"
                                className="block text-gray-700 mb-2"
                            >
                                Remarks:
                            </label>
                            <input
                                type="text"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                placeholder="Remarks"
                                className="w-full p-4 border rounded shadow-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="moq"
                                className="block text-gray-700 mb-2"
                            >
                                Minimum Order Quantity:
                            </label>
                            <input
                                type="text"
                                name="moq"
                                value={formData.moq}
                                onChange={handleChange}
                                placeholder="Minimum Order Quantity"
                                className="w-full p-4 border rounded shadow-sm"
                                required
                            />
                        </div>

                        {formData.images.map((image, index) => (
                            <div key={index} className="mb-4">
                                <label
                                    htmlFor={`image-${index}`}
                                    className="block text-gray-700 mb-2"
                                >
                                    Image {index + 1}: <img src={image} alt="image" weight={40}  height={40} />
                                </label>
                                <input
                                    type="file"
                                    name={`image-${index}`}
                                    // value={image}
                                    onChange={(e) =>
                                        handleImageChange(e, index)
                                    }
                                    className="w-full p-4 border rounded shadow-sm"
                                    // required
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImageInput(index)}
                                    className="bg-red-500 text-white p-2 rounded shadow-sm hover:bg-red-600 transition duration-300 mt-2"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddImageInput}
                            className="w-full bg-blue-500 text-white p-4 rounded shadow-sm hover:bg-blue-600 transition duration-300"
                        >
                            Add Image
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 mb-2"
                    >
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full p-4 border rounded shadow-sm"
                        required
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-4 rounded shadow-sm hover:bg-green-600 transition duration-300"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
