import { useState, useEffect } from "react";
import apiConfig from "../ApiTmdb/ApiConfig";

interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

const useFetchLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLanguages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${apiConfig.baseUrl}/configuration/languages?api_key=${apiConfig.apiKey}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch languages");
        const data = await res.json();
        setLanguages(data || []);
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
    return () => controller.abort();
  }, []);

  return { languages, loading, error };
};

export default useFetchLanguages;
