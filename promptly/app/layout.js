import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const interSans = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Promptly",
  description: "The Content Co-Pilot you've always needed!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
