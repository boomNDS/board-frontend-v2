"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { communityOptions } from "@/lib/types/post.types";
import type { communityOptionsType } from "@/lib/types/post.types";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { timeAgo } from "@/lib/dayUtils";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CommentDialog } from "@/components/CommentDialog"

export const dynamic = 'force-dynamic';

interface BlogPost {
  title: string;
  username: string;
  community: communityOptionsType;
  avatar?: string;
  content: string;
  comments: {
    id: number;
    avatar?: string;
    username: string;
    content: string;
  }[];
  status: 'online' | 'offline';
  createdAt: Date;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const mockPosts: BlogPost[] = Array.from({ length: 5 }).map((_, i) => ({
    title: `Sample Blog Title ${i + 1}`,
    username: `User ${i + 1}`,
    community: communityOptions[i % communityOptions.length] as communityOptionsType,
    avatar: i % 2 === 0 ? `https://i.pravatar.cc/300?img=${i + 1}` : undefined,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    comments: Array.from({ length: Math.floor(Math.random() * 5) }).map((_, j) => ({
      id: j + 1,
      username: `Commenter ${j + 1}`,
      avatar: j % 2 === 0 ? `https://i.pravatar.cc/300?img=${j + 1}` : undefined,
      content: `This is a mock comment ${j + 1} for post ${i + 1}.`,
    })),
    status: i % 2 === 0 ? 'online' : 'offline',
    createdAt: dayjs().subtract(5, 'hour').toDate(),
  }));

  const postId = Number.parseInt(id, 10) - 1;
  if (postId >= 0 && postId < mockPosts.length) {
    return mockPosts[postId];
  }

  return null;
}

export default function BlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogId = Array.isArray(id) ? id[0] : id;
    if (!blogId) return;
    getBlogPost(blogId).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <main className="container mx-auto py-8 max-w-3xl mt-10">
      <article className="space-y-6">
        <header className="flex flex-col space-y-5">
          <Button variant="green-100" className="w-[40px] h-[40px] rounded-full" onClick={() => router.back()}><ArrowLeft className="text-[#243831] w-[14px] h-[14px]" /></Button>
          <div className="flex items-center space-x-3 mt-5">
            <div className="relative">
              <Avatar className="w-[48px] h-[48px]">
                {post.avatar ? (
                  <AvatarImage src={post.avatar} alt={post.username} />
                ) : (
                  <AvatarFallback>{post.username.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 block size-3 rounded-full ring-2 ring-white ${post.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                  }`}
              />
            </div>
            <p className="text-[14px] font-semibold">{post.username}</p>
            <p className="text-[#939494] text-[12px]">{timeAgo(post.createdAt)}</p>
          </div>
          <Badge variant="ghost" className="capitalize">{post.community}</Badge>
          <h1 className="text-[28px] font-bold">{post.title}</h1>
        </header>

        <div>
          <p>{post.content}</p>
          <div className="flex items-center mt-5">
            <MessageCircle className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {post.comments.length} Comments
            </span>
          </div>
          <CommentDialog />
        </div>
        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold">Comments</h2>
          {post.comments.length === 0 ? (
            <p className="text-gray-600">No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <Avatar className="w-[40px] h-[40px]">
                    {comment.avatar ? (
                      <AvatarImage src={comment.avatar} alt={comment.username} />
                    ) : (
                      <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>

                  <div className="mt-2">
                    <div className="flex a">
                      <p className="font-semibold text-sm">{comment.username}</p>
                      <p className="text-[#939494] text-[12px] ml-3">{timeAgo(post.createdAt)}</p>
                    </div>
                    <p className="text-gray-700 text-sm mt-4">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </main>
  );
}