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
    return { error: "Something went wrong." };
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
    return { error: "You have reached the end of the page." };
  }
}

export async function searchPhotos(query: string) {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?page=1&per_page=20&query=${query}`,
      {
        headers: {
          Authorization: apiKey,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return { error: "We could not find what you were looking for." };
  }
}

export async function showMoreSearchedPhotos(page: number, query: string) {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?page=${page + 1}&per_page=20&query=${query}`,
      {
        headers: {
          Authorization: apiKey,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return { error: "You have reached the end of the page." };
  }
}

export async function getDetailedPhoto(id: number) {
  try {
    const response = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return { error: "We could not find the photo you were looking for." };
  }
}
