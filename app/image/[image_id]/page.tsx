import { getDetailedPhoto, getPhotos } from "@/actions/get-photos";
import { redirect } from "next/navigation";
import { ErrorType, Photo, Photos } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ImageGrid from "@/components/images/image-grid";

export default async function ImageSlugPage({
  params,
}: {
  params: Promise<{ image_id: number }>;
}) {
  const imageID = (await params).image_id;
  if (!imageID) redirect("/");

  const response: Photo & ErrorType = await getDetailedPhoto(imageID);

  if (response.error)
    return (
      <div className="text-destructive mx-auto max-w-7xl py-16 text-center">
        {response.error}
      </div>
    );

  const images: Photos & ErrorType = await getPhotos();
  const imagesToDisplay = images.photos.map((photo) => ({
    src: photo.src.large2x,
    alt: photo.alt!,
    id: photo.id,
  }));

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 py-8 sm:gap-8 md:py-16 lg:gap-12">
          <div className="flex w-full items-center justify-between">
            <Link
              href={response.photographer_url}
              target="_blank"
              className="font-bold underline-offset-2 hover:underline"
            >
              <h2>{response.photographer}</h2>
            </Link>
            <Link href={response.url} target="_blank">
              <Button>Download</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:text-center">
            <Image
              src={response.src.large2x}
              alt={response.alt!}
              width={1280}
              height={1280}
              className="pointer-events-none rounded-lg"
              style={{
                maxHeight: "100vh",
                width: "auto",
                aspectRatio: response.width + "/" + response.height,
              }}
            />
            <p className="text-muted-foreground text-xs font-bold sm:text-sm">
              {response.alt}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 py-16 md:py-24">
        <h2 className="text-xl font-bold">More Images:</h2>
        <ImageGrid photos={imagesToDisplay} className="pt-0" />
      </div>
    </>
  );
}
