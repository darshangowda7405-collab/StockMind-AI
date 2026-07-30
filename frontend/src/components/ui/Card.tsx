import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl",
        "border border-white/10",
        "bg-white/5",
        "backdrop-blur-xl",
        "shadow-lg shadow-black/20",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-cyan-400/30",
        "hover:shadow-cyan-500/10",
        "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}