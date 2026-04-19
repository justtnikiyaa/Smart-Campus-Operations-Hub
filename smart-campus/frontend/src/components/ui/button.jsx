import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-premium hover:-translate-y-0.5 hover:bg-[#0a53de]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[#dbe5f3] dark:hover:bg-[#223550]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-border bg-card text-card-foreground hover:bg-secondary",
        danger: "bg-danger text-white hover:bg-rose-500"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
