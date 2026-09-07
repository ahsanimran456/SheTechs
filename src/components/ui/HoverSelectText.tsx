import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
};

/** Text that picks up a selected-text teal shade on hover. */
export function HoverSelectText({
  children,
  className,
  as: Tag = "p",
}: Props) {
  return (
    <Tag className={cn("text-select-hover", className)}>{children}</Tag>
  );
}
