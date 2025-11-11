
import { MediaItem } from "../Interfaces/media";
import axiosClient from "../Utils/axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
} as const;

export type Category = keyof typeof category;

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
} as const;

export type MovieType = keyof typeof movieType;

export const tvType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
} as const;

export type TvType = keyof typeof tvType;

interface RequestParams {
  params?: Record<string, any>;
}

const tmdbApi = {
  getMoviesList: (type: MovieType, { params }: RequestParams) => {
    const url = `movie/${movieType[type]}`;
    return axiosClient.get(url, { params });
  },

  getTvList: (type: TvType, { params }: RequestParams) => {
    const url = `tv/${tvType[type]}`;
    return axiosClient.get(url, { params });
  },

  getVideos: (cate: Category, id: string | number) => {
    const url = `${category[cate]}/${id}/videos`;
    return axiosClient.get(url, { params: {} });
  },

  search: (cate: Category, { params }: RequestParams) => {
    const url = `search/${category[cate]}`;
    return axiosClient.get(url, { params });
  },

  detail: async (cate: Category, id: string | number, { params }: RequestParams): Promise<MediaItem> => {
    const url = `${category[cate]}/${id}`;
    const res = await axiosClient.get(url, { params });
    return res as unknown as MediaItem;
  },

  credits: (cate: Category, id: string | number) => {
    const url = `${category[cate]}/${id}/credits`;
    return axiosClient.get(url, { params: {} });
  },

  similar: (cate: Category, id: string | number) => {
    const url = `${category[cate]}/${id}/similar`;
    return axiosClient.get(url, { params: {} });
  },

  discoverMovie: ({ params }: RequestParams) =>{
    return axiosClient.get("discover/movie", { params });
  },

  discoverTv: ({ params }: RequestParams) =>{
    return axiosClient.get("discover/tv", { params });
  }
};

export default tmdbApi;
