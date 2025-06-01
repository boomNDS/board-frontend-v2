import Image from "next/image";
import { cn } from "@/lib/utils"; // or wherever your `cn` helper lives

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#243831]">
      <div
        className={cn(
          "order-1 lg:order-2",
          "w-screen max-w-full lg:max-w-[900px]",
          "h-[362px] lg:h-auto",
          "lg:w-1/2",
          "rounded-bl-[36px]",
          "rounded-br-[36px] lg:rounded-br-none",
          "rounded-tl-none lg:rounded-tl-[36px]",
          "bg-[#2B5F44]",
          "flex items-center justify-center",
          "p-8",
        )}
      >
        <div className="text-center">
          <div
            className={cn(
              "relative mx-auto",
              "w-[171.46px] h-[131.63px]",
              "lg:w-[299.61px] lg:h-[230px]",
            )}
          >
            <Image
              src="/images/authVector.png"
              alt="notebook with pencil, highlighter pen and papers"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="mt-5 text-white text-3xl italic font-castoro leading-tight">
            a Board
          </h1>
        </div>
      </div>

      <div
        className={cn(
          "order-2 lg:order-1",
          "flex-1 flex items-center justify-center",
          "p-8",
        )}
      >
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
