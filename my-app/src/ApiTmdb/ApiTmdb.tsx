import { MediaItem, MovieItem, MovieTvListResponse, RequestParams, VideoResponse } from "../Utils/Interfaces";
import { Category, ListType } from "../Utils/utils";
import { FetchClient } from "./FetchClient";

const tmdbApi = {
  getMoviesList: (type: ListType, { params }: RequestParams): Promise<MovieTvListResponse<MovieItem>> => { 
    return FetchClient<MovieTvListResponse<MovieItem>>(`movie/${type}`, { params });
  },
  getTvList: (type: ListType, { params }: RequestParams): Promise<MovieTvListResponse<MovieItem>> => {
    const res = FetchClient<MovieTvListResponse<MovieItem>>(`tv/${type}`, { params });
    return res;
  },

  getVideos: (cate: Category, Genreid: string | number): Promise<VideoResponse> => {
    const res = FetchClient<VideoResponse>(`${cate}/${Genreid}/videos`);
    return res;
  },

  search: (cate: Category, { params }: RequestParams): Promise<MovieTvListResponse<MovieItem>> => {
    const res = FetchClient<MovieTvListResponse<MovieItem>>(`search/${cate}`, { params });
    return res;
  },

  detail: (cate: Category, Genreid: string | number, { params }: RequestParams): Promise<MediaItem> => {
    const res = FetchClient<MediaItem>(`${cate}/${Genreid}`, { params });
    return res;
  },

  similar: (cate: Category, Genreid: string | number): Promise<MovieTvListResponse<MovieItem>> => {
    const res = FetchClient<MovieTvListResponse<MovieItem>>(`${cate}/${Genreid}/similar`);
    return res;
  },

  discoverMovie: ({ params }: RequestParams): Promise<MovieTvListResponse<MovieItem>> => {
    const res = FetchClient<MovieTvListResponse<MovieItem>>("discover/movie", { params });
    return res;
  },

  discoverTv: ({ params }: RequestParams): Promise<MovieTvListResponse<MovieItem>> => {
    const res = FetchClient<MovieTvListResponse<MovieItem>>("discover/tv", { params });
    return res;
  }
}

export default tmdbApi;
