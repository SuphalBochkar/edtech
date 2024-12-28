import { motion } from "framer-motion";
import { Upload, Trash2, QrCode } from "lucide-react";
import Image from "next/image";
import QRImage from "@/assets/qr-code.png";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

interface PaymentSectionProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  totalAmount: number;
  error: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  selectedCoursesCount: number;
}

export const PaymentSection = ({
  imageUrl,
  setImageUrl,
  totalAmount,
  error,
  isSubmitting,
  onSubmit,
  selectedCoursesCount,
}: PaymentSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      {/* QR Code Section */}
      <motion.div className="rounded-lg border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-violet-400" />
            <h3 className="text-violet-200 text-sm font-medium">
              Payment QR Code
            </h3>
          </div>
        </div>
        <div className="space-y-6">
          <div className="relative aspect-square max-w-[200px] mx-auto">
            <Image
              src={QRImage}
              alt="Payment QR Code"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-violet-500/10">
              <span className="text-violet-300 text-sm">Total Amount</span>
              <span className="text-violet-200 font-bold">₹{totalAmount}</span>
            </div>
            <p className="text-center text-xs text-violet-300/70">
              Scan QR code to complete payment
            </p>
          </div>
        </div>
      </motion.div>

      {/* Upload Section */}
      <motion.div className="rounded-lg border border-violet-500/20 bg-black/50 backdrop-blur-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-4 h-4 text-violet-400" />
          <h3 className="text-violet-200 text-sm font-medium">
            Upload Payment Screenshot
          </h3>
        </div>
        <div className="space-y-4">
          {imageUrl ? (
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt="Payment proof"
                className="w-full rounded-lg"
                style={{ maxHeight: "60vh", objectFit: "contain" }}
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/90 text-white hover:bg-red-600"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <CldUploadWidget
              uploadPreset={
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default"
              }
              onSuccess={(result: CloudinaryUploadWidgetResults) => {
                if (
                  result?.info &&
                  typeof result.info !== "string" &&
                  result.info.secure_url
                ) {
                  setImageUrl(result.info.secure_url);
                }
              }}
            >
              {({ open }: { open: () => void }) => {
                return (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => open && open()}
                    className="w-full py-8 rounded-lg border-2 border-dashed border-violet-500/30 hover:border-violet-500/50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                    <p className="text-xs text-violet-300">
                      Click to upload screenshot
                    </p>
                  </motion.button>
                );
              }}
            </CldUploadWidget>
          )}
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-red-400 text-xs"
        >
          {error}
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        disabled={isSubmitting || selectedCoursesCount === 0 || !imageUrl}
        className="w-full py-3 rounded-lg bg-violet-500 hover:bg-violet-600 disabled:bg-violet-500/50 text-white text-sm font-medium transition-all duration-300"
      >
        {isSubmitting ? "Processing..." : "Complete Registration"}
      </motion.button>
    </motion.div>
  );
};
