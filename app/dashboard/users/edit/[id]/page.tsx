import UserForm from "@/components/users/UserForm";
import prisma from "@/libs/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Auth",
  description: "Register | Auth",
};

interface Params {
  params: { id: string };
}

export default async function UserPage({ params: { id } }: Params) {
  
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center overflow-hidden overflow-y-scroll">
      <UserForm user={user} />
    </section>
  );
}
