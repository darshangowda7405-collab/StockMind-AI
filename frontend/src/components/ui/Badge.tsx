interface BadgeProps {
  text: string;
  type?: "BUY" | "SELL" | "NEUTRAL";
}

export default function Badge({
  text,
  type = "NEUTRAL",
}: BadgeProps) {
  const styles = {
    BUY: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    },

    SELL: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      dot: "bg-red-400",
    },

    NEUTRAL: {
      bg: "bg-slate-500/10",
      border: "border-slate-500/20",
      text: "text-slate-300",
      dot: "bg-slate-400",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-2
        text-sm
        font-semibold
        backdrop-blur-xl
        transition-all
        duration-300
        ${style.bg}
        ${style.border}
        ${style.text}
      `}
    >
      <span
        className={`h-2 w-2 rounded-full animate-pulse ${style.dot}`}
      />

      {text}
    </div>
  );
}