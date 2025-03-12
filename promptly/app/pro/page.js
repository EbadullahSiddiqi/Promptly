"use client";

import React from "react";
import { CheckCircle, Mail, Banknote } from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function ProPage() {
  return (
    <>
      <Navbar />
      <div className="pro-page flex justify-center items-center py-32 px-4 sm:px-8 bg-gray-50">
        <div className="flex flex-col gap-8 max-w-2xl w-full bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
              Upgrade to Pro
            </h1>
            <p className="text-gray-600 mt-4">
              To unlock all the premium features of Content Co-Pilot, follow the
              steps below to complete your payment.
            </p>
          </div>

          {/* Payment Instructions */}
          <div className="flex flex-col gap-6">
            {/* Step 1: IBAN Details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Banknote className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Step 1: Send Payment
                </h2>
              </div>
              <p className="text-gray-600">
                Transfer the Pro subscription fee of <strong>$18</strong> to the
                following IBAN:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800 font-mono break-all">
                  PK69SADA0000003298819498
                </p>
              </div>
              <p className="text-gray-600 text-sm">
                Please include your email address in the payment reference so we
                can identify your transaction.
              </p>
            </div>

            {/* Step 2: Confirmation */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Step 2: Confirm Payment
                </h2>
              </div>
              <p className="text-gray-600">
                Once the payment is completed, send an email to{" "}
                <a
                  href="mailto:your-email@example.com"
                  className="text-blue-500 hover:underline"
                >
                  dev.ebadullah@gmail.com
                </a>{" "}
                with the following details:
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Your full name</li>
                <li>Email address used for Content Co-Pilot</li>
                <li>Transaction ID or proof of payment</li>
              </ul>
            </div>

            {/* Step 3: Activation */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Step 3: Get Activated
                </h2>
              </div>
              <p className="text-gray-600">
                Once we verify your payment, we’ll upgrade your account to Pro
                within 24 hours. You’ll receive a confirmation email once it’s
                done.
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 transition-all duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProPage;
