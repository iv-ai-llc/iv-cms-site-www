import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500":
            variant === "primary",
          "border-2 border-current hover:bg-[rgb(var(--foreground))]/5":
            variant === "secondary",
          "hover:bg-[rgb(var(--foreground))]/5": variant === "ghost",
        },
        {
          "px-4 py-2 text-sm rounded-lg": size === "sm",
          "px-6 py-3 rounded-lg": size === "md",
          "px-8 py-4 text-lg rounded-xl": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
