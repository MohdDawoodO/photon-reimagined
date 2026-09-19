"use client";

import { DisplayPhotoType, ErrorType, Photos } from "@/lib/types";
import { useEffect, useState } from "react";
import ImageComponent from "@/components/images/image";
import Masonry from "react-masonry-css";
import { showMorePhotos } from "@/actions/get-photos";
import { LoaderIcon } from "lucide-react";

export default function ImageGrid({
  photos,
  searchPage,
  query,
}: {
  photos: DisplayPhotoType[];
  searchPage?: boolean;
  query?: string;
}) {
  const [images, setImages] = useState<DisplayPhotoType[]>([]);
  const [calling, setCalling] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const breakpointColumnsObj = {
    default: 3,
    767: 2,
    500: 1,
  };

  useEffect(() => {
    (async function () {
      setImages(photos);
    })();
  }, [photos]);

  useEffect(() => {
    async function showMore() {
      if (searchPage && query) {
        return;
      }

      const response: Photos & ErrorType = await showMorePhotos(page);

      if (!response.error) {
        const photosToDisplay = response.photos.map((photo) => ({
          src: photo.src.large2x,
          alt: photo.alt!,
          id: photo.id,
        }));
        setImages([...images, ...photosToDisplay]);
      } else {
        setError(response.error);
      }

      setPage(page + 1);
      setCalling(false);
    }

    async function scrollEvent() {
      if (
        scrollY + window.innerHeight >= document.body.scrollHeight - 50 &&
        !calling
      ) {
        setCalling(true);
        await showMore();
      }
    }

    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [calling, page, query, searchPage, images]);

  return (
    <div className="mx-auto max-w-7xl py-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
          <ImageComponent
            key={image.id}
            alt={image.alt!}
            src={image.src}
            id={image.id}
          />
        ))}
      </Masonry>

      <div className="flex min-h-20 w-full items-center justify-center pt-5">
        {!error ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <p className="text-destructive">{error}</p>
        )}
      </div>
    </div>
  );
}
