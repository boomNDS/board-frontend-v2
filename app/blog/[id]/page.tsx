"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { communityOptionsType } from "@/lib/types/post.types";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { timeAgo } from "@/lib/dayUtils";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CommentDialog } from "@/components/CommentDialog";
import { usePostApi } from "@/lib/api/post.api";
import type { Comment, User } from "@/lib/types/api.types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const dynamic = "force-dynamic";

interface BlogPost {
  id: number;
  title: string;
  user: User;
  community: communityOptionsType;
  content: string;
  comments: Comment[];
  status: "online" | "offline";
  createdAt: Date;
}

export default function BlogPage() {
  const [animationParent] = useAutoAnimate();
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const postApi = usePostApi();

  const fetchPost = async () => {
    const blogId = Array.isArray(id) ? id[0] : id;
    if (!blogId) return;

    try {
      const res = await postApi.getPost(+blogId);
      if (res) {
        setPost({
          ...res,
          status: "online",
        });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
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
          <Button
            variant="green-100"
            className="w-[40px] h-[40px] rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="text-[#243831] w-[14px] h-[14px]" />
          </Button>
          <div className="flex items-center space-x-3 mt-5">
            <div className="relative">
              <Avatar className="w-[48px] h-[48px]">
                <AvatarImage
                  src="https://i.pravatar.cc/300"
                  alt={post.user.username}
                />
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 block size-3 rounded-full ring-2 ring-white ${
                  post.status === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
            <p className="text-[14px] font-semibold">{post.user.username}</p>
            <p className="text-[#939494] text-[12px]">
              {timeAgo(post.createdAt)}
            </p>
          </div>
          <Badge variant="ghost" className="capitalize">
            {post.community}
          </Badge>
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
          <CommentDialog postId={post.id} onCreate={fetchPost} />
        </div>
        <section ref={animationParent} className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold">Comments</h2>
          {post.comments.length === 0 ? (
            <p className="text-gray-600">No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage
                      src="https://i.pravatar.cc/300"
                      alt={comment.user.username}
                    />
                  </Avatar>

                  <div className="mt-2">
                    <div className="flex a">
                      <p className="font-semibold text-sm">
                        {comment.user.username}
                      </p>
                      <p className="text-[#939494] text-[12px] ml-3">
                        {timeAgo(post.createdAt)}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm mt-4">
                      {comment.content}
                    </p>
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
