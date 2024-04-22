import Image from "next/image";
import { ExitIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  return (
    <div className="bg-white h-[64px] px-6 flex items-center justify-between border-b border-[#DEDEDE]">
      <div className="flex items-center justify-center gap-2">
        <Image alt="Logo" width={35} height={35} src="/logo-afa-azul.svg" />
        <div className="w-[1px] h-[30px] bg-[#DEDEDE]" />
        <h3 className="text-xl font-semibold">Modelo de Riesgo</h3>
      </div>
      <LogoutButton>
        <Button variant={"secondary"} className="rounded-2xl">
          <div className="flex items-center gap-2 text-[#475569] font-semibold">
            <span>Cerrar sesión</span>
            <ExitIcon width={18} height={18} />
          </div>
        </Button>
      </LogoutButton>
    </div>
  );
}
