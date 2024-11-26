// /src/app/(pages)/page.tsx
import LevelComponent from "@/components/old-other/LevelComponent";
import ThemeSwitch from "@/components/Navbar/ThemeSwitch";

export default function Home() {
  return (
    <div className="min-h-screen">
      <h1 className="text-foreground dark:text-blue-500">Hello</h1>
      <ThemeSwitch />
      <LevelComponent />
    </div>
  );
}
