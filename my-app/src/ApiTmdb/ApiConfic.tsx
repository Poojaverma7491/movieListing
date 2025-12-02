import { ApiConfiguration } from "../Utils/Interfaces";

const ApiConfig: ApiConfiguration = {
  baseUrl: process.env.REACT_APP_TMDB_BASE_URL || "",
  apiKey: process.env.REACT_APP_TMDB_API_KEY || "",
  originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default ApiConfig;