// import { CheckIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Example() {
  return (
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
      className="relative flex flex-col items-center isolate text-background px-6 lg:px-8"
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
      <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
        <p className="h-16 text-3xl tracking-tight sm:text-5xl font-bold bg-gradient-to-b from-violet-300 to-violet-800 bg-clip-text text-transparent">
          The right price for you
        </p>
      </div>
      <p className="text-foreground mx-auto max-w-xl text-center text-base sm:text-lg sm:leading-8 text-gray-400">
        Get all the answers at one place which can help study better and
        complete all modules
      </p>
      <div className=" w-[95%] sm:w-[65%] backdrop-blur-lg border border-gray-800 shadow-2xl rounded-3xl p-8 mt-5 ring-1 ring-gray-900/10 sm:p-10">
        <h3 className="text-foreground text-violet-400 text-base font-semibold leading-7">
          Lifetime
        </h3>
        <p className="text-background mt-4 flex items-baseline gap-x-2">
          <span className="text-5xl font-bold tracking-tight">
            <span className="line-through text-4xl text-gray-500">₹89</span>{" "}
            <span className="text-violet-100">₹49</span>
          </span>
        </p>

        <p className="text-gray-300 mt-6 text-base leading-7">
          All answers of every test
        </p>
        <ul
          role="list"
          className="text-gray-300 mt-4 space-y-3 text-sm leading-6 sm:mt-4"
        >
          <li className="flex gap-x-3">
            <Check className="text-violet-500" />
            Every Test answer
          </li>
          <li className="flex gap-x-3">
            <Check className="text-violet-500" />
            Search questions directly
          </li>
          <li className="flex gap-x-3">
            <Check className="text-violet-500" />
            Better than getting scammed
          </li>
          <li className="flex gap-x-3">
            <Check className="text-violet-500" />
            Free for any upcoming tests once registered
          </li>
        </ul>
        <a
          href="#"
          aria-describedby="tier-enterprise"
          className="bg-violet-500 text-white shadow-sm hover:bg-violet-400 focus-visible:outline-violet-500 mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
        >
          Get Access (Implementing Soon)
        </a>
      </div>
    </motion.div>
  );
}
