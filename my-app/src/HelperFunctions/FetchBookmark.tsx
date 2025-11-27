import { getAuth } from "firebase/auth";
import SummaryApi from "../ApiBackend/SummaryAPI";
import tmdbApi from "../ApiTmdb/ApiTmdb";
import { BookmarkResponse, MediaItem } from "../Utils/Interfaces";
import { Category } from "../Utils/utils";

// For fetching bookmarks
const FetchBookmarks = async (category: Category): Promise<MediaItem[]> => {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();
  try {
    const res = await fetch(SummaryApi.bookmarks.url, {
      method: SummaryApi.bookmarks.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch bookmarks: ${res.status}`);
    }

    const data: BookmarkResponse = await res.json();

    if (!data.success || !Array.isArray(data.data)) {
      return [];
    }

    const ids: number[] = data.data.map((id) => Number(id));

    const mediaPromises = ids.map(async (id: number) => {
      try {
        return await tmdbApi.detail(category, id, { params: {} });
      } catch {
        return null;
      }
    });

    const responses = await Promise.all(mediaPromises);
    return responses.filter((item): item is MediaItem => !!item && !!item.id);
  } catch (err) {
    console.error("Bookmark fetch error:", err);
    return [];
  }
};

export default FetchBookmarks;