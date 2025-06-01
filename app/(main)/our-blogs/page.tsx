"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogCard } from "@/components/blogCard";
import { SearchBar } from "@/components/SearchBar";
import { useState, useEffect, useCallback } from "react";
import { usePostApi } from "@/lib/api/post.api";
import type { Post } from "@/lib/types/api.types";
import { SquareLibrary } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function OurBlog() {
  const [animationParent] = useAutoAnimate();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCommunity, setSelectedCommunity] = useState<
    string | undefined
  >(searchParams.get("community") || undefined);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [len, setLen] = useState<number>(0);
  const [blogs, setBlogs] = useState<Post[]>([]);
  const postApi = usePostApi();

  const fetchPosts = useCallback(async () => {
    try {
      const data = await postApi.getPosts({
        search: searchQuery || undefined,
        community: selectedCommunity,
      });
      setBlogs(data);
      setLen(data.length);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [searchQuery, selectedCommunity]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (value: string) => {
    if (value) {
      setSearchQuery(value);
      updateUrlParams(value, selectedCommunity);
    } else {
      setSearchQuery("");
      updateUrlParams("", selectedCommunity);
    }
  };

  const handleCommunityChange = (value: string | undefined) => {
    if (value === "all") {
      setSelectedCommunity(undefined);
      updateUrlParams(searchQuery, undefined);
    } else {
      setSelectedCommunity(value);
      updateUrlParams(searchQuery, value);
    }
  };

  const updateUrlParams = (search: string, community: string | undefined) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (community) params.set("community", community);
    router.push(`?${params.toString()}`);
  };

  if (!user) {
    router.back();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#BBC2C0]">
      <div
        ref={animationParent}
        className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm"
      >
        <SearchBar
          onSearch={handleSearch}
          onCommunityChange={handleCommunityChange}
          selectedCommunity={selectedCommunity}
          initialSearch={searchQuery}
          onCreate={() => fetchPosts()}
        />
        <div className="mx-auto max-w-[798px]">
          {blogs.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full mt-10">
              <SquareLibrary className="w-10 h-10 text-gray-600" />
              <p className="text-center font-semibold text-gray-600 text-lg">
                No posts yet.
              </p>
            </div>
          ) : (
            blogs.map((post, idx) => {
              const roundingClass =
                len === 1
                  ? "rounded-[12px]"
                  : idx === 0
                    ? "rounded-t-[12px]"
                    : idx === len - 1
                      ? "rounded-b-[12px]"
                      : "";
              return (
                <BlogCard
                  key={`blog-${post.title}`}
                  id={post.id}
                  userId={user?.id}
                  className={roundingClass}
                  username={post.user.username}
                  community={post.community}
                  title={post.title}
                  content={post.content}
                  comments={post.commentsCount}
                  isEdit
                  onEdit={fetchPosts}
                  onDelete={fetchPosts}
                />
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
