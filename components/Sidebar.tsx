"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Edit } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <div className={cn("fixed top-10 w-64 h-screen", className)}>
      <div className="flex flex-col space-y-4 mt-12 mx-5">
        <Link href="/">
          <Button
            variant="ghost"
            className={`w-full justify-start text-[#243831] hover:text-white hover:bg-[#2d4539] ${
              pathname === "/" ? "font-bold" : ""
            }`}
          >
            <Home className="size-4 mr-2" />
            <span>Home</span>
          </Button>
        </Link>

        {user && (
          <Link href="/our-blogs">
            <Button
              variant="ghost"
              className={`w-full justify-start text-[#243831] hover:text-white hover:bg-[#2d4539] ${
                pathname === "/our-blogs" ? "font-bold" : ""
              }`}
            >
              <Edit className="size-4 mr-2" />
              <span>Our Blog</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
