import { auth } from '@/auth.config'; // Import authentication logic
import ButtonMobile from '@/components/ButtonMobile'; // Import ButtonMobile component
import Sidebar from '@/components/Sidebar'; // Import Sidebar component
import { redirect } from 'next/navigation'; // Import redirect function
import { useState } from 'react';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode; // Type definition for children prop
}) {

  // Check for an active session
  const session = await auth();

  // If no session exists, redirect to home page
  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Sidebar only visible on larger screens */}
      {/* <div className="hidden lg:block lg:basis-1/4"> */}
      <div className="basis-1/4 lg:basis-1/6">
        <Sidebar />
      </div>
      {/* Main content area */}
      <main className="basis-full lg:basis-5/6">
        {children}
      </main>
    </div>
  );
}
