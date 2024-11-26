import { Suspense } from "react";
import ColorBg from "@/components/Main/ColorBg";
import NavBar from "@/components/Navbar/NavBar";
import AuthContent from "@/components/Main/AuthContent";
import MainLoading from "@/components/Main/MainLoading";

export default function Home() {
  return (
    <main className="max-h-screen w-screen flex flex-col align-middle justify-center items-center content-center">
      <NavBar />
      <ColorBg />
      <Suspense fallback={<MainLoading />}>
        <AuthContent />
      </Suspense>
    </main>
  );
}
