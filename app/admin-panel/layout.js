"use client";
import { useRouter } from "next/navigation";
import AdminNav from "./admin-nav/page";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const adminEmail = localStorage.getItem("email");
        if (adminEmail !== 'mostlytanvir@gmail.com') {
            router.push("/notfound");
        }
    }, [router]);

    return (
        <div className="flex flex-col justify-start gap-2">
            <AdminNav />
            <div className="flex flex-col justify-center items-center px-4">
                <h1 className="text-red-600 font-bold text-3xl uppercase underline">
                    Admin Panel
                </h1>
                {children}
            </div>
        </div>
    );
}
