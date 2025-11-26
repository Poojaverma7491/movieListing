import queryString from "query-string";
import apiConfig from "./ApiConfig";

export async function FetchClient<T>(
  endpoint: string,
  options: {
    params?: Record<string, any>;
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<T> {
  const { params = {}, method = "GET", body, headers = {} } = options;
  const query = queryString.stringify({ ...params, api_key: apiConfig.apiKey });
  const url = `${apiConfig.baseUrl}/${endpoint}?${query}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw { response: { data: errorData, status: res.status } };
  }
  return res.json() as Promise<T>;
}
