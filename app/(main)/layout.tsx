import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#BBC2C0]">
      <Navbar />
      <div className="flex mt-10">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 