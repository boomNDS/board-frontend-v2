import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/Sidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Navbar />
      <div className="flex">
        <Sidebar className="hidden md:block bg-[#BBC2C0]" />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
