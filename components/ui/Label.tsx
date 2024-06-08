interface Props {
  children: React.ReactNode;
}

export function Label({ children }: Props) {
  return <label className="block text-base w-[300px] md:w-[450px] lg:w-full font-semibold text-slate-700">{children}</label>;
}
