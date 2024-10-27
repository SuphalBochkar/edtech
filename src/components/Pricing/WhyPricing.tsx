import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import React from "react";

const WhyPricing = () => {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        // damping: 10,
        delay: 0.5,
      }}
      initial={{ y: -20, opacity: 0 }}
      className="px-6"
    >
      {/* <div className="text-center text-3xl font-bold my-3 ">Why Pricing?</div>
      <div>
      <p className="text-center font-semibold text-gray-400">
      Our main motive was to provide the free and best resource to the
      students. but, due to large numbers of users we have to charge a
      little amount to maintain the quality of the content. and we cut the
      cost as much as possible. its just cost a price of coffee for a
      lifetime access. so, why not? If you are really not willing to pay
      contat me on the <a href="">telegram</a> I will try to give it for
      free
      </p>
      </div> */}

      <section className="max-w-2xl mx-auto my-10 sm:my-0">
        {/* <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-violet-200"> */}
        <h2 className="h-20 text-3xl text-center tracking-tight sm:text-5xl font-bold bg-gradient-to-b from-violet-300 to-violet-800 bg-clip-text text-transparent">
          Why Are We Charging?
        </h2>
        <div className="backdrop-blur-lg border border-gray-800 shadow-2xl sm:mt-20 sm:h-[53vh] sm:p-10 text-gray-300 rounded-3xl p-6">
          <p className="leading-relaxed mb-4">
            Our primary goal has always been to provide the best free resources
            to all of them. However, due to our high load base, we{"'"}ve had to
            introduce a small fee to maintain and cover our costs.
          </p>
          <p className="leading-relaxed mb-4">
            We{"'"}ve worked hard to keep costs as low as possible. For less
            than the price of a coffee, you get lifetime access to our website.
          </p>
          <p className="leading-relaxed ">
            If you’re unable to pay or would like to request to reduce fee,
            please reach out to us on{" "}
            <a
              href="https://t.me/+sYgr_ndeZQIzZTll"
              target="_blank"
              className="text-violet-500 px-1 hover:text-violet-600 transition-colors duration-200 inline-flex items-center"
            >
              Telegram
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            . We’ll do our best to provide a solution for your situation and
            provide access for free whenever possible.
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default WhyPricing;
