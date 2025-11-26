import tmdbApi from "../ApiTmdb/TmdbApi";
import { VideoResponse } from "../Utils/Interfaces";

async function FetchTrailerKey( category: "movie" | "tv", id: string | number ): Promise<string | null> {
  try {
    const videos: VideoResponse = await tmdbApi.getVideos(category, id);
    const trailer = videos.results.find((v) => v.type === "Trailer" || v.type === "Teaser" );
    return trailer ? trailer.key : null;
  } catch {
    return null;
  }
}
export default FetchTrailerKey
