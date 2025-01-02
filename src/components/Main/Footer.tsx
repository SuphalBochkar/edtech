import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

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
    <footer className="absolute left-0 bottom-0 w-full mt-auto border-t border-violet-500/10">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/80 backdrop-blur-sm" />

      <div className="relative max-w-3xl mx-auto px-4">
        <div className="py-3">
          {/* Top Row - and Links */}
          <div className="flex items-center justify-between mb-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-bold bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent"
            >
              {businessName}
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-end">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="text-xs text-gray-400 hover:text-violet-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Row - Copyright and Security */}
          <div className="flex items-center justify-between pt-2 border-t border-violet-500/10">
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <span>© {currentYear} Edtech.</span>
              <span>Made with</span>
              <Heart className="h-3 w-3 text-violet-500" />
              <span>by {businessName}</span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-gray-400"
            >
              Secured by Razorpay 🔒
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
