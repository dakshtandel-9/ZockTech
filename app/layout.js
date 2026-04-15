import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "./components/Loader";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothCursor } from "@/components/SmoothCursor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Zocktech — Professional Web Development for Indian Businesses",
  description:
    "Zocktech builds fast, modern websites using React and Next.js. Starting ₹8,000. For gyms, salons, real estate agents, coaches, and D2C brands. Based in India.",
  keywords: [
    "web development India",
    "Next.js website India",
    "React website agency India",
    "affordable web development",
    "Zocktech",
    "website for small business India",
    "landing page India",
    "gym website",
    "salon website",
  ],
  author: "Zocktech",
  icons: {
    icon: "/zocktechLogo/lightLogo.png",
    apple: "/zocktechLogo/lightLogo.png",
  },
  "og:title": "Zocktech — Professional Web Development for Indian Businesses",
  "og:description":
    "We build fast, modern websites using React and Next.js. Starting ₹8,000. Delivered in 3–7 days.",
  "og:image": "/zocktechLogo/lightLogo.png",
  "og:url": "https://zocktech.com",
  "twitter:card": "summary_large_image",
  "twitter:title": "Zocktech — Professional Web Development for Indian Businesses",
  "twitter:description":
    "We build fast, modern websites using React and Next.js. Starting ₹8,000. Delivered in 3–7 days.",
  "twitter:image": "/zocktechLogo/lightLogo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline theme init — runs before React to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  // Default is dark — only apply light if explicitly stored as 'light'
                  if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })()
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Loader />
          <SmoothCursor />
          <Header />
          {children}
          <Footer />
          {/* Floating WhatsApp Button */}
          <Link
            href="https://wa.me/917829475479"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Chat with us on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="28"
              height="28"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </Link>
        </ThemeProvider>
      </body>
    </html>
  );
}