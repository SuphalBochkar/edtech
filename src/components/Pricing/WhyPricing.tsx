// import { motion } from "framer-motion";
// import { ExternalLink } from "lucide-react";
// import React from "react";

// const WhyPricing = () => {
//   return (
//     <motion.div
//       animate={{ y: 0, opacity: 1 }}
//       transition={{
//         duration: 0.5,
//         ease: "easeInOut",
//         type: "spring",
//         // damping: 10,
//         delay: 0.5,
//       }}
//       initial={{ y: -20, opacity: 0 }}
//       className="px-6"
//     >
//       <section className="max-w-2xl mx-auto my-10 sm:my-0">
//         {/* <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-violet-200"> */}
//         <h2 className="h-20 text-3xl text-center tracking-tight sm:text-5xl font-bold bg-gradient-to-b from-violet-300 to-violet-800 bg-clip-text text-transparent">
//           Why Are We Charging?
//         </h2>
//         <div className="backdrop-blur-lg border border-gray-800 shadow-2xl sm:mt-20 sm:h-[53vh] sm:p-10 text-gray-300 rounded-3xl p-6">
//           <p className="leading-relaxed mb-4">
//             Our primary goal has always been to provide the best free resources
//             to all of them. However, due to our high load base, we{"'"}ve had to
//             introduce a small fee to maintain and cover our costs.
//           </p>
//           <p className="leading-relaxed mb-4">
//             We{"'"}ve worked hard to keep costs as low as possible. For less
//             than the price of a drink or a quick snack, you get access to our
//             Courses.
//           </p>
//           <p className="leading-relaxed ">
//             If you’re unable to pay or would like to request to reduce fee,
//             please reach out to us on{" "}
//             <a
//               href="https://t.me/+sYgr_ndeZQIzZTll"
//               target="_blank"
//               className="text-violet-500 px-1 hover:text-violet-600 transition-colors duration-200 inline-flex items-center"
//             >
//               Telegram
//               <ExternalLink className="ml-1 h-4 w-4" />
//             </a>
//             . We’ll work with you to find a way to provide access, including
//             free options where we can.
//           </p>
//         </div>
//       </section>
//     </motion.div>
//   );
// };

// export default WhyPricing;

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
      className="px-4 sm:px-6 py-12 sm:py-16"
    >
      <section className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-violet-300 to-violet-800 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Why Are We Charging?
        </motion.h2>
        <motion.div
          className="backdrop-blur-lg border border-violet-500/20 shadow-2xl rounded-3xl p-6 sm:p-10 text-gray-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="space-y-6">
            <p className="leading-relaxed">
              Our primary goal has always been to provide the best free
              resources to all. However, due to our high user base, we{"'"}ve
              had to introduce a small fee to maintain and cover our costs.
            </p>
            <p className="leading-relaxed">
              We{"'"}ve worked hard to keep costs as low as possible. For less
              than the price of a drink or a quick snack, you get access to our
              comprehensive Courses.
            </p>
            <p className="leading-relaxed">
              If you{"'"}re unable to pay or would like to request a reduced
              fee, please don{"'"}t hesitate to reach out to us on{" "}
              <a
                href="https://t.me/+sYgr_ndeZQIzZTll"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 transition-colors duration-200 inline-flex items-center group"
              >
                Telegram
                <ExternalLink className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              . We{"'"}ll work with you to find a way to provide access,
              including free options where possible.
            </p>
          </div>
          <motion.div
            className="mt-8 p-4 bg-violet-900/30 rounded-xl border border-violet-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h3 className="flex items-center text-lg font-semibold text-violet-300 mb-2">
              <HelpCircle className="mr-2 h-5 w-5" />
              Need Help?
            </h3>
            <p className="text-sm text-gray-400">
              If you have any questions or concerns about our pricing, please
              don{"'"}t hesitate to contact us. We{"'"}re here to help!
            </p>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default WhyPricing;
