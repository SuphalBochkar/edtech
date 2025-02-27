"use client";

import LevelComponent from "@/components/old-other/LevelComponent";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};

export default function Home() {
  return (
    <div>
      <LevelComponent level={1} />
      {/* <ThemeChanger /> */}
      <ThemeSwitch />
    </div>
  );
}
