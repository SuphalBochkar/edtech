import React from "react";
import { motion, useAnimation } from "framer-motion";
import { Heart, Sparkles, Github } from "lucide-react";
import Link from "next/link";

const MadeBy = () => {
  const controls = useAnimation();

  const pulseHeart = async () => {
    await controls.start({
      scale: [1, 1.3, 1],
      transition: { duration: 0.3 },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative group flex flex-col items-center gap-3"
    >
      {/* Main content */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-violet-500/20 backdrop-blur-sm shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/20 via-violet-500/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Content */}
        <motion.span
          className="relative text-[10px] md:text-xs font-medium bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          Designed & Developed by
        </motion.span>

        <Link
          href="https://github.com/Finish66"
          target="_blank"
          rel="noopener noreferrer"
          className="group/link relative flex items-center gap-1"
        >
          <motion.span
            className="relative text-xs md:text-base font-bold bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent group-hover/link:from-violet-400 group-hover/link:to-violet-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Finish66
          </motion.span>
          <Github className="h-3 w-3 text-violet-400 opacity-0 group-hover/link:opacity-100 transform translate-x-[-5px] group-hover/link:translate-x-0 transition-all duration-300" />
        </Link>

        <motion.div
          whileHover={{ scale: 1.3 }}
          animate={controls}
          onClick={pulseHeart}
          className="relative flex items-center cursor-pointer"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="h-5 w-5 text-pink-500 fill-pink-500 hover:fill-pink-600 transition-colors duration-300" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="h-3 w-3 text-yellow-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Interactive elements */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 text-xs text-violet-400/80"
      >
        <Link
          href="https://github.com/Finish66"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-violet-300 transition-colors duration-200 group"
        >
          <Code2 className="h-3 w-3" />
          <span>View Source</span>
          <Star className="h-3 w-3 opacity-0 group-hover:opacity-100 transform translate-x-[-5px] group-hover:translate-x-0 transition-all duration-300" />
        </Link>

        <Link
          href="https://github.com/Finish66"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-violet-300 transition-colors duration-200 group"
        >
          <motion.span initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
            More Projects
          </motion.span>
          <motion.div
            className="transform origin-left"
            whileHover={{ scaleX: 1.3 }}
          >
            →
          </motion.div>
        </Link>
      </motion.div> */}
    </motion.div>
  );
};

export default MadeBy;
