"use client";
import { useStateContext } from "@/app/Context/AppContext";
import { addToCart, getAProduct } from "@/app/api/api";
import { extractDataFromJWT } from "@/app/auth";
import Spinner from "@/app/components/Spinner";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

// Dynamically import client-side only components
const ReactImageZoom = dynamic(() => import("react-image-zoom"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-200 animate-pulse rounded" />
  ),
});

const Zoom = dynamic(() => import("react-medium-image-zoom"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-auto bg-gray-200 animate-pulse rounded" />
  ),
});

// Utility component for displaying HTML content
const DisplayOutput = React.memo(({ text }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="animate-pulse bg-gray-200 h-20 rounded"></div>;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, "<br/>") || "" }}
    />
  );
});

// Utility function to calculate total weight
const getTotalWeight = (productDetails = []) => {
  return productDetails.reduce(
    (total, detail) => total + parseFloat(detail.weight || 0),
    0
  );
};

// Utility function to calculate CBM from carton dimensions
const calculateCBMFromCarton = (cartonSize) => {
  if (!cartonSize || typeof cartonSize !== 'object') return 0;
  
  // Use the carton size object for CBM calculation - handle both length and length properties
  const length = cartonSize.length || cartonSize.length || 0;
  const width = cartonSize.width || 0;
  const height = cartonSize.height || 0;
  const volume = length * width * height;
  return volume / 1000000.0; // Convert to CBM
};

// Utility function to calculate how many items fit in a carton
const calculateItemsPerCarton = (productDetails, cartonSize) => {
  // Since carton size will always be provided, we can rely on it
  if (!productDetails?.length || !cartonSize || typeof cartonSize !== 'object') {
    return 1; // Default to 1 set per carton
  }

  // Handle both length and length properties
  const length = cartonSize.length || cartonSize.length || 0;
  const width = cartonSize.width || 0;
  const height = cartonSize.height || 0;
  const cartonVolume = length * width * height;

  // Calculate total volume of all items in a set
  let totalItemVolume = 0;
  productDetails.forEach((item) => {
    const itemVolume =
      (item.length || 0) * (item.width || 0) * (item.height || 0);
    totalItemVolume += itemVolume;
  });

  if (totalItemVolume === 0 || cartonVolume === 0) return 1;

  // Calculate how many complete sets can fit in a carton
  // Consider 80% volume utilization for packing efficiency and nested items
  const packingEfficiency = 0.8;
  const usableCartonVolume = cartonVolume * packingEfficiency;
  const setsPerCarton = Math.floor(usableCartonVolume / totalItemVolume);

  return Math.max(1, setsPerCarton); // At least 1 set per carton
};

const ViewProduct = ({ params }) => {
  const { id } = params;

  // State management
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [email, setEmail] = useState("");

  const { globalState } = useStateContext();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simplified calculations to prevent performance issues
  const cbmPerUnit = useMemo(() => {
    try {
      if (!data?.cartonSize) return 0;
      return calculateCBMFromCarton(data.cartonSize);
    } catch (error) {
      console.error("CBM calculation error:", error);
      return 0;
    }
  }, [data?.cartonSize?.length, data?.cartonSize?.width, data?.cartonSize?.height]);

  const itemsPerCarton = useMemo(() => {
    try {
      if (!data?.productDetails?.length || !data?.cartonSize) return 1;
      return calculateItemsPerCarton(data.productDetails, data.cartonSize);
    } catch (error) {
      console.error("Items per carton calculation error:", error);
      return 1;
    }
  }, [data?.productDetails?.length, data?.cartonSize?.length]);

  const totalCarton = useMemo(() => {
    try {
      if (!quantity || !itemsPerCarton || quantity <= 0) return 1;
      return Math.ceil(quantity / itemsPerCarton);
    } catch (error) {
      console.error("Total carton calculation error:", error);
      return 1;
    }
  }, [quantity, itemsPerCarton]);

  const totalCbm = useMemo(() => {
    try {
      if (!cbmPerUnit || !totalCarton) return "0.000000";
      const result = cbmPerUnit * totalCarton;
      return isNaN(result) ? "0.000000" : result.toFixed(6);
    } catch (error) {
      console.error("Total CBM calculation error:", error);
      return "0.000000";
    }
  }, [cbmPerUnit, totalCarton]);

  // Simplified image handling
  const currentImage = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) return "";
    const index = typeof selectedImageIndex === 'number' && selectedImageIndex >= 0 && selectedImageIndex < images.length ? selectedImageIndex : 0;
    return images[index] || "";
  }, [images.length, selectedImageIndex]);

  const zoomProps = useMemo(() => ({
    width: 400,
    zoomWidth: 400,
    img: currentImage || "",
    zoomPosition: "right",
  }), [currentImage]);

  // Simplified display calculations
  const cartonSizeDisplay = useMemo(() => {
    try {
      if (!data?.cartonSize || typeof data.cartonSize !== 'object') {
        return <span className="text-gray-400">Not specified</span>;
      }

      const length = data.cartonSize.length || data.cartonSize.length || 0;
      const width = data.cartonSize.width || 0;
      const height = data.cartonSize.height || 0;
      
      return <span>{length}x{width}x{height}cm</span>;
    } catch (error) {
      console.error("Carton size display error:", error);
      return <span className="text-gray-400">Error loading size</span>;
    }
  }, [data?.cartonSize?.length, data?.cartonSize?.width, data?.cartonSize?.height]);

  const packingDisplay = useMemo(() => {
    try {
      if (data?.packing) return data.packing;
      const items = typeof itemsPerCarton === 'number' ? itemsPerCarton : 1;
      return `${items} Unit${items > 1 ? "s" : ""} per Carton`;
    } catch (error) {
      console.error("Packing display error:", error);
      return "1 Unit per Carton";
    }
  }, [data?.packing, itemsPerCarton]);

  // Extract user email from JWT - simplified
  useEffect(() => {
    try {
      if (globalState) {
        const userData = extractDataFromJWT(globalState);
        if (userData?.sub) {
          setEmail(userData.sub);
        }
      }
    } catch (error) {
      console.error("JWT extraction error:", error);
    }
  }, [globalState]);

  // Fetch product data
  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const response = await getAProduct(id);

        if (!isMounted) return;

        const productData = response?.data || {};

        // Add dummy carton size data (simulating API response)
        const enhancedProductData = {
          item: "",
          model: "",
          materials: "",
          productDetails: [],
          images: [],
          moq: 1,
          description: "",
          remarks: "",
          ...productData,
          cartonSize: {
            length: 106,
            width: 106,
            height: 106,
          },
        };

        setData(enhancedProductData);
        setImages(enhancedProductData.images || []);
        setQuantity(enhancedProductData.moq || 1);
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching product:", error);
          toast.error("Unable to load product. Please try again.");
          // Set minimal fallback data so the component doesn't break
          setData({
            item: "Product",
            model: "N/A",
            materials: "N/A",
            productDetails: [],
            images: [],
            moq: 1,
            description: "Unable to load product details",
            cartonSize: {
              length: 50,
              width: 50,
              height: 50,
            },
          });
          setImages([]);
          setQuantity(1);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Simplified event handlers
  const handleQuantityChange = useCallback((e) => {
    try {
      const newQuantity = Number(e.target.value);
      const minQuantity = data?.moq || 1;
      
      if (isNaN(newQuantity) || newQuantity < minQuantity) {
        toast.error(`Quantity must be at least ${minQuantity}`);
        return;
      }
      
      setQuantity(newQuantity);
    } catch (error) {
      console.error("Quantity change error:", error);
    }
  }, [data?.moq]);

  const handleAddQuantity = useCallback(() => {
    try {
      setQuantity(prev => Math.max(1, prev + 1));
    } catch (error) {
      console.error("Add quantity error:", error);
    }
  }, []);

  const handleImageHover = useCallback((index) => {
    try {
      if (typeof index === 'number' && index >= 0) {
        setSelectedImageIndex(index);
      }
    } catch (error) {
      console.error("Image hover error:", error);
    }
  }, []);

  const handleAddToCart = useCallback(async () => {
    try {
      if (!email) {
        toast.error("Please login first to add to cart");
        return;
      }

      const cartItem = {
        productName: data?.item || "Product",
        image: images?.[0] || "",
        weight: (getTotalWeight(data?.productDetails || []) * quantity) || 0,
        cbm: totalCbm || "0.000000",
        quantity: quantity || 1,
        email: email,
        price: data?.pricePerPiece || 0,
        cartons: totalCarton || 1,
        itemsPerCarton: itemsPerCarton || 1,
      };

      const response = await addToCart(cartItem);
      toast.success(response?.message || "Added to cart successfully");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart. Please try again.");
    }
  }, [email, data?.item, data?.productDetails, data?.pricePerPiece, images, totalCbm, quantity, totalCarton, itemsPerCarton]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-4 md:mx-16 lg:mx-32">
      <Toaster position="top-center" reverseOrder={true} />

      {/* Main Product Section */}
      <div className="flex flex-col w-full gap-8 mt-4 lg:flex-row">
        {/* Left Side - Images */}
        <div className="flex flex-col items-center gap-4 lg:w-1/2">
          {/* Main Image */}
          <div className="w-full max-w-md">
            {mounted && currentImage ? (
              <>
                <div className="hidden rounded-md lg:block">
                  <ReactImageZoom {...zoomProps} />
                </div>
                <div className="rounded-md lg:hidden">
                  <Zoom>
                    <img
                      src={currentImage}
                      alt="Product"
                      className="w-full h-auto"
                    />
                  </Zoom>
                </div>
              </>
            ) : (
              <div className="border-2 border-gray-300 rounded-md">
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Loading image...</span>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {Array.isArray(images) && images.length > 0 && (
            <div className="flex items-center gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`border-2 transition-all cursor-pointer rounded-md overflow-hidden ${
                    index === selectedImageIndex
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onMouseOver={() => handleImageHover(index)}
                    className="object-cover w-16 h-16"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Product Information */}
        <div className="flex flex-col lg:w-1/2">
          <h1 className="text-2xl font-bold mb-6">{data.item}</h1>

          <div className="space-y-4">
            {/* Art No */}
            <div className="flex">
              <span className="w-32 font-medium text-gray-700">Art No:</span>
              <span className="text-blue-600">{data.model || data.id}</span>
            </div>

            {/* Description */}
            <div className="flex">
              <span className="w-32 font-medium text-gray-700">
                Description:
              </span>
              <span className="flex-1">{data.description || data.item}</span>
            </div>

            {/* Material */}
            <div className="flex">
              <span className="w-32 font-medium text-gray-700">Material:</span>
              <span>{data.materials}</span>
            </div>

            {/* Unit */}
            <div className="flex">
              <span className="w-32 font-medium text-gray-700">Unit:</span>
              <span>
                {data.unit || `Set of ${data.productDetails?.length || 1}`}
              </span>
            </div>

            {/* Packing */}
            <div className="flex">
              <span className="w-32 font-medium text-gray-700">Packing:</span>
              <span>{packingDisplay}</span>
            </div>

            {/* Carton Size */}
            <div className="flex">
              <span className="w-32 font-medium text-gray-700">
                Carton Size:
              </span>
              <div className="flex flex-col">{cartonSizeDisplay}</div>
            </div>

            {/* Item Size */}
            <div className="flex">
              <span className="w-32 font-medium text-gray-700">Item Size:</span>
              <div className="flex flex-col">
                {data.productDetails?.map((detail, index) => (
                  <span key={index} className="text-blue-600">
                    {detail.length}x{detail.width}x{detail.height}cm
                  </span>
                ))}
              </div>
            </div>

            {/* Calculation Summary */}
            {/* {data.cartonSize?.length && (
              <div className="flex">
                <span className="w-32 font-medium text-gray-700">
                  Items/Carton:
                </span>
                <span className="text-green-600 font-medium">
                  {itemsPerCarton} sets per carton
                </span>
              </div>
            )} */}

            {/* Total Carton */}
            <div className="flex items-center">
              <span className="w-32 font-medium text-gray-700">
                Total Carton:
              </span>
              <span className="px-2 py-1 bg-gray-100 border rounded">
                {totalCarton}
              </span>
            </div>

            {/* Total CBM */}
            <div className="flex items-center">
              <span className="w-32 font-medium text-gray-700">Total CBM:</span>
              <span className="px-2 py-1 bg-gray-100 border rounded">
                {totalCbm}
              </span>
            </div>

            {/* Total Quantity */}
            <div className="flex items-center gap-2">
              <span className="w-32 font-medium text-gray-700">
                Total Quantity:
              </span>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={data.moq || 1}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              {/* <button
                onClick={handleAddQuantity}
                className="px-4 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
              >
                Add Quantity
              </button> */}
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full mt-12">
        {/* <div className="w-full px-4 py-3 font-semibold text-gray-700 bg-gray-200 border rounded-t-lg">
          DESCRIPTION
        </div>
        <div className="p-6 border border-t-0 rounded-b-lg bg-white">
          <DisplayOutput text={data.description} />
        </div> */}
        {data.remarks && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded">
            <strong className="text-green-800">Note:</strong> {data.remarks}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
