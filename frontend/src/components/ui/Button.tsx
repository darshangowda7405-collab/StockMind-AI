import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl px-5 py-2.5 font-semibold transition-all duration-200 active:scale-95",

        variant === "primary" &&
          "bg-cyan-500 hover:bg-cyan-400 text-white",

        variant === "secondary" &&
          "bg-slate-700 hover:bg-slate-600 text-white",

        variant === "danger" &&
          "bg-red-500 hover:bg-red-400 text-white",

        className
      )}
    />
  );
}