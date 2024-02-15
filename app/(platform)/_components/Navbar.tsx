import Image from "next/image";
import { ExitIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  return (
    <div className="bg-white h-[64px] px-6 flex items-center justify-between border-b border-[#DEDEDE]">
      <div className="flex items-center justify-center gap-6">
        <Image alt="Logo" width={144} height={22} src="/logo-nav.svg" />
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
