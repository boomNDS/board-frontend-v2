import { useApi } from "../api";
import type {
  CreatePostRequest,
  Post,
  UpdatePostRequest,
} from "../types/api.types";

export const usePostApi = () => {
  const api = useApi();

  return {
    getPosts: () => api.get<Post[]>("/posts"),

    getPost: (id: number) => api.get<Post>(`/posts/${id}`),

    createPost: (data: CreatePostRequest) => api.post<Post>("/posts", data),

    updatePost: (id: number, data: UpdatePostRequest) =>
      api.put<Post>(`/posts/${id}`, data),

    deletePost: (id: number) => api.delete<void>(`/posts/${id}`),
  };
};
