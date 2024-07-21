"use client";
import { useStateContext } from "@/app/Context/AppContext";
import { getOrder, makePayment, updateDeliveryStatus } from "@/app/api/api"; // Assuming updateDeliveryStatus is the API endpoint
import Spinner from "@/app/components/Spinner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TABLE_HEAD = ["Order ID", "Order Date", "Phone", "Address", "Post Code", "Total Amount", "Delivery Status", "Payment Status", "Actions"];

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
    const [working, setWorking] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrder(token).then((res) => {
            console.log(res.data);
            setOrders(res.data);
            setLoading(false);
        });
    }, [token]);

    const handlePayment = async (order) => {
        setWorking(true);
        const res = await makePayment(order);
        location.replace(res.data.url);
        console.log(res);
        setWorking(false);
    }
    const handleStatusChange = async(orderId, newStatus) => {
        try {
            setWorking(true);
            const res = await updateDeliveryStatus(orderId, newStatus);
            toast(res.message);
            // Update the order status locally
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, deliveryStatus: newStatus } : order
                )
            );
            
            // Log the change
            console.log(`Order ID ${orderId} delivery status changed to ${newStatus}`);
        } catch (error) {
            console.error('Failed to update delivery status', error);
        }
        setWorking(false);
    };
    

    if(working){
        return "updating data"
    }

    if (loading) {
        return <Spinner />;
    }

    if (!orders.length) {
        return <div className="text-center mt-10 text-gray-500">No order history</div>;
    }

    return (
        <div className="mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-gray-200">{order.id}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{new Date(extractDateFromObjectId(order.id)).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.phone}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.address}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.postCode}</td>
                                <td className="py-2 px-4 border-b border-gray-200">${order.totalAmount}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <select
                                        value={order.deliveryStatus}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="bg-gray-100 border border-gray-300 text-gray-700 py-1 px-2 rounded"
                                    >
                                        <option value="Initiating">Initiating</option>
                                        <option value="Processing">Processing</option>
                                        <option value="On the way">On the way</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.paymentStatus}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button
                                        className={`px-3 py-1 rounded text-white ${order.paymentStatus === "Paid" ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"}`}
                                        // disabled={true}
                                        onClick={() => handlePayment(order)}
                                    >
                                        {order.paymentStatus === "Paid" ? "Paid" : "Not Paid"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedBack;
