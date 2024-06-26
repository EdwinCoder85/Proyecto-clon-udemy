import Logo from "@/components/Logo";
import type { Metadata } from "next";
import RegisterForm from '../../../components/auth/RegisterForm';

export const metadata: Metadata = {
  title: "Register | Auth",
  description: "Register | Auth",
};

export default function Login() {

  return (
    <section className="h-full lg:h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Logo />
      <RegisterForm />
    </section>
  );
}
