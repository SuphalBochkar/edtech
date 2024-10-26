import React from "react";
import TestPage from "./TestPage";
import LevelComponent from "@/ui/Aceternity/LevelComponent";

interface BackgroundLayerProps {
  gradientFrom: string;
  gradientTo: string;
  rotation?: number;
}

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  gradientFrom,
  gradientTo,
}) => {
  const random = (Math.floor(Math.random() * 100) + 1) % 360;

  return (
    <div
      aria-hidden="true"
      className="absolute left-32 inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden blur-3xl"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          transform: `rotate(${random}deg)`,
          backgroundImage: `linear-gradient(to top right, ${gradientFrom}, ${gradientTo})`,
          opacity: 0.4,
        }}
        className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr"
      />
    </div>
  );
};

const Page = () => {
  return (
    <div className="w-full h-full relative">
      <TestPage />
      {/* <LevelComponent /> */}
      {/* <BackgroundLayer gradientFrom="#ed4445" gradientTo="#7f1d1e" /> */}
      {/* <BackgroundLayer gradientFrom="violet-400" gradientTo="violet-900" /> */}
      {/* <BackgroundLayer gradientFrom="#8b3ef0" gradientTo="#9089fc" /> */}
      {/* <BackgroundLayer gradientFrom="#8b3ef0" gradientTo="#9089fc" /> */}
      <LevelComponent level={1} />
      <BackgroundLayer gradientFrom="violet-400" gradientTo="violet-900" />
      <BackgroundLayer gradientFrom="#8b3ef0" gradientTo="#9089fc" />
      <BackgroundLayer gradientFrom="#8b3ef0" gradientTo="#9089fc" />
    </div>
  );
};

export default Page;
