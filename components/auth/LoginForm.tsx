"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { RiGoogleFill, RiGithubFill } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import Link from "next/link";
import { ButtonSignIn } from "@/components/ui";
import { Login } from "@/interfaces";
import Loading from "../Loading";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.error) {
        reset();
        toast.success("Inicio de sesión satisfactorio.");
        router.push("/dashboard");
        router.refresh();
      } else {
        reset();
        toast.error("¡Comprueba tu email o contraseña!");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Ocurrió un error al iniciar sesión. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Welcome, Back!</h2>
        <p className="text-gray-500 text-sm">
          Please enter your email and password to enter the application
        </p>
      </div>
      <form className="w-[300px] lg:w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col my-2">
          <Input type="text" placeholder="Email" {...register("email")} />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col my-2">
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message}</span>
          )}
        </div>
        <div className="flex justify-end mb-5 w-[300px] md:w-[450px] lg:w-full">
          <Link
            href="/auth/forget-password"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            forgot password?
          </Link>
        </div>
        <Button type="submit" className="block mt-2" disabled={isSubmitting}>
          {isSubmitting ? <Loading title={"Procesando..."} /> : "Login"}
        </Button>
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2 w-[300px] md:w-[450px] lg:w-full">
          <p className="text-gray-500">dont have account?</p>
          <Link
            href="/auth/register"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            Register
          </Link>
        </div>
        <div className="mb-5 w-[300px] md:w-[450px] lg:w-full">
          <hr className="border-2" />
          <div className="flex justify-center">
            <span className="bg-white px-8 -mt-3">or</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 w-[300px] md:w-[450px] lg:w-full">
          <ButtonSignIn icon={RiGoogleFill} provider="google">
            Google
          </ButtonSignIn>
          <ButtonSignIn icon={RiGithubFill} provider="github">
            Github
          </ButtonSignIn>
        </div>
      </form>
    </div>
  );
}
