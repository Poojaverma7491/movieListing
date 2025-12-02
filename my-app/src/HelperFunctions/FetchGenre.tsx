import { useState, useEffect } from "react";
import { Genre } from "../Utils/Interfaces";
import ApiConfig from "../ApiTmdb/ApiConfig";
import { Category } from "../Utils/utils";

const FetchGenres = (category: Category) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${ApiConfig.baseUrl}/genre/${category}/list?api_key=${ApiConfig.apiKey}&language=en-US`,
        );
        if (!res.ok) throw new Error("Failed to fetch genres");
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, [category]);

  return { genres, loading, error };
};
 
export default FetchGenres;