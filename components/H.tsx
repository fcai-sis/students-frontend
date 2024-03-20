import { cn } from "@/lib";
import { ComponentProps } from "react";

export function H1({ children, className }: ComponentProps<"h1">) {
  return <h1 className={cn("text-4xl font-bold", className)}>{children}</h1>;
}

export function H2({ children, className }: ComponentProps<"h2">) {
  return <h2 className={cn("text-3xl font-bold", className)}>{children}</h2>;
}

export function H3({ children, className }: ComponentProps<"h3">) {
  return <h3 className={cn("text-2xl font-bold", className)}>{children}</h3>;
}

export function H4({ children, className }: ComponentProps<"h4">) {
  return <h4 className={cn("text-xl font-bold", className)}>{children}</h4>;
}

export function H5({ children, className }: ComponentProps<"h5">) {
  return <h5 className={cn("text-lg font-bold", className)}>{children}</h5>;
}

export function H6({ children, className }: ComponentProps<"h6">) {
  return <h6 className={cn("text-base font-bold", className)}>{children}</h6>;
}

export function P({ children, className }: ComponentProps<"p">) {
  return <p className={cn("text-base", className)}>{children}</p>;
}
