interface Props {
  children: React.ReactNode;
}

export function Card({ children }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl px-6 py-4 mb-4">
      {children}
    </div>
  );
}
