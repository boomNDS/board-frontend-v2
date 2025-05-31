"use client";
import { BlogCard } from "@/components/blogCard";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { communityOptions } from "@/lib/types/post.types";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { user } = useAuth();
  const [selectedCommunity, setSelectedCommunity] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  const mockData = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    username: `User ${i + 1}`,
    avatar: undefined,
    community:
      communityOptions[Math.floor(Math.random() * communityOptions.length)],
    title: `Sample Blog Title ${i + 1}`,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    comments: Math.floor(Math.random() * 20),
  }));
  const len = mockData.length;

  const handleSearch = (value: string) => {
    console.log(searchQuery)
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
          {mockData.map((post, idx) => {
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
                username={post.username}
                community={post.community}
                title={post.title}
                content={post.content}
                comments={post.comments}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
