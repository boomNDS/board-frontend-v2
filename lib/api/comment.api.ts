import { useApi } from "../api";
import type { Comment, CreateCommentRequest } from "../types/api.types";

export const useCommentApi = () => {
  const api = useApi();

  return {
    create: (data: CreateCommentRequest) =>
      api.post<Comment>("/comments", data),
  };
};
