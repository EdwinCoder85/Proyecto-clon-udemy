"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Card, Label, Button, Input } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerSchema } from "@/schemas/authSchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { createUser, updateUser } from "@/actions/users-actions";
import { FormStateUser, User } from "@/interfaces";
import Loading from '../Loading';

type Props = {
  user?: User;
};

export default function UserForm({ user }: Props) {
  const buttonMessage = user ? "Actualizar usuario" : "Crear usuario";
  const [title, setTitle] = useState<string>(buttonMessage);
  const [formData, setFormData] = useState<FormStateUser>({
    username: user?.username || "",
    email: user?.email || "",
    password: user?.password || "",
    role: user?.role || "",
    image: user?.image || "",
  });

  const [file, setFile] = useState<File | undefined>();
  const [selectedFile, setSelectedFile] = useState<string>(
    "Seleccionar archivo"
  );
  const [selectedRole, setSelectedRole] = useState(formData.role);
  const [previewImg, setPreviewImg] = useState<string | undefined>(
    formData.image
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormStateUser>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImg(formData.image);
    }
  }, [file, formData.image]);

  const onSubmit: SubmitHandler<FormStateUser> = async (data) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await result.json();
      data.image = uploadData.secure_url;
    }

    const action = user ? updateUser : createUser;
    const successMessage = user ? "Usuario actualizado" : "Usuario creado";
    const errorMessage = user
      ? "Error al actualizar usuario"
      : "Error al crear usuario";
    setTitle(buttonMessage);

    const id = user?.id as string;
    const res = await action(data, id);

    if (res.ok) {
      toast.success(successMessage);
    } else {
      toast.error(errorMessage);
    }

    // if (user) {
    //   const res = await updateUser(data, user?.id as string);

    //   if (res.ok) {
    //     toast.success("Usuario actualizado");
    //   } else {
    //     toast.error("Error al actualizar usuario");
    //   }
    // } else {
    //   const res = await createUser(data);

    //   if (res.ok) {
    //     toast.success("Usuario creado");
    //   } else {
    //     toast.error("Error al crear usuario");
    //   }
    // }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setFile(e.target.files?.[0]);
    } else {
      setSelectedFile("Seleccionar archivo");
    }
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-4">
            <div className="w-96">
              <Label>Nombre de Usuario</Label>
              <Input
                type="text"
                placeholder="Nombre de Usuario"
                {...register("username")}
                defaultValue={formData.username}
              />
              {errors.username && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.username.message}
                </span>
              )}
              <Label>Correo electrónico</Label>
              <Input
                type="text"
                placeholder="Correo electrónico"
                {...register("email")}
                defaultValue={formData.email}
              />
              {errors.email && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.email.message}
                </span>
              )}
              <Label>Contraseña</Label>
              <Input
                type="password"
                placeholder="Contraseña"
                {...register("password")}
                defaultValue={formData.password}
              />
              {errors.password && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.password.message}
                </span>
              )}
              <Label>Confirmar contraseña</Label>
              <Input
                type="password"
                placeholder="Confirmar contraseña"
                {...register("password")}
                defaultValue={formData.password}
              />
              {errors.password && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.password.message}
                </span>
              )}
              <div className="flex justify-evenly my-2 mb-4">
                <div className="flex place-content-center gap-x-2">
                  <Label>Rol usuario</Label>
                  <Input
                    {...register("role")}
                    type="radio"
                    value="admin"
                    className="w-6 h-6 border ring-0 border-gray-200 text-blue-600 disabled:text-gray-300 outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    checked={selectedRole === "admin"}
                    onChange={() => setSelectedRole("admin")}
                  />
                  <Label>Admin</Label>
                </div>
                <div className="flex place-content-center gap-x-2">
                  <Input
                    {...register("role")}
                    type="radio"
                    value="user"
                    className="w-6 h-6 border ring-0 border-gray-200 text-blue-600 disabled:text-gray-300 outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    checked={selectedRole === "user"}
                    onChange={() => setSelectedRole("user")}
                  />
                  <Label>User</Label>
                </div>
              </div>
              {errors.role && (
                <span className="text-red-500 text-xs">
                  {errors.role.message}
                </span>
              )}
            </div>
            <div className="w-96">
              <Label>Imagen</Label>
              <Input
                type="file"
                {...register("image", {
                  required: true,
                  onChange: handleFileInputChange,
                })}
              />
              <div className="flex gap-x-4">
                {errors.image ? (
                  <span className="text-red-500 text-xs">
                    {errors.image.message}
                  </span>
                ) : (
                  <span
                    className="mt-1 text-sm text-primary dark:text-gray-900"
                    id="imageUrl_error"
                  >
                    JPG, JPGE, PNG o WEBP (10MB Max).
                  </span>
                )}
              </div>
              <div className="bg-gray-100 rounded-xl p-4 my-4 h-60">
                {previewImg && (
                  <Image
                    src={previewImg}
                    alt="Uploaded file"
                    className="w-80 h-40 object-cover mx-auto"
                    width={400}
                    height={400}
                  />
                )}
                {selectedFile === "Seleccionar archivo" ? (
                  <label
                    htmlFor="photo"
                    className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-secondInk
            text-slate-700 hover:bg-secondInk-700 text-center transition-colors"
                  >
                    Seleccionar archivos
                  </label>
                ) : (
                  <label
                    htmlFor="photo"
                    className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-thirdInk-300
            text-secondInk hover:bg-thirdInk-700 text-center transition-colors"
                  >
                    {selectedFile}
                  </label>
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="block mt-2" disabled={isSubmitting}>
          {isSubmitting ? (<Loading title={"Enviando..."} />) : title}
          </Button>
        </form>
      </Card>
    </section>
  );
}
