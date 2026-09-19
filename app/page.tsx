import ImageGrid from "@/components/images/image-grid";
import { getPhotos } from "@/actions/get-photos";
import { Photos } from "@/lib/types";

export default async function Home() {
  const response: Photos = await getPhotos();

  const photos = response.photos.map((photo) => ({
    alt: photo.alt!,
    src: photo.src.large2x,
    id: photo.id,
  }));

  return (
    <div>
      <ImageGrid photos={photos} />
    </div>
  );
}
