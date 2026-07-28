interface Props {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">{title}</h1>

      {subtitle && (
        <p className="mt-2 text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}