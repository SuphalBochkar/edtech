import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const MessageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3"
  >
    <div className="relative">
      <AlertCircle className="w-5 h-5 text-violet-400" />
    </div>
    <div className="text-sm font-medium text-violet-200">{children}</div>
  </motion.div>
);

export const CustomMessageC1 = () => {
  return (
    <MessageWrapper>
      <div className="text-sm md:text-base text-foreground flex flex-col gap-2 rounded-lg backdrop-blur-md">
        <div>
          <span className="underline font-bold text-gray-400">
            Level 2 & Level 3
          </span>{" "}
          have been updated! Check them out.
        </div>
        {/* <div>
          Stay updated! Join our{" "}
          <a
            href="https://t.me/+sYgr_ndeZQIzZTll"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#994bff] font-medium underline hover:text-[#6b28a5] transition-colors"
          >
            Telegram channel
          </a>{" "}
          for the latest announcements and updates.
        </div> */}
      </div>
    </MessageWrapper>
  );
};

export const CustomMessageC2 = () => {
  return (
    <MessageWrapper>
      <div className="text-sm md:text-base text-foreground flex flex-col gap-2 rounded-lg backdrop-blur-md">
        <div>
          <span className="underline font-bold text-gray-400">
            All courses Level 1 & Level 2
          </span>{" "}
          have been updated! Check them out.
        </div>
        {/* <div>
          Stay updated! Join our{" "}
          <a
            href="https://t.me/+sYgr_ndeZQIzZTll"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#994bff] font-medium underline hover:text-[#6b28a5] transition-colors"
          >
            Telegram channel
          </a>{" "}
          for the latest announcements and updates.
          </div> */}
      </div>
    </MessageWrapper>
  );
};
