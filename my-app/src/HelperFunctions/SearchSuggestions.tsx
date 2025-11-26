import tmdbApi from "../ApiTmdb/TmdbApi";
import { Suggestion } from "../Utils/Interfaces";
import { Category } from "../Utils/utils";

export const handleInputChange = async (
  value: string,
  setSearchQuery: (val: string) => void,
  setSuggestions: (val: Suggestion[]) => void
) => {
  setSearchQuery(value);

  if (value.trim()) {
    try {
      const [movieRes, tvRes] = await Promise.all([
        tmdbApi.search("movie", { params: { query: value } }),
        tmdbApi.search("tv", { params: { query: value } }),
      ]);
      const movieMapped: Suggestion[] = movieRes.results
        .filter(
          (item) =>
            !!item.poster_path &&
            !!item.title &&
            !!item.overview
        )
        .map((item) => ({
          id: item.id,
          category: "movie" as Category,
          title: item.title!, 
          thumbnail: `https://image.tmdb.org/t/p/w92${item.poster_path}`,
          description: item.overview!,
        }));

      const tvMapped: Suggestion[] = tvRes.results
        .filter(
          (item) =>
            !!item.poster_path &&
            !!item.name &&
            !!item.overview
        )
        .map((item) => ({
          id: item.id,
          category: "tv" as Category,
          title: item.name!, 
          thumbnail: `https://image.tmdb.org/t/p/w92${item.poster_path}`,
          description: item.overview!,
        }));
      setSuggestions([...movieMapped, ...tvMapped]);
    } catch (err) {
      console.error("Error fetching TMDB suggestions:", err);
      setSuggestions([]);
    }
  } else {
    setSuggestions([]);
  }
};
