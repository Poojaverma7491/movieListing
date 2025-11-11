import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import queryString from "query-string";
import apiConfig from "../ApiTmdb/apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params: Record<string, any>): string =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

// Request interceptor with correct type
axiosClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    return config;
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse): any => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: any): Promise<never> => {
    return Promise.reject(error);
  }
);

export default axiosClient;
