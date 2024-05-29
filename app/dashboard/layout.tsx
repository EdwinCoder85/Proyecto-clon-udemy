import { auth } from '@/auth.config';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';


export default async function DashboardLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session = await auth();

  if (!session) {
    redirect("/")
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col">
        <Sidebar />
      </div>
      <main className="md:pl-56 h-full">
        {children}
      </main>
    </div>
  );
}