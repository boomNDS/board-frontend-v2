"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#BBC2C0]">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="max-w-4xl mx-auto">
          {user ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="space-y-2">
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
              <p className="text-gray-600 mb-6">
                Please login or register to access all features
              </p>
              <div className="space-x-4">
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 