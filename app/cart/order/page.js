"use client";
import { useStateContext } from "@/app/Context/AppContext";
import { getOrder, makePayment } from "@/app/api/api";
import Spinner from "@/app/components/Spinner";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Order ID", "Delivery Status", "Payment Status", "Order Date", "Phone", "Address", "Post Code", "Total Amount"];
function extractDateFromObjectId(objectId) {
    // Ensure the input is a valid ObjectId string
    if (typeof objectId !== 'string' || objectId.length !== 24) {
        throw new Error('Invalid ObjectId string');
    }

    // Extract the timestamp (first 8 characters) and convert from hex to an integer
    const timestampHex = objectId.substring(0, 8);
    const timestamp = parseInt(timestampHex, 16);

    // Create a new Date object using the timestamp in milliseconds
    const date = new Date(timestamp * 1000);

    return date;
}
const FeedBack = () => {
    const { token } = useStateContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrder(token).then((res) => {
            console.log(res.data);
            setOrders(res.data);
            setLoading(false);
        });
    }, [token]);

    const handlePayment = async (order) => {
        const res = await makePayment(order);
        location.replace(res.data.url);
        console.log(res);
    }

    if (!orders.length) {
        return <div className="text-center mt-10 text-gray-500">No order history</div>;
    }
    if (loading) {
        return <Spinner />;
    }


    return (
        <div className="max-w-6xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 text-xs font-semibold">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-xs">
                                <td className="py-2 px-4 border-b border-gray-200">{order.id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.deliveryStatus}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.paymentStatus}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{new Date(extractDateFromObjectId(order.id)).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.phone}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.address}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.postCode}</td>
                                <td className="py-2 px-4 border-b border-gray-200">${order.totalAmount}</td>
                                {/* <td className="py-2 px-4 border-b border-gray-200">
                                    <button 
                                        className={`px-3 py-1 rounded text-white ${order.paymentStatus === "Paid" ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"}`} 
                                        disabled={order.paymentStatus === "Paid"} 
                                        onClick={() => handlePayment(order)}
                                    >
                                        {order.paymentStatus === "Paid" ? "Paid" : "Make Payment"}
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedBack;
