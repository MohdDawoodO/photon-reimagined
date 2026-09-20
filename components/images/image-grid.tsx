"use client";

import { DisplayPhotoType, ErrorType, Photos } from "@/lib/types";
import { useEffect, useLayoutEffect, useState } from "react";
import ImageComponent from "@/components/images/image";
import Masonry from "react-masonry-css";
import { showMorePhotos, showMoreSearchedPhotos } from "@/actions/get-photos";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageGrid({
  photos,
  searchPage,
  query,
  error,
  className,
}: {
  photos?: DisplayPhotoType[];
  searchPage?: boolean;
  query?: string;
  error?: string | null;
  className?: string;
}) {
  const [images, setImages] = useState<DisplayPhotoType[]>([]);
  const [calling, setCalling] = useState(false);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const breakpointColumnsObj = {
    default: 3,
    767: 2,
    500: 1,
  };

  useEffect(() => {
    (async function () {
      if (photos) setImages(photos);
      if (error) setErrorMessage(error);
    })();
  }, [photos, error]);

  useLayoutEffect(() => {
    function setImagesState(response: Photos & ErrorType) {
      if (!response.error) {
        const photosToDisplay = response.photos.map((photo) => ({
          src: photo.src.large2x,
          alt: photo.alt!,
          id: photo.id,
        }));
        setImages([...images, ...photosToDisplay]);
      } else {
        setErrorMessage(response.error);
      }

      setPage(page + 1);
      setCalling(false);
    }

    async function showMore() {
      if (searchPage && query) {
        const response: Photos & ErrorType = await showMoreSearchedPhotos(
          page,
          query,
        );
        setImagesState(response);

        return;
      }

      const response: Photos & ErrorType = await showMorePhotos(page);
      setImagesState(response);
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
    <div className={cn("mx-auto max-w-7xl py-8", className)}>
      {images && (
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
      )}
      <div className="flex min-h-20 w-full items-center justify-center pt-5">
        {!errorMessage ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <p className="text-destructive">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
