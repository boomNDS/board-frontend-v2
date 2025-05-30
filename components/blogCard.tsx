import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditPost } from "@/components/EditPost";
import { ConfirmDialog } from "@/components/ConfirmDigalog";
import { set } from "react-hook-form";

interface BlogCardProps {
  className?: string;
  userId: number;
  username: string;
  community: string;
  title: string;
  content: string;
  comments: number;
  isEdit?: boolean;
}

export function BlogCard({
  className,
  userId,
  username,
  community,
  title,
  content,
  comments,
  isEdit = false,
}: BlogCardProps) {
  const [displayText, setDisplayText] = useState(content);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleDelete = () => {
    setIsConfirmDialogOpen(false);
    console.log("Delete post");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateTruncate = () => {
      const limit = mediaQuery.matches ? 200 : 80;
      setDisplayText(
        content.length > limit ? `${content.slice(0, limit)}...` : content,
      );
    };

    updateTruncate();
    mediaQuery.addEventListener("change", updateTruncate);
    return () => mediaQuery.removeEventListener("change", updateTruncate);
  }, [content]);

  return (
    <>
      <Card
        className={cn("max-w-[343px] lg:max-w-[798px] rounded-none", className)}
      >
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-[31px] h-[31px]">
              <AvatarImage src="https://i.pravatar.cc/300" alt={username} />
            </Avatar>
            <div>
              <CardTitle className="text-[14px] font-[500] text-muted-foreground">
                {username}
              </CardTitle>
            </div>
          </div>
          {isEdit ? (
            <div>
              <EditPost
                userId={userId}
                post={{ username, title, content, community }}
              />
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="sm"
                aria-label="Delete"
                onClick={() => setIsConfirmDialogOpen(true)}
              >
                <Trash className="text-[#2B5F44] h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" aria-label="Favorite">
              <Star className="text-[#2B5F44] h-5 w-5" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-2">
          <Badge variant="secondary">{community}</Badge>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {displayText}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {comments} Comments
          </span>
        </CardFooter>
      </Card>
      <ConfirmDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        title="Please confirm if you wish to
        delete the post?"
        description="Are you sure you want to delete the post? Once deleted, it cannot be recovered."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
      />
    </>
  );
}
