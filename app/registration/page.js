"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import {
    getOtp,
    loginUser,
    registerUser,
    sendOtp,
    verifyOtp,
} from "../api/api"; // Assume these API functions are defined
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStateContext } from "../Context/AppContext";

function generateSixDigitRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Example usage:
const randomNumber = generateSixDigitRandomNumber();
console.log(randomNumber);

const RegistrationForm = () => {
    const { globalState, setGlobalState, token, setToken } = useStateContext();
    const router = useRouter();

    const [formDataRegistration, setFormDataRegistration] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        address: "",
        password: "",
        designation: "",
        organization: "",
    });

    const [otp, setOtp] = useState("");
    const [sotp, setSotp] = useState("");
    const [verified, setVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataRegistration((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [sending, setSending] = useState(false);

    const handleSendOtp = async () => {
        setSending(true);
        const randomNumber = generateSixDigitRandomNumber();
        // console.log(randomNumber);
        setSotp(randomNumber);

        try {
            const data = await getOtp(
                formDataRegistration.email,
                `Your OTP from Maafcraft: ${randomNumber}`
            );
            if (data.result) {
                setOtpSent(true);
                toast(data.message);
            } else {
                toast(data.message);
            }
        } catch (error) {
            console.error("Failed to send OTP:", error);
            toast("Failed to send OTP. Please try again later.");
        } finally{
            setSending(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        setOtp(e.target.value);

        if (e.target.value == sotp) {
            // console.log("boom", sotp);
            setVerified(true);
        } else {
            setVerified(false);
            // console.log("doom", sotp);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!verified) {
            toast("Please verify OTP before submitting the form.");
            return;
        }
        try {
            const data = await registerUser(formDataRegistration);
            if (data.result) {
                console.log(data);
                toast(data.message);
            } else {
                toast(data.message);
            }
            setFormDataRegistration({
                name: "",
                email: "",
                phone: "",
                linkedin: "",
                address: "",
                password: "",
                designation: "",
                organization: "",
            });
            setOtp("");
            setOtpSent(false);
            setOtpVerified(false);
        } catch (error) {
            console.error("Registration failed:", error);
            toast("Failed to register user. Please try again later.");
        }
    };

    const [formDataLogin, setFormDataLogin] = useState({
        email: "",
        password: "",
    });

    const handleChangeLoginData = (e) => {
        const { name, value } = e.target;
        setFormDataLogin((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formDataLogin);

        try {
            const data = await loginUser(formDataLogin);
            if(data.result){
                setGlobalState(data.sub);
                setToken(formDataLogin.email);
                localStorage.setItem("email", formDataLogin.email);
                setFormDataLogin({
                    email: "",
                    password: "",
                });
                toast(data.message);
                router.push("/");
            }
            toast(data.message);
            // console.log(data);
        } catch (e) {

            console.log(e);
        }
    };

    return (
        <div className="flex flex-col justify-center gap-10 lg:flex-row lg:mx-28">
          
            <form
                onSubmit={handleLogin}
                className="lg:w-96 my-6 p-6 bg-white rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold uppercase">
                    Returning Customer
                </h2>
                <p>Login Here</p>
                <hr />
                <br />
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-xs text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formDataLogin.email}
                        onChange={handleChangeLoginData}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-xs text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formDataLogin.password}
                        onChange={handleChangeLoginData}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                    Login
                </button>
                <p className="my-4 text-sm">
                    <Link href="/forget-password">
                        Forgot your password? Reset here
                    </Link>
                </p>
            </form>
            <form
                onSubmit={handleSubmit}
                className="lg:w-96 my-6 p-6 bg-white rounded-lg shadow-lg"
            >
                <Toaster position="top-center" reverseOrder={true} />
                <h2 className="text-2xl font-bold uppercase">New Customer</h2>
                <p>Register Here</p>
                <hr />
                <br />
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-xs text-gray-700"
                    >
                        Name*
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formDataRegistration.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-xs text-gray-700"
                    >
                        Email*
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formDataRegistration.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        className={`bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ${
                            !formDataRegistration.email && "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={formDataRegistration.email==="" || sending}
                    >
                
                        {
                            sending ? "Sending" : "Send OTP"
                        }
                        
                    </button>
                </div>
                {otpSent && (
                    <div className="mb-4">
                        <label
                            htmlFor="otp"
                            className="block text-xs text-gray-700"
                        >
                            Enter OTP
                        </label>
                        <div className="flex">

                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={(e) => handleVerifyOtp(e)}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                            />
                         <label
                            htmlFor="otp"
                            className="flex items-center text-3xl text-gray-700 transition-all"
                        >

                            {(verified ?  "✅" : "❌" )}
                        </label>
                            </div>
                      
                    </div>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block text-xs text-gray-700"
                    >
                        Phone*
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formDataRegistration.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-xs text-gray-700"
                    >
                        Password*
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formDataRegistration.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="linkedin"
                        className="block text-xs text-gray-700"
                    >
                        Linkedin
                    </label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={formDataRegistration.linkedin}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="address"
                        className="block text-xs text-gray-700"
                    >
                        Address*
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formDataRegistration.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="designation"
                        className="block text-xs text-gray-700"
                    >
                        Designation*
                    </label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formDataRegistration.designation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="organization"
                        className="block text-xs text-gray-700"
                    >
                        Organization*
                    </label>
                    <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formDataRegistration.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-green-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 ${
                        !verified && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!verified}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
