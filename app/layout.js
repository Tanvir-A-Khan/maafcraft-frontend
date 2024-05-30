import { Inter } from "next/font/google";
import Head from "next/head"; // Import the Head component for setting metadata
import "./globals.css";
import Footer from "./components/Footer";
import HeaderTop from "./components/HeaderTop";
import Navbar from "./components/Navbar";
import { GlobalProvider } from "./Context/GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "maafcraft.com",
    description: "Designed and created by Tanvir Ahmed Khan",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className={inter.className}>
                <GlobalProvider>
                    <HeaderTop />
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </GlobalProvider>
            </body>
        </html>
    );
}
