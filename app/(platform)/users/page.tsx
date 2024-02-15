import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/UsersTable";
import { columns } from "./_components/UsersTable/columns";
import { getUsers } from "@/actions/users";

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="w-full max-w-[1196px] m-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-[#070F3F]">
          Administración de usuarios
        </h3>
        <Button variant={"outline"} asChild className="rounded-2xl">
          <Link
            href={"/users/new"}
            className="flex items-center gap-2 text-primary"
          >
            <PlusCircledIcon />
            <span className="text-sm font-semibold">Crear usuario</span>
          </Link>
        </Button>
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg">
        <DataTable data={users} columns={columns} />
      </div>
    </div>
  );
}
