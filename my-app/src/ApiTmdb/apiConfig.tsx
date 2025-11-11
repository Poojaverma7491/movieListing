type ImagePathFunction = (imgPath: string) => string;

interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  originalImage: ImagePathFunction;
  w500Image: ImagePathFunction;
}

const apiConfig: ApiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "1d91cfbb8712be2f9b1e784b813b857a",
  originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;