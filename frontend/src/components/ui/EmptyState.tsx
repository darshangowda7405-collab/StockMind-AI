import { Inbox } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Inbox
        size={60}
        className="mb-5 text-slate-500"
      />

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-slate-400">
        {description}
      </p>
    </div>
  );
}