import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const businessName = process.env.NEXT_PUBLIC_MY_NAME || "Your Business Name";

  const footerLinks = [
    {
      name: "Terms and Conditions",
      href: "https://merchant.razorpay.com/policy/PEDPumB1V1FAM1/terms",
    },
    {
      name: "Contact Us",
      href: "https://merchant.razorpay.com/policy/PEDPumB1V1FAM1/contact_us",
    },
    {
      name: "Cancellation and Refund Policy",
      href: "https://merchant.razorpay.com/policy/PEDPumB1V1FAM1/refund",
    },
    {
      name: "Privacy Policy",
      href: "https://merchant.razorpay.com/policy/PEDPumB1V1FAM1/privacy",
    },
    {
      name: "Shipping and Delivery Policy",
      href: "https://merchant.razorpay.com/policy/PEDPumB1V1FAM1/shipping",
    },
  ];

  return (
    <footer className="absolute left-0 bottom-0 w-full mt-auto bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} F66. All rights reserved.
            </p>
          </div>
          <div className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
            Business: {businessName}
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
