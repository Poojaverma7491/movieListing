import { MediaItem } from "../Utils/Interfaces";
import { getAuth } from "firebase/auth";

// Check status of moviecard (Bookmarked / Not-bookmarked)
export async function checkBookmarkStatus(itemId: string): Promise<boolean> {
  try {
    const auth = getAuth();
    const token = await auth.currentUser?.getIdToken();

    if (!token) {
      console.warn("No Firebase ID token available");
      return false;
    }

    const res = await fetch("/api/bookmarks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch bookmarks: ${res.status}`);
    }

    const data = await res.json();
    return Boolean(data.data?.includes(Number(itemId)));
  } catch (err) {
    console.error("Failed to check bookmarks", err);
    return false;
  }
}

// Add or Remove bookmark
export const toggleBookmarkRequest = async ( itemId: number, bookmarked: boolean ): Promise<boolean> => {
  try {
    const endpoint = bookmarked ? "/api/bookmarks/remove" : "/api/bookmarks/add";

    const auth = getAuth();
    const token = await auth.currentUser?.getIdToken();

    if (!token) {
      throw new Error("No Firebase ID token available. User may not be logged in.");
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ movieId: itemId }),
    });

    if (!res.ok) {
      throw new Error(`Failed to toggle bookmark: ${res.status}`);
    }

    return !bookmarked;
  } catch (err) {
    console.error("Bookmark error:", err);
    return bookmarked; 
  }
};


//  Share movie/tv
export const handleShare = (item: MediaItem) => {
  const title = item.title || item.name || "Movie";
  const description = item.overview || "No description available.";
  const releaseDate = item.release_date || item.first_air_date || "Unknown release date";
  const shareText = `${title}\nRelease Date: ${releaseDate}\nDescription: ${description}`;
  navigator.clipboard.writeText(shareText);
  if (navigator.share) {
    navigator
      .share({
        title: item.title || item.name || "Movie",
        text: shareText,
      })
      .catch((err) => console.error("Share failed:", err));
  }
};