"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ImagePopup({
  url,
  src,
  alt,
  width,
  height,
  photographer,
  photographer_url,
}: {
  url: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  photographer_url: string;
  photographer: string;
}) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-200 flex h-full w-full items-center justify-center bg-black/90 px-4 py-8"
      onClick={() => {
        router.back();
      }}
    >
      <Card
        className="mx-auto flex max-h-19/20 max-w-7xl scrollbar-none flex-col items-center gap-4 overflow-y-scroll sm:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex w-full items-center justify-between">
          <Link
            href={photographer_url}
            target="_blank"
            className="font-bold underline-offset-2 hover:underline"
          >
            <h2>{photographer}</h2>
          </Link>
          <Link href={url} target="_blank">
            <Button>Download</Button>
          </Link>
        </CardHeader>
        <CardContent className="flex scrollbar-none flex-col items-center justify-center gap-4 md:text-center">
          <p className="text-muted-foreground text-xs font-bold sm:text-sm">
            {alt}
          </p>
          <Image
            src={src}
            alt={alt}
            width={480}
            height={480}
            className="pointer-events-none h-auto w-full rounded-lg"
            style={{
              aspectRatio: width / height,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
