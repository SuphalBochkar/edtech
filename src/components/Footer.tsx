import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const businessName = process.env.NEXT_PUBLIC_MY_NAME || "Your Business Name";

  return (
    <footer className="absolute left-0 bottom-0 w-full mt-auto bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} F66. All rights reserved.
            </p>
          </div>
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Business: {businessName}
          </div>
        </div>
      </div>
    </footer>
  );
}
