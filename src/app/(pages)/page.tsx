// /src/app/(pages)/page.tsx

import ColorBg from "@/components/ColorBg";
import Content from "@/components/Content";
import NavBar from "@/components/NavBar";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Home() {
  //   const { data: session, status } = useSession();
  //   const router = useRouter();

  //   useEffect(() => {
  //     // if (status === "authenticated" && session?.user) router.push("/test");
  //   }, [status, session, router]);

  return (
    <main className="max-h-screen w-screen flex flex-col align-middle justify-center items-center content-center">
      <NavBar />
      <ColorBg />
      {/* <Content /> */}
    </main>
  );
}
