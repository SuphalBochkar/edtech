"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 via-violet-950 to-black p-4">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3B1F71,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#4B2A99,transparent)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_300px,#2A1F66,transparent)] opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md relative"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="absolute -top-12 left-0 text-violet-400 hover:text-violet-300 transition-colors duration-200 flex items-center gap-1 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        {/* Main Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-black/20 rounded-2xl border border-violet-500/20 overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-violet-200 to-violet-400 bg-clip-text text-transparent mb-6">
              Welcome Back
            </h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl flex items-center text-red-300"
              >
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-violet-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-violet-500/10 border border-violet-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-violet-100 placeholder-violet-400/50"
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                  <Mail
                    className="absolute right-3 top-3 text-violet-400"
                    size={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-violet-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-violet-500/10 border border-violet-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-violet-100 placeholder-violet-400/50"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <Lock
                    className="absolute right-3 top-3 text-violet-400"
                    size={20}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 font-medium py-3 rounded-xl transition duration-300 ease-in-out focus:outline-none border border-violet-500/30 hover:border-violet-500/50 flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;
