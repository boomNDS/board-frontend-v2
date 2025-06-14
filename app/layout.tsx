import type { Metadata } from "next";
import { Inter, Castoro } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"] });
const castoro = Castoro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-castoro",
});

export const metadata: Metadata = {
  title: "Board App",
  description: "A simple board application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${castoro.variable}`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
