import * as React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon: IconComponent, iconPosition = "left", ...props }, ref) => {
    const hasIcon = !!IconComponent;

    const paddingClass = hasIcon
      ? iconPosition === "left"
        ? "pl-9"
        : "pr-9"
      : "";

    return (
      <div className="relative w-full">
        {IconComponent && (
          <div
            className={cn(
              "absolute inset-y-0 flex items-center",
              iconPosition === "left" ? "left-2" : "right-2"
            )}
          >
            <IconComponent className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            paddingClass,
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
