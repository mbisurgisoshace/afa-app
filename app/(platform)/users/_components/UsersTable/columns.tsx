"use client";

//import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { User } from "@prisma/client";
//import { Button } from "@/components/ui/button";
//import { deleteUser } from "@/actions/users";
import { UserMoreOptions } from "./UserMoreOptions";

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
    header: "",
    size: 75,
    minSize: 75,
    maxSize: 75,
    cell: ({ row }) => {
      const user = row.original;

      // return (
      //   <div className="flex items-center gap-4 text-primary justify-evenly">
      //     <Button size={"icon"} variant={"ghost"}>
      //       <ViewIcon size={24} strokeWidth={1.5} />
      //     </Button>
      //     <Button size={"icon"} asChild variant={"ghost"}>
      //       <Link href={`/users/${user.id}`}>
      //         <FilePenIcon size={24} strokeWidth={1.5} />
      //       </Link>
      //     </Button>
      //     <Button
      //       size={"icon"}
      //       variant={"ghost"}
      //       onClick={() => deleteUser(user.id)}
      //     >
      //       <Trash2Icon size={24} strokeWidth={1.5} />
      //     </Button>
      //   </div>

      return <UserMoreOptions row={row} />;
    },
  },
];
