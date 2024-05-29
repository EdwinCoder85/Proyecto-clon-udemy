interface Props {
  children: React.ReactNode;
}

export function Badge({ children }: Props) {
  return (
    <span className="inline-flex items-center rounded-full bg-red-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10">
      {children}
    </span>
  );
}