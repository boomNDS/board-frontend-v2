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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/utils";

const createPostSchema = z.object({
  context: z.string().min(1, "Content is required"),
});
type CreatePostValues = z.infer<typeof createPostSchema>;

export function CommentDialog() {
  const isMobile = useMediaQuery(768);
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { context: "" },
  });

  const handleCancel = () => {
    form.reset();
  };

  const onSubmit = (data: CreatePostValues) => {
    console.log("Submitted:", data);
    form.reset();
  };

  const FormContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="context"
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

        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
          <Button
            type="button"
            variant="success-outline"
            onClick={handleCancel}
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button variant="success" type="submit" className="w-full lg:w-auto">
            Post
          </Button>
        </div>
      </form>
    </Form>
  );

  if (isMobile) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-5" variant="success-outline" type="button">
            Add a Comments
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-[685px] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Add Comments</DialogTitle>
          </DialogHeader>
          <FormContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="w-full max-w-[685px] p-6">
      <h2 className="text-xl font-semibold mb-4">Add Comments</h2>
      <FormContent />
    </div>
  );
}
