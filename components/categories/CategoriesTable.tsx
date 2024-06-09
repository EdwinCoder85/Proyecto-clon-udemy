"use client";
import { Category } from "@prisma/client";
import { Button, Table } from "../ui";

interface Props {
  categories: Category[];
}

function CategoriesTable({ categories }: Props) {
  const columns = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Descripción",
      accessorKey: "description",
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
          <div className="flex justify-center items-center">
            <Button className="text-sm lg:text-lg" href={`/dashboard/categories/edit/${id}`}>Editar</Button>
          </div>
        );
      },
    },
  ];

  return <Table data={categories} columns={columns} />;
}

export default CategoriesTable;
