import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { getUsers } from "@/actions/users";
import { Button } from "@/components/ui/button";
//import { DataTable } from "@/components/DataTable";
import { DataTable } from "@/components/DataTable/index";
import { columns } from "./_components/UsersTable/columns";

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="w-full max-w-[1196px] m-auto">
      <div className="flex items-center justify-between mt-2 mb-4">
        <h3 className="text-2xl font-semibold text-[#070F3F]">
          Administración de usuarios
        </h3>
        <Button variant={"outline"} size={"sm"} asChild>
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
