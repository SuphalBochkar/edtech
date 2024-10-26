import React from "react";

import { Breadcrumbs } from "@nextui-org/react";
import { useState } from "react";
import { CustomBreadcrumbItem } from "@/ui/shad/breadcrumb";

export default function CustomBreadcrumb() {
  const [currentPage, setCurrentPage] = useState<React.Key>("song");

  return (
    <Breadcrumbs underline="active" onAction={(key) => setCurrentPage(key)}>
      <CustomBreadcrumbItem key="home" isCurrent={currentPage === "home"}>
        Home
      </CustomBreadcrumbItem>
      <CustomBreadcrumbItem key="music" isCurrent={currentPage === "music"}>
        Music
      </CustomBreadcrumbItem>
      <CustomBreadcrumbItem key="artist" isCurrent={currentPage === "artist"}>
        Artist
      </CustomBreadcrumbItem>
      <CustomBreadcrumbItem key="album" isCurrent={currentPage === "album"}>
        Album
      </CustomBreadcrumbItem>
      <CustomBreadcrumbItem key="song" isCurrent={currentPage === "song"}>
        Song
      </CustomBreadcrumbItem>
    </Breadcrumbs>
  );
}
