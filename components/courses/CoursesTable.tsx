"use client";

// ProductTable.tsx
import React, { useState } from "react";
import { Course } from "@prisma/client";
import { Avatar, Button, Modal, Table } from "../ui";
import { toast } from "sonner";
import { deleteCourse } from "@/actions/courses-actions";

interface Props {
  courses: Course[];
}

function ProductTable ({ courses }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  async function handleDeleteCourse(id: string) {
    const res = await deleteCourse(id);

    if (res.ok) {
      toast.success("Usuario eliminado satisfactoriamente");
    } else {
      toast.error("Error eliminando usuario");
    }

    setOpen(false);
  }

  const columns = [
    {
      header: "Nombre",
      accessorKey: "title",
    },
    // {
    //   header: 'Descripción',
    //   accessorKey: 'description',
    // },
    {
      header: "Imagen",
      accessorKey: "imageUrl",
      cell: (info: any) => {
        const { imageUrl } = info.row.original;
        return (
          <div className="flex justify-center items-center">
            <Avatar src={imageUrl} alt="imagen" />
          </div>
        );
      },
    },
    {
      header: "Categoria",
      accessorKey: "categoryName",
    },
    {
      header: "Acciones",
      cell: (info: any) => {
        const { id } = info.row.original;
        return (
          <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 justify-center items-center">
            <Button className="text-sm lg:text-lg w-20" href={`/dashboard/courses/edit/${id}`}>Editar</Button>
            <Button
              className="bg-red-600 hover:bg-red-700 rounded-xl text-sm lg:text-lg w-20 lg:w-max"
              onClick={() => {
                setSelectedProductId(id);
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
      <div className="overflow-x-auto">
        <Table data={courses} columns={columns} />
      </div>
      <Modal open={open} setOpen={setOpen}>
        <h3 className="text-primary-600 font-bold text-xl">
          ¿Estás seguro de querer eliminar?
        </h3>
        <p className="text-gray-500">
          Esta acción no se puede deshacer y se perderá toda la información del
          producto.
        </p>
        <div className="flex gap-x-2 justify-end mt-2">
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              if (!selectedProductId) return;
              handleDeleteCourse(selectedProductId);
            }}
          >
            Sí, Eliminar
          </Button>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
        </div>
      </Modal>
    </>
  );
};

export default ProductTable;
