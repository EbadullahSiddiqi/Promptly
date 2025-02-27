import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const interSans = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Promptly",
  description: "The Content Co-Pilot you've always needed!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="transition-all duration-300">
        <body className={`${interSans.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
