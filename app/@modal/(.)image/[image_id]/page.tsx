import { getDetailedPhoto } from "@/actions/get-photos";
import { redirect } from "next/navigation";
import { ErrorType, Photo } from "@/lib/types";
import ImagePopup from "@/app/@modal/(.)image/[image_id]/image-popup";

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

  return (
    <ImagePopup
      alt={response.alt!}
      src={response.src.large2x}
      width={response.width}
      height={response.height}
      photographer={response.photographer}
      url={response.url}
      photographer_url={response.photographer_url}
    />
  );
}
