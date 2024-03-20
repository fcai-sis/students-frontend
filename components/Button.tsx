import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  variant: "primary" | "danger" | "secondary";
  icon?: ReactNode;
} & (
    | {
      asLink: true;
      myHref: string;
      onClick?: never;
    }
    | {
      asLink?: false;
      onClick?: () => void;
      myHref?: never;
    }
  );

export function buttonClassName(variant: "primary" | "danger" | "secondary") {
  const style = {
    primary: "bg-blue-600 text-slate-50 hover:bg-blue-500 active:bg-blue-700",
    danger: "bg-red-600 text-slate-50 hover:bg-red-500 active:bg-red-700",
    secondary:
      "bg-slate-50 text-slate-400 hover:bg-slate-200 active:bg-slate-300",
  };

  const className = `cursor-pointer flex justify-center gap-2 p-4 rounded-lg ${style[variant]} transition-colors duration-200 shadow-md hover:shadow-lg active:shadow-none outline-none w-fit min-w-28 font-bold whitespace-nowrap disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-300 disabled:hover:text-slate-400 disabled:active:bg-slate-300 disabled:active:text-slate-400 disabled:shadow-none disabled:outline-none disabled:shadow-none disabled:hover:shadow-none disabled:active:shadow-none disabled:outline-none`;

  return className;
}

export default function Button({
  children,
  variant,
  icon,
  onClick,
  asLink,
  myHref,
  type,
  disabled,
}: ComponentProps<"button"> & ButtonProps) {
  const className = buttonClassName(variant);

  if (asLink) {
    return (
      <Link className={className} href={myHref}>
        {children}
        {icon ? icon : <></>}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
      {icon ? icon : <></>}
    </button>
  );
}

