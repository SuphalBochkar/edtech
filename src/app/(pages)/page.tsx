// /src/app/(pages)/page.tsx

import ColorBg from "@/components/ColorBg";
import Content from "@/components/Content";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="max-h-screen w-screen flex flex-col align-middle justify-center items-center content-center">
      <NavBar />
      <ColorBg />
      <Content />
    </main>
  );
}
