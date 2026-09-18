import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Photon",
    short_name: "Photon",
    description: "A platform for discovering and downloading photos.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/photon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/photon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
