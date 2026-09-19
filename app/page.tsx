import ImageGrid from "@/components/images/image-grid";
import { getPhotos } from "@/actions/get-photos";
import { ErrorType, Photos } from "@/lib/types";

export default async function Home() {
  const response: Photos & ErrorType = await getPhotos();

  if (response.error) {
    return <ImageGrid error={response.error} />;
  }

  const photos = response.photos.map((photo) => ({
    alt: photo.alt!,
    src: photo.src.large2x,
    id: photo.id,
  }));

  return (
    <div>
      <ImageGrid
        photos={photos}
        error={
          !photos.length ? "We could not find what you were looking for" : null
        }
      />
    </div>
  );
}
