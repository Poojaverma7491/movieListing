import ApiConfig from "../ApiTmdb/ApiConfic";
import tmdbApi from "../ApiTmdb/ApiTmdb";
import { MediaItem } from "../Utils/Interfaces";
import { Category, ListType } from "../Utils/utils";

export const FetchMovieList = async (
  category: Category,
  type: string,
  id?: string,
  genreId?: string,
  signal?: AbortSignal
): Promise<MediaItem[]> => {
  try {
    let response: any = null;

    if (genreId) {
      if (typeof (tmdbApi as any).discover === "function") {
        response = await (tmdbApi as any).discover(category, { params: { with_genres: genreId } });
      } else {
        const url = category === "movie"
          ? `${ApiConfig.baseUrl}/discover/movie`
          : `${ApiConfig.baseUrl}/discover/tv`;

        const res = await fetch(url + `?api_key=${ApiConfig.apiKey}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=1`, { signal });
        response = await res.json();
      }
      return response?.results || [];
    }

    if (type === "similar" && id) {
      response = await tmdbApi.similar(category as Category, id as string);
    } else {
      response =
        category === "movie"
          ? await tmdbApi.getMoviesList(type as ListType, { params: {} })
          : await tmdbApi.getTvList(type as ListType, { params: {} });
    }

    return response?.results || [];
  } catch (error: any) {
    if (error?.name !== "CanceledError" && error?.name !== "AbortError") {
      console.error("MovieList fetch error:", error);
    }
    return [];
  }
};