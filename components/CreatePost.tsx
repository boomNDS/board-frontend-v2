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
import { Plus } from "lucide-react";
import { communityOptions } from "@/lib/types/post.types";
import { usePostApi } from "@/lib/api/post.api";
import { toast } from "sonner";

const createPostSchema = z.object({
  community: z.enum(communityOptions),
  title: z.string().min(6, "Title must be at least 6 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});
type CreatePostValues = z.infer<typeof createPostSchema>;

interface CreatePostProps {
  onSuccess?: () => void;
}

export function CreatePost({ onSuccess }: CreatePostProps) {
  const [open, setOpen] = React.useState(false);
  const postApi = usePostApi();
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { community: "history", title: "", content: "" },
  });

  const handleCancel = () => {
    form.reset();
  };

  const onSubmit = async (data: CreatePostValues) => {
    try {
      await postApi.createPost(data);
      toast.success("Created successfully");
      form.reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to create post");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-[40px]" variant="success">
          Create
          <Plus className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[685px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
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
                      placeholder="What's on your mind..."
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
