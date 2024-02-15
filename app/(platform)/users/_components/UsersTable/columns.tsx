"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FilePenIcon, Trash2Icon, ViewIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Omit<User, "password">>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "apellido",
    header: "Apellido",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "acciones",
    header: "Acciones",
    size: 150,
    minSize: 150,
    maxSize: 150,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-4 text-primary">
          <Button size={"icon"} variant={"ghost"}>
            <ViewIcon width={24} height={24} />
          </Button>
          <Button size={"icon"} asChild variant={"ghost"}>
            <Link href={`/users/${user.id}`}>
              <FilePenIcon width={24} height={24} />
            </Link>
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <Trash2Icon width={24} height={24} />
          </Button>
        </div>
      );
    },
  },
];
