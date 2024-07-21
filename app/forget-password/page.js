"use client";
import React, { useState } from "react";
import Link from "next/link";
import { getOtp, resetPassword, verifyOtp } from "../api/api"; // Assume these API functions are defined
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function generateSixDigitRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

const ForgetPasswordForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        otp: ""
    });
    const [sending, setSending] = useState(false);
    const [sotp, setSotp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSendOtp = async () => {
        setSending(true);
        const randomNumber = generateSixDigitRandomNumber();
        setSotp(randomNumber);

        try {
            const data = await getOtp(formData.email, `Your OTP: ${randomNumber}`);
            if (data.result) {
                setOtpSent(true);
                toast(data.message);
            } else {
                toast(data.message);
            }
            setSending(false);
        } catch (error) {
            console.error("Failed to send OTP:", error);
            toast("Failed to send OTP. Please try again later.");
        }
    };

    const handleVerifyOtp = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            otp: e.target.value,
        }));

        if (e.target.value == sotp) {
            setVerified(true);
        } else {
            setVerified(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!verified) {
            toast("Please verify OTP before resetting the password.");
            return;
        }

        console.log(formData.email, formData.password);
        try {
            const data = await resetPassword(
                 formData.email,
                formData.password
            );
            if (data.result) {
                toast(data.message);
                router.push("/");
            } else {
                toast(data.message);
            }
            setFormData({
                email: "",
                password: "",
                otp: ""
            });
            setOtpSent(false);
            setVerified(false);
        } catch (error) {
            console.error("Failed to reset password:", error);
            toast("Failed to reset password. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col justify-center lg:flex-row lg:mx-28">
            <form
                onSubmit={handleResetPassword}
                className="lg:w-96 my-6 p-6 bg-white rounded-lg shadow-lg"
            >
                <Toaster position="top-center" reverseOrder={true} />
                <h2 className="text-2xl font-bold uppercase">Forget Password</h2>
                <p>Reset your password here</p>
                <hr />
                <br />
                <div className="mb-4">
                    <label htmlFor="email" className="block text-xs text-gray-700">
                        Email*
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                    {
                        sending && (
                            <div className="mt-2">sending...</div>
                        )
                    }
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        className={`bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ${
                            !formData.email && "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!formData.email}
                    >
                        Send OTP
                    </button>
                </div>
                {otpSent && (
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-xs text-gray-700">
                            Enter OTP
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                value={formData.otp}
                                onChange={handleVerifyOtp}
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                            />
                            <label
                                htmlFor="otp"
                                className="flex items-center text-3xl text-gray-700 transition-all"
                            >
                                {verified ? "✅" : "❌"}
                            </label>
                        </div>
                    </div>
                )}
                 <div className={`mb-4  ${!verified ? 'hidden' : ''}`}>
                    <label htmlFor="password" className="block text-xs text-gray-700">
                        New Password*
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-green-500`}
                        required
                        disabled={!verified}
                    />
                <button
                    type="submit"
                    className={`mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ${
                        !verified && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!verified}
                >
                    Reset Password
                </button>
                </div>
            </form>
          
        </div>
    );
};

export default ForgetPasswordForm;
