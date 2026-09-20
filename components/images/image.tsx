import Link from "next/link";
import Image from "next/image";

export default function ImageComponent({
  alt,
  src,
  id,
}: {
  alt: string;
  src: string;
  id: number;
}) {
  return (
    <Link href={`/image/${id}`} scroll={false}>
      <Image
        src={src}
        alt={alt}
        className="rounded-lg duration-300 hover:scale-102 hover:grayscale-0 md:grayscale-50"
        width={1500}
        height={1500}
      />
    </Link>
  );
}
