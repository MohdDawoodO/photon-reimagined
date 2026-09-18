"use server";

import { createClient } from "pexels";

const client = createClient(process.env.PEXELS_API_KEY!);

export async function getPhotos(query?: string) {
  try {
    if (query) {
      const searchedPhotos = await client.photos.search({
        query,
        page: 2,
        per_page: 20,
      });

      return searchedPhotos;
    }
    const photos = await client.photos.curated({ page: 1, per_page: 20 });
    return photos;
  } catch (err) {
    console.log(err);
    return { error: "Could not fetch what you were looking for" };
  }
}

export async function showMorePhotos(page: number, query?: string) {
  try {
    if (query) {
      const searchedPhotos = await client.photos.search({
        query,
        page: page + 1,
        per_page: 20,
      });

      return searchedPhotos;
    }

    const photos = await client.photos.curated({
      page: page + 1,
      per_page: 20,
    });
    return photos;
  } catch (err) {
    console.log(err);
    return { error: "You have reached the end of the page" };
  }
}

export async function getDetailedPhoto(id: string) {
  try {
    const photo = client.photos.show({ id });
    return photo;
  } catch (err) {
    console.log(err);
    return { error: "Could not find the photo you were looking for" };
  }
}
