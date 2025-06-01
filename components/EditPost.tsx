import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import type { communityOptionsType } from "@/lib/types/post.types";
import { communityOptions } from "@/lib/types/post.types";
import { usePostApi } from "@/lib/api/post.api";
import { toast } from "sonner";

const createPostSchema = z.object({
  community: z.enum(communityOptions),
  title: z.string().min(6, "Title is required"),
  content: z.string().min(10, "Content is required"),
});
type EditPostValues = z.infer<typeof createPostSchema>;

interface EditPostProps {
  userId: number;
  post: {
    id: number;
    username: string;
    community: string;
    title: string;
    content: string;
  };
  onEdit?: () => void;
}

export function EditPost({ userId, post, onEdit }: EditPostProps) {
  const postApi = usePostApi();
  const [open, setOpen] = React.useState(false);
  const form = useForm<EditPostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      community: (post.community as communityOptionsType) || "history",
      title: post.title,
      content: post.content,
    },
  });

  const handleCancel = () => {
    form.reset();
  };

  const onSubmit = async (data: EditPostValues) => {
    try {
      console.log("Submitted:", { ...data, userId });
      await postApi.updatePost(post.id, data);
      toast.success("Edited successfully");
      form.reset();
      onEdit?.();
      setOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to edit post");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          variant="ghost"
          size="sm"
          aria-label="Favorite"
        >
          <Edit3 className="text-[#2B5F44] h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[685px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="community"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        variant="success-outline"
                        className="w-full lg:w-[195px]"
                      >
                        <SelectValue placeholder="Choose a community" />
                      </SelectTrigger>
                      <SelectContent>
                        {communityOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="What’s on your mind..."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col lg:flex-row space-x-2 overflow-hidden">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="success-outline"
                  onClick={handleCancel}
                  className="w-full lg:w-auto"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="success"
                type="submit"
                className="w-full lg:w-auto"
              >
                Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
