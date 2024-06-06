import { Inter } from "next/font/google";
import Head from "next/head";
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
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="icon" href="/favicon.ico" />
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
                        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                        (function(){
                        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                        s1.async=true;
                        s1.src='https://embed.tawk.to/6660ff1c9a809f19fb399041/1hvle92qj';
                        s1.charset='UTF-8';
                        s1.setAttribute('crossorigin','*');
                        s0.parentNode.insertBefore(s1,s0);
                        })();
                        `,
                    }}
                />
            </head>
            <body className={inter.className}>
                <GlobalProvider>
                    <HeaderTop />
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </GlobalProvider>
            </body>
        </html>
    );
}
