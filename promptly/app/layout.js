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
  title: "Content Co-Pilot",
  description: "The Content Co-Pilot you've always needed!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="transition-all duration-300">
        <head>
          <meta
            name="google-site-verification"
            content="XQYCc-o6moOPLQxYO8zeo4W0e5kn7jOvneQIiGZe6bw"
          />
        </head>
        <body className={`${interSans.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
