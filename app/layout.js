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
  title: "ZockTech - Web Development and Digital Marketing",
  description:
    "ZockTech is a web development and digital marketing agency. We build beautiful, fast, and secure websites. We also offer a wide range of digital marketing services to help you grow your business.",
  keywords: ["web development", "digital marketing", "seo", "websites", "ZockTech"],
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