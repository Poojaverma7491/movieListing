import tmdbApi from "../ApiTmdb/ApiTmdb";
import { MovieItem, MovieTvListResponse } from "../Utils/Interfaces";
import { Category, ListType } from "../Utils/utils";

// For Getting dynamic heading
export const isListType = (val: string | undefined): val is ListType =>
  ["popular", "top_rated", "upcoming"].includes(val || "");

export const GetHeading = ( incomingType: string | undefined, category: Category, keyword?: string, genreId?: string ): string => {
  if (keyword) return `Search: ${decodeURIComponent(keyword)}`;
  if (genreId) return `Genre: ${genreId}`;
  const isMovie = category === "movie";
  const isTV = category === "tv";
  if (incomingType === "popular") {
    return isMovie ? "Popular Movies" : isTV ? "Popular TV Shows" : "Popular";
  }
  if (incomingType === "top_rated") {
    return isMovie ? "Top Rated Movies" : isTV ? "Top Rated TV Shows" : "Top Rated";
  }
  if (incomingType === "upcoming") {
    return isMovie ? "Upcoming Movies" : isTV ? "Upcoming TV Shows" : "Upcoming";
  }
  return isMovie ? "Movies" : isTV ? "TV Shows" : "Browse";
};

// For Fetching movies and TV shows based on filter, sort and search

export const FetchMediaList = async (
  category: Category,
  incomingType: string | undefined,
  filters: Record<string, any>,
  sortBy: string,
  genreId: string | undefined,
  keyword: string | undefined,
  page: number
) => {
  const params: Record<string, any> = {
    ...filters,
    page,
    ...(genreId && { with_genres: genreId }),
  };
  if (sortBy === "latest") params.sort_by = "release_date.desc";
  if (sortBy === "rating") params.sort_by = "vote_average.desc";

  const defaultType: ListType = "popular";
  const finalType: ListType = [ "popular", "top_rated", "upcoming", ].includes(incomingType || "")
    ? (incomingType as ListType)
    : defaultType;

  let response: MovieTvListResponse<MovieItem> | null = null;
  if (keyword?.trim()) {
    response = await tmdbApi.search(category, {
      params: { query: keyword, page },
    });
  } else if (Object.keys(filters).length > 0 || sortBy || genreId) {
    response =
      category === "movie"
        ? await tmdbApi.discoverMovie({ params })
        : await tmdbApi.discoverTv({ params });
  } else {
    response =
      category === "movie"
        ? await tmdbApi.getMoviesList(finalType, { params })
        : await tmdbApi.getTvList(finalType, { params });
  }

  return response;
};
