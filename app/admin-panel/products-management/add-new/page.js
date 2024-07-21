"use client";
import { addNewProduct, getAllTypes } from "@/app/api/api";
import Spinner from "@/app/components/Spinner";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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

const AddProductForm = () => {
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
    function trimString(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }
    useEffect(() => {
        getTypes();
        getSubTypes("Jute");
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
        console.log(formData);

        try {
            const res = await addNewProduct(formData);

            if (res.result) {
                setFormData(dataRef);
            }
            // console.log(res.message);
            toast(res.message);
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
        <div className="p-8 bg-white rounded shadow-md">
            <p className="mb-6 text-2xl font-semibold text-gray-800 uppercase">
                Add New Product
            </p>
            <Toaster position="top-center"  />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full gap-6"
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <div className="mb-4">
                            <label
                                htmlFor="item"
                                className="block mb-2 text-gray-700"
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
                                className="block mb-2 text-gray-700"
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
                                className="block mb-2 text-gray-700"
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
                                <label className="block mb-2 text-gray-700">
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
                                        className="p-2 text-white transition duration-300 bg-red-500 rounded shadow-sm hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddProductDetails}
                            className="w-full p-4 mb-4 text-white transition duration-300 bg-blue-500 rounded shadow-sm hover:bg-blue-600"
                        >
                            Add More Details
                        </button>

                        <div className="mb-4">
                            <label
                                htmlFor="technique"
                                className="block mb-2 text-gray-700"
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
                                className="block mb-2 text-gray-700"
                            >
                                Category:
                            </label>
                            <select
                                name="category"
                                id="category"
                                onChange={handleChange}
                                className="w-full p-4 bg-white border rounded shadow-sm"
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
                                className="block mb-2 text-gray-700"
                            >
                                Sub Category:
                            </label>
                            <select
                                name="subCategory"
                                id="subCategory"
                                onChange={handleChange}
                                className="w-full p-4 bg-white border rounded shadow-sm"
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
                                className="block mb-2 text-gray-700"
                            >
                                Dashboard View:
                            </label>
                            <select
                                name="dashboardView"
                                id="dashboardView"
                                onChange={handleChange}
                                className="w-full p-4 bg-white border rounded shadow-sm"
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
                                className="block mb-2 text-gray-700"
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
                                className="block mb-2 text-gray-700"
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
                                className="block mb-2 text-gray-700"
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
                                className="block mb-2 text-gray-700"
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
                                    className="block mb-2 text-gray-700"
                                >
                                    Image {index + 1}:
                                </label>
                                <input
                                    type="file"
                                    name={`image-${index}`}
                                    onChange={(e) =>
                                        handleImageChange(e, index)
                                    }
                                    className="w-full p-4 border rounded shadow-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImageInput(index)}
                                    className="p-2 mt-2 text-white transition duration-300 bg-red-500 rounded shadow-sm hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddImageInput}
                            className="w-full p-4 text-white transition duration-300 bg-blue-500 rounded shadow-sm hover:bg-blue-600"
                        >
                            Add Image
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-gray-700"
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
                    className="w-full p-4 text-white transition duration-300 bg-green-500 rounded shadow-sm hover:bg-green-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
