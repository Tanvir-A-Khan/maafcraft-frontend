"use client";
import { getUsers } from "@/app/api/api";
import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const TABLE_HEAD = [
    "Name",
    "Email",
    "Phone",
    "Address",
    "LinkedIn",
    "Created At",
];

const UserManagement = () => {
    const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getUsers().then((res) => {
            console.log(res.data);
            setTABLE_ROWS(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-start items-center mx-4">
            <h1 className="text-2xl my-4 uppercase font-bold mb-8">
                User Management
            </h1>
            <div className="">
                <table className="w-full ">
                    <thead>
                        <tr className="bg-blue-100">
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="py-2 px-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(
                            (
                                {
                                    name,
                                    email,
                                    phone,
                                    address,
                                    linkedIn,
                                    createdAt,
                                },
                                index
                            ) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "py-4 px-4"
                                    : "py-4 px-4 border-b border-blue-gray-200";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {name}
                                            </Typography>
                                        </td>
                                        <td
                                            className={`${classes} bg-blue-gray-50/50`}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {phone}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {address}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {linkedIn}
                                            </Typography>
                                        </td>
                                        <td
                                            className={`${classes} bg-blue-gray-50/50`}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {createdAt}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
