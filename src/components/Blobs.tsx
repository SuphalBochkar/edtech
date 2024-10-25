"use client";
import React, { useEffect, useState } from "react";
import blob1 from "@/assets/blob1.svg";
import blob2 from "@/assets/blob2.svg";
import blob3 from "@/assets/blob3.svg";
import blob4 from "@/assets/blob4.svg";
import blob5 from "@/assets/blob5.svg";
import blob6 from "@/assets/blob6.svg";
import blob7 from "@/assets/blob7.svg";
import Image from "next/image";

interface BlobPosition {
  left: number;
  top: number;
  src: string;
  dx: number;
  dy: number;
}

const blobs = [blob1, blob2, blob3, blob4, blob5, blob6, blob7];

const getRandomSpeed = () => (Math.random() - 0.5) * 0.5;

const Blobs: React.FC = () => {
  const [blobPositions, setBlobPositions] = useState<BlobPosition[]>([]);

  useEffect(() => {
    const initialPositions: BlobPosition[] = Array.from({ length: 5 }).map(
      () => ({
        left: Math.random() * 60,
        top: Math.random() * 40,
        src: blobs[Math.floor(Math.random() * blobs.length)],
        dx: getRandomSpeed(),
        dy: getRandomSpeed(),
      })
    );

    setBlobPositions(initialPositions);

    const updateBlobPositions = () => {
      setBlobPositions((prevPositions) =>
        prevPositions.map((blob) => {
          let newLeft = blob.left + blob.dx * 2;
          let newTop = blob.top + blob.dy * 2;

          if (newLeft < 0 || newLeft > 100) {
            blob.dx = -blob.dx;
            newLeft = Math.max(0, Math.min(newLeft, 100));
          }
          if (newTop < 0 || newTop > 100) {
            blob.dy = -blob.dy;
            newTop = Math.max(0, Math.min(newTop, 100));
          }

          return {
            ...blob,
            left: newLeft,
            top: newTop,
          };
        })
      );
    };

    const intervalId = setInterval(updateBlobPositions, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full min-h-full absolute left-0 right-0 overflow-hidden inset-0 z-0 pointer-events-none">
      {blobPositions.map((blob, index) => (
        <Image
          key={index}
          src={blob.src}
          alt={`Blob ${index + 1}`}
          className="absolute blur-3xl -z-10"
          height={500}
          width={500}
          style={{
            left: `${blob.left}%`,
            top: `${blob.top}%`,
            opacity: 0.3,
            transition: "left 0.1s linear, top 0.1s linear",
          }}
        />
      ))}
    </div>
  );
};

export default Blobs;
