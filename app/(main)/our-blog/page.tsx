"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { useRouter } from 'next/navigation'


export default function OurBlog() {
  const { user } = useAuth();
  const router = useRouter()


  if (!user) {
    router.back()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#BBC2C0]">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="max-w-4xl mx-auto">
          Our Blog
        </div>
      </div>
    </main>
  );
} 