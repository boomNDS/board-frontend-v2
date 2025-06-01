import type { communityOptionsType } from "../types/post.types";

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  community: communityOptionsType;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  commentsCount: number;
  comments: Comment[];
}

export interface PostQueryParams {
  search?: string;
  community?: string;
  [key: string]: string | undefined;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  [key: string]: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  [key: string]: string | undefined;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface CreateCommentRequest {
  content: string;
  postId: number;
  [key: string]: string | number | undefined;
}

export interface UpdateCommentRequest {
  content: string;
  [key: string]: string | undefined;
}
