import { useApi } from "../api";
import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../types/api.types";

export const useCommentApi = () => {
  const api = useApi();

  return {
    getComments: (postId: number) =>
      api.get<Comment[]>(`/posts/${postId}/comments`),

    getComment: (id: number) => api.get<Comment>(`/comments/${id}`),

    createComment: (data: CreateCommentRequest) =>
      api.post<Comment>("/comments", data),

    updateComment: (id: number, data: UpdateCommentRequest) =>
      api.put<Comment>(`/comments/${id}`, data),

    deleteComment: (id: number) => api.delete<void>(`/comments/${id}`),
  };
};
