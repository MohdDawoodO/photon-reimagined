import { redirect } from "next/navigation";
import ImageGrid from "@/components/images/image-grid";
import { ErrorType, Photos } from "@/lib/types";
import { searchPhotos } from "@/actions/get-photos";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const params = await searchParams;
  const query = params.q;

  if (!query) redirect("/");

  const response: Photos & ErrorType = await searchPhotos(query);

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
      <ImageGrid photos={photos} searchPage query={query} />
    </div>
  );
}
