import clsx from "clsx";

interface Props {
  className?: string;
}

export default function Skeleton({
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-xl bg-slate-700/60",
        className
      )}
    />
  );
}