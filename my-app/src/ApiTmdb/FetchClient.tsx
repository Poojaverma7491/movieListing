import queryString from "query-string";
import ApiConfig from "./ApiConfig";

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
  const query = queryString.stringify({ ...params, api_key: ApiConfig.apiKey });
  const url = `${ApiConfig.baseUrl}/${endpoint}?${query}`;

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
    const error = new Error("Request failed");
    (error as any).response = { data: errorData, status: res.status };
    throw error;
  }
  return res.json() as Promise<T>;
}
