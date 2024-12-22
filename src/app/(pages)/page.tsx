import ColorBg from "@/components/Main/ColorBg";
import NavBar from "@/components/Navbar/NavBar";
import Content from "@/components/Main/Content";

export default function Home() {
  return (
    <main className="max-h-screen w-screen flex flex-col align-middle justify-center items-center content-center">
      <NavBar />
      <ColorBg />
      <Content />
    </main>
  );
}
