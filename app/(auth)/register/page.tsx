"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from 'next/navigation'


const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "password",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await registerUser({ ...values });
      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left text-white">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input className="bg-white" type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden text-white">Password</FormLabel>
                <FormControl>
                  <Input className="hidden bg-white" type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" variant="success">
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-white">
        {"Already have an account ? "}
        <Link href="/login" className="text-[#49A569] hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
