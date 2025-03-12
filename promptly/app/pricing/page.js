"use client";

import React from "react";
import { Check, Zap, Star } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PricingPage() {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started and exploring basic features.",
      features: [
        "AI-Powered Writing Assistant (Limited)",
        "Access to 5 Templates",
        "Basic SEO Suggestions",
        "Community Support",
      ],
      cta: "Get Started",
      ctaLink: "/signup",
      icon: Star,
      popular: false,
    },
    {
      name: "Pro",
      price: "$18/Month",
      description:
        "Unlock the full potential of Promptly with advanced features.",
      features: [
        "Unlimited AI-Powered Writing",
        "Access to 50+ Templates",
        "Advanced SEO Optimization Tools",
        "Content Research Assistant",
        "Priority Support",
      ],
      cta: "Subscribe Now",
      ctaLink: "/pro",
      icon: Zap,
      popular: true,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="pricing-page flex justify-center items-center py-32 px-4 sm:px-8 bg-gray-50">
        <div className="flex flex-col gap-10 max-w-6xl w-full">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-semibold">
              Simple Pricing for Everyone
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4">
              Choose a plan that fits your needs and start creating better
              content today.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`flex flex-col gap-6 p-8 bg-white rounded-2xl shadow-lg ${
                  tier.popular
                    ? "border-2 border-blue-500"
                    : "border border-gray-200"
                } sm:max-w-[400px] w-full`}
              >
                {/* Tier Header */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <tier.icon className="w-6 h-6 text-blue-500" />
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {tier.name}
                    </h2>
                    {tier.popular && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-gray-800">
                    {tier.price}
                  </span>
                  {tier.price !== "$0" && (
                    <span className="text-gray-500">/month</span>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}

                {tier.name === "Free" && (
                  <SignInButton
                    forceRedirectUrl="/dashboard"
                    className={`mt-4 w-full text-center ${
                      tier.popular
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } py-3 px-6 rounded-lg font-medium transition-all duration-300`}
                  >
                    {tier.cta}
                  </SignInButton>
                )}
                {tier.name === "Pro" && (
                  <Link
                    href="/pro"
                    className={`mt-4 w-full text-center ${
                      tier.popular
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    } py-3 px-6 rounded-lg font-medium transition-all duration-300`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="text-center text-gray-500 text-sm">
            Need more?{" "}
            <Link href="/contact" className="text-blue-500 hover:underline">
              Contact us
            </Link>{" "}
            for enterprise solutions.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PricingPage;
