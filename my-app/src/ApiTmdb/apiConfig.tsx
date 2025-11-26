import { ApiConfig } from "../Utils/Interfaces";

const apiConfig: ApiConfig = {
  baseUrl: process.env.REACT_APP_TMDB_BASE_URL || "",
  apiKey: process.env.REACT_APP_TMDB_API_KEY || "",
  originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;