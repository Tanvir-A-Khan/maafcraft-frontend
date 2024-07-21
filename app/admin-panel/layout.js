"use client";
import AdminNav from "./admin-nav/page";

export default function AdminLayout({ children }) {
    // const admin = localStorage.getItem("email");
    // console.log(admin);
    // console.log(process.env.ADMIN_CREDENTIAL);
    // if(admin === process.env.ADMIN_CREDENTIAL){
    //     return <div>
    //         <h1>Page not found</h1>
    //     </div>
    // }
    return (
        <div className=" flex flex-col justify-start gap-2">
            <AdminNav />
            <div className="flex flex-col justify-center items-center px-4">
                <h1 className="text-red-600 font-bold text-3xl uppercase underline">
                    Admin panel
                </h1>
                {children}
            </div>
        </div>
    );
}
