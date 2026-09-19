export interface Params {
  [key: string]: string | number | undefined;
}

interface PaginationObject {
  url?: string;
  page: number;
  per_page: number;
  next_page: number;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  alt: string | null;
  avg_color: string | null;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  liked: boolean;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

export type Photos = PaginationObject & { photos: Photo[] };

export type PhotosWithTotalResults = Photos & { total_results: number };

export interface Collection {
  id: string;
  title: string;
  description: string | null;
  private: boolean;
  media_count: number;
  photos_count: number;
  videos_count: number;
}

export type DisplayPhotoType = { id: number; alt: string; src: string };

export type ErrorType = {
  error: string;
};
