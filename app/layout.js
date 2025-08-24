import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "./components/Loader";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ZockTech - Web Development and Digital Marketing",
  description:
    "ZockTech is a leading web development and digital marketing agency based in Bangalore, Uttara Kannada, and Honnavar. We specialize in creating stunning, high-performance websites and implementing effective digital marketing strategies to help your business grow. Our services include web development, SEO, social media marketing, and content creation.",
  keywords: [
    "web development",
    "digital marketing",
    "seo",
    "websites",
    "ZockTech",
    "Website development agency in Bangalore",
    "website development in Uttara Kannada",
    "website development in Honnavar",
  ],
  author: "ZockTech",
  "og:title": "ZockTech - Web Development and Digital Marketing",
  "og:description":
    "ZockTech is a leading web development and digital marketing agency based in Bangalore, Uttara Kannada, and Honnavar. We specialize in creating stunning, high-performance websites and implementing effective digital marketing strategies to help your business grow. Our services include web development, SEO, social media marketing, and content creation.",
  "og:image": "/logo.png",
  "og:url": "https://zocktech.com",
  "twitter:card": "summary_large_image",
  "twitter:title": "ZockTech - Web Development and Digital Marketing",
  "twitter:description":
    "ZockTech is a leading web development and digital marketing agency based in Bangalore, Uttara Kannada, and Honnavar. We specialize in creating stunning, high-performance websites and implementing effective digital marketing strategies to help your business grow. Our services include web development, SEO, social media marketing, and content creation.",
  "twitter:image": "/logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Loader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}