"use client";

import { Button, Input } from "@/components/ui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/schemas/authSchema";
import { toast } from "sonner";

type ForgetPasswordData = {
  email: string;
};

export default function ForgotPasswordForm () {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ForgetPasswordData> = async (data) => {

    try {
      const res = await fetch("/api/forget-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Por favor revisar link en tu bandeja de correo.");
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Fallido! Comprueba tu entrada y vuelve a intentarlo.");
      }
    } catch (error) {
      toast.error("¡Fallido! Comprueba tu entrada y vuelve a intentarlo.");
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">¿Has olvidado tu contraseña?</h2>
        <p className="text-gray-500 text-sm">
        Por favor ingrese su correo electrónico para crear una nueva contraseña.
        </p>
      </div>
      <form className="w-[300px] lg:w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-2 mb-5">
          <Input type="text" placeholder="Email" {...register("email")}/>
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>
        <Button type="submit" className="block mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
        </Button>
        <div className="mt-5 mb-5 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">¿Tienes cuenta?</p>
          <Link
            href="/auth/login"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            Acceso
          </Link>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <p className="text-gray-500">¿No tienes cuenta?</p>
          <Link
            href="/auth/register"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            Registrar
          </Link>
        </div>
      </form>
    </div>
  );
};
