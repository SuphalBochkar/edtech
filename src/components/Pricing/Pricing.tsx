import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center w-full">
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
          delay: 0.3,
        }}
        initial={{ y: -20, opacity: 0 }}
        className="relative flex flex-col items-center isolate text-background px-4 sm:px-6 lg:px-8 py-6 sm:py-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#8b3ef0] to-[#9089fc] opacity-30"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto max-w-2xl text-center lg:max-w-4xl mb-4 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-300 to-violet-800 bg-clip-text text-transparent pb-2">
            Unlock Your Learning Potential
          </h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-300">
            Get all the answers in one place to study better and complete all
            modules with confidence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-md mx-auto backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-3xl p-6 sm:p-8 ring-1 ring-violet-500/50"
        >
          <div className="text-center">
            <h3 className="text-violet-400 text-lg sm:text-xl font-semibold leading-7 flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Full Access
            </h3>
            <div className="mt-4 sm:mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-4xl sm:text-6xl font-bold tracking-tight text-violet-100">
                ₹{1}
              </span>
              <span className="text-xl sm:text-2xl text-gray-400 line-through">
                ₹99
              </span>
            </div>
          </div>

          <p className="text-gray-300 mt-4 sm:mt-6 text-base sm:text-lg text-center font-medium">
            All Test Answers, Right at Your Fingertips
          </p>

          <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-gray-300 text-xs sm:text-sm leading-5 sm:leading-6">
            {[
              "Access answers for every level test",
              "Quickly search and locate specific questions and images support",
              "No more searching in PDF's",
              "A secure, reliable alternative to misleading sources",
              "Free access to all upcoming tests once registered",
            ].map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Check className="h-4 w-4 sm:h-6 sm:w-6 flex-shrink-0 text-violet-500 mr-2 sm:mr-3" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-violet-500 text-white shadow-lg hover:bg-violet-600 focus-visible:outline-violet-500 mt-6 sm:mt-8 block rounded-full py-2 sm:py-3 text-center text-base sm:text-lg font-semibold transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
            onClick={() => router.push("/pay")}
          >
            Get Access Now
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Pricing;
