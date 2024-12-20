import { motion } from "framer-motion";
import { ExternalLink, HelpCircle } from "lucide-react";
import React from "react";

const WhyPricing = () => {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
        delay: 0.5,
      }}
      initial={{ y: -20, opacity: 0 }}
      className="relative flex flex-col items-center isolate px-3 sm:px-4 lg:px-6 py-4 sm:py-6 justify-center w-full text-left"
    >
      <motion.div
        className="backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-2xl p-4 sm:p-6 text-gray-300 w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-violet-300 to-violet-800 bg-clip-text text-transparent">
          Why Are We Charging?
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Quality Education for All",
              content:
                "Our primary goal has always been to provide the best free resources to all. However, due to our high user base, we've had to introduce a small fee to maintain and cover our costs.",
              icon: "💫",
            },
            {
              title: "Affordable Investment",
              content:
                "We've worked hard to keep costs as low as possible. For less than the price of a drink or a quick snack, you get access to our comprehensive Courses.",
              icon: "🎯",
            },
            {
              title: "Flexible Options",
              content:
                "If you're unable to pay or would like to request a reduced fee, we're here to help find a solution that works for you.",
              icon: "🤝",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex gap-4 p-4 rounded-xl hover:bg-violet-900/10 transition-colors duration-200"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="text-violet-300 font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 p-4 bg-violet-900/20 rounded-xl border border-violet-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <h3 className="flex items-center text-lg font-semibold text-violet-300 mb-3">
            <HelpCircle className="mr-2 h-5 w-5" />
            Need Assistance?
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            Contact us on Telegram for support or to discuss flexible payment
            options:
          </p>
          <a
            href="https://t.me/+sYgr_ndeZQIzZTll"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 transition-colors duration-200 group"
          >
            <span>Join our Telegram</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WhyPricing;
