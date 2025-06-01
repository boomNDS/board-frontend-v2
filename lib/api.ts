import { $fetch } from "ohmyfetch";
import { handleUnauthorized } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export const api = $fetch.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleRequest = async <T>(request: Promise<T>): Promise<T> => {
    try {
      return await request;
    } catch (error: unknown) {
      return handleUnauthorized(error as Error & { status?: number });
    }
  };

  return {
    get: <T>(
      url: string,
      params?: Record<string, string | number | boolean | undefined>,
    ) =>
      handleRequest(
        api<T>(url, {
          headers: getAuthHeader() as Record<string, string>,
          params,
        }),
      ),
    post: <T>(url: string, data: Record<string, unknown>) =>
      handleRequest(
        api<T>(url, {
          method: "POST",
          body: data,
          headers: getAuthHeader() as Record<string, string>,
        }),
      ),
    put: <T>(url: string, data: Record<string, unknown>) =>
      handleRequest(
        api<T>(url, {
          method: "PUT",
          body: data,
          headers: getAuthHeader() as Record<string, string>,
        }),
      ),
    patch: <T>(url: string, data: Record<string, unknown>) =>
      handleRequest(
        api<T>(url, {
          method: "PATCH",
          body: data,
          headers: getAuthHeader() as Record<string, string>,
        }),
      ),
    delete: <T>(url: string) =>
      handleRequest(
        api<T>(url, {
          method: "DELETE",
          headers: getAuthHeader() as Record<string, string>,
        }),
      ),
  };
};
