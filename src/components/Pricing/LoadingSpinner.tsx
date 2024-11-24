import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="bg-violet-500/10 backdrop-blur-lg border border-violet-500/20 rounded-2xl p-8 shadow-xl flex items-center justify-center flex-col">
        <Loader2 className="h-12 w-12 animate-spin text-violet-400 mb-4" />
        <p className="text-lg font-semibold text-violet-300">Loading...</p>
      </div>
    </div>
  );
}
