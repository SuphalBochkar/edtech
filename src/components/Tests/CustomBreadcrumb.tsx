"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// export default function CustomBreadcrumb() {
//   const [currentPage, setCurrentPage] = useState<React.Key>("song");

//   return (
//     <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)}>
//       <CustomBreadcrumbItem key="home" isCurrent={currentPage === "home"}>
//         Home
//       </CustomBreadcrumbItem>
//       <CustomBreadcrumbItem key="music" isCurrent={currentPage === "music"}>
//         Music
//       </CustomBreadcrumbItem>
//       <CustomBreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
//         Artist
//       </CustomBreadcrumbItem>
//       <CustomBreadcrumbItem key="album" isCurrent={currentPage === "album"}>
//         Album
//       </CustomBreadcrumbItem>
//       <CustomBreadcrumbItem key="song" isCurrent={currentPage === "song"}>
//         Song
//       </CustomBreadcrumbItem>
//     </Breadcrumbs>
//   );
// }

export default function CustomBreadcrumb({
  size = "sm",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const pathname = usePathname();

  const pathArray = pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path) => path.charAt(0).toUpperCase() + path.slice(1));

  const renderPath = (path: string) => {
    if (path === "Test") return "Home";
    if (path === "Practice") return "AE Practice";
    return path;
  };

  const getPath = (index: number) => {
    if (pathArray[index] === "Practice" || pathArray[index] === "Level")
      return "/test";

    if (pathArray[index] === "Aptitude" || pathArray[index] === "Programming")
      return `/test/level/${pathArray[2]}`;

    return `/${pathArray
      .slice(0, index + 1)
      .join("/")
      .toLowerCase()}`;
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-base md:${sizeClasses[size]} font-semibold`}
    >
      <ol className="flex items-center space-x-2">
        {pathArray.map((path, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={getPath(index)}
                className={`text-foreground hover:text-primary transition-colors duration-200 ${
                  index === pathArray.length - 1 ? "text-primary" : ""
                }`}
              >
                {renderPath(path)}
              </Link>
            </motion.div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
