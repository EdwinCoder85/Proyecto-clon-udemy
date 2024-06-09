"use client";

import { User } from "@prisma/client";
import { Avatar, Button, Modal, Table } from "../ui";
import { useState } from "react";
import { toast } from "sonner";
import { deleteUser } from '@/actions/users-actions';

interface Props {
  users: User[];
}

function UserTable({ users }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  async function handleDeleteUser(id: string) {

    const res = await deleteUser(id)
    
     if (res.ok) {
      toast.success("Usuario eliminado satisfactoriamente");
    } else {
      toast.error("Error eliminando usuario");
    }

    setOpen(false);
  }

  const columns = [
    {
      header: "Imagen",
      accessorKey: "image",
      cell: (info: any) => {
        const { image } = info.row.original;
        return (
          <div className="flex justify-center items-center">
            <Avatar src={image} alt="imagen" />
          </div>
        );
      },
    },
    {
      header: "Usuario",
      accessorKey: "username",
    },
    // {
    //   header: "Correo",
    //   accessorKey: "email",
    // },
    // {
    //   header: "Correo confirmado",
    //   accessorKey: "emailVerified",
    // },
    {
      header: "Rol",
      accessorKey: "role",
    },
    // {
    //   header: "Creado",
    //   accessorKey: "formattedCreatedAt",
    // },
    {
      header: "Acciones",
      cell: (info: any) => {
        const { id } = info.row.original;
        return (
          <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 justify-center items-center">
            <Button className="text-sm lg:text-lg w-20" href={`/dashboard/users/edit/${id}`}>Editar</Button>
            <Button
              className="bg-red-600 hover:bg-red-700 rounded-xl text-sm lg:text-lg w-20 lg:w-max"
              onClick={() => {
                setSelectedUserId(id);
                setOpen(true);
              }}
            >
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table data={users} columns={columns} />
      <Modal open={open} setOpen={setOpen}>
        <h3 className="text-primary-600 font-bold h3">
          Estas Seguro de querer eliminar?
        </h3>
        <p className="text-gray-500">
          Esta accion no se puede deshacer y se perdera toda la informacion del
          usuario
        </p>
        <div className="flex gap-x-2 justify-end mt-2">
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              if (!selectedUserId) return;
              handleDeleteUser(selectedUserId);
            }}
          >
            Si, Eliminar
          </Button>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
        </div>
      </Modal>
    </>
  );
}
export default UserTable;
