"use server";

import axios from "axios";

const apiKey = process.env.PEXELS_API_KEY!;

export async function getPhotos() {
  try {
    const response = await axios.get(
      "https://api.pexels.com/v1/curated?page=1&per_page=20",
      {
        headers: {
          Authorization: apiKey,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}

export async function showMorePhotos(page: number) {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=20`,
      {
        headers: {
          Authorization: apiKey,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: "You have reached the end of the page" };
  }
}
//
// export async function searchPhotos(query: string) {
//   try {
//     const searchedPhotos: PhotosWithTotalResults | ErrorResponse =
//       await client.photos.search({
//         query,
//         page: 2,
//         per_page: 20,
//       });
//
//     return searchedPhotos;
//   } catch (err) {
//     return { error: "Could not find what you were looking for" };
//   }
// }
//
// export async function showMoreSearchedPhotos(page: number, query: string) {
//   try {
//     const searchedPhotos: PhotosWithTotalResults | ErrorResponse =
//       await client.photos.search({
//         query,
//         page: page + 1,
//         per_page: 20,
//       });
//
//     return searchedPhotos;
//   } catch (err) {
//     return { error: "You have reached the end of the page" };
//   }
// }
//
// export async function getDetailedPhoto(id: string) {
//   try {
//     const photo = client.photos.show({ id });
//     return photo;
//   } catch (err) {
//     console.log(err);
//     return { error: "Could not find the photo you were looking for" };
//   }
// }
