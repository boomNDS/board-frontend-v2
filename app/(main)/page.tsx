"use client";
import { BlogCard } from "@/components/blogCard";
import { SearchBar } from "@/components/SearchBar";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { usePostApi } from "@/lib/api/post.api";
import type { Post } from "@/lib/types/api.types";

export default function Home() {
  const { user } = useAuth();
  const [selectedCommunity, setSelectedCommunity] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");
  const [len, setLen] = useState<number>(0);
  const [blogs, setBlogs] = useState<Post[]>([]);
  const postApi = usePostApi();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postApi.getPosts({
          search: searchQuery,
          community: selectedCommunity,
        });
        setBlogs(data);
        setLen(data.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [searchQuery, selectedCommunity, postApi.getPosts]);

  const handleSearch = (value: string) => {
    console.log(searchQuery);
    setSearchQuery(value);
  };

  const handleCommunityChange = (value: string) => {
    setSelectedCommunity(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#BBC2C0]">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <SearchBar
          onSearch={handleSearch}
          onCommunityChange={handleCommunityChange}
          selectedCommunity={selectedCommunity}
        />
        <div className="mx-auto max-w-[798px]">
          {blogs.map((post, idx) => {
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
                id={post.id}
                userId={user?.id || 1}
                key={`blog-${post.title}`}
                className={roundingClass}
                username={post.user.username}
                community={post.community}
                title={post.title}
                content={post.content}
                comments={post.commentsCount}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
