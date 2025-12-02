import { useState, useEffect } from "react";
import ApiConfig from "../ApiTmdb/ApiConfig";

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

    const fetchLanguages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${ApiConfig.baseUrl}/configuration/languages?api_key=${ApiConfig.apiKey}`,
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
  }, []);

  return { languages, loading, error };
};

export default useFetchLanguages;
