import { useApi } from "../api";
import type {
  CreatePostRequest,
  Post,
  UpdatePostRequest,
  PostQueryParams,
} from "../types/api.types";

export const usePostApi = () => {
  const api = useApi();

  return {
    getPosts: (params?: PostQueryParams) => api.get<Post[]>("/posts", params),
    getPost: (id: number) => api.get<Post>(`/posts/${id}`),
    createPost: (data: CreatePostRequest) => api.post<Post>("/posts", data),
    updatePost: (id: number, data: UpdatePostRequest) =>
      api.put<Post>(`/posts/${id}`, data),
    deletePost: (id: number) => api.delete<void>(`/posts/${id}`),
    getMyPosts: (params?: PostQueryParams) =>
      api.get<Post[]>("/posts/me", params),
  };
};
