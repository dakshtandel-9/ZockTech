import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ZockTech - Website Development Agency in Bangalore, Uttara Kannada & Honnavar",
  description:
    "ZockTech is a leading website development agency in Bangalore, Uttara Kannada, and Honnavar. We build fast, secure, and beautiful websites to help your business grow. Contact us for web development and digital marketing services.",
  keywords: [
    "ZockTech",
    "Website development agency in Bangalore",
    "Website development in Uttara Kannada",
    "Website development in Honnavar",
    "web development agency",
    "digital marketing",
    "SEO",
  ],
  creator: "ZockTech",
  publisher: "ZockTech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}