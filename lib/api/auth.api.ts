import { useApi } from "../api";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/api.types";

export const useAuthApi = () => {
  const api = useApi();

  return {
    login: (data: LoginRequest) => api.post<AuthResponse>("/auth/login", data),

    register: (data: RegisterRequest) => api.post<AuthResponse>("/users", data),

    getCurrentUser: () => api.get<AuthResponse>("/auth/me"),
  };
};
