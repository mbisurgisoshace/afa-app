import Image from "next/image";
import { ExitIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  return (
    <div className="bg-white py-[35px] px-[120px] flex items-center justify-between border-b border-[#DEDEDE]">
      <Image alt="Logo" width={144} height={22} src="/logo-nav.svg" />
      <LogoutButton>
        <Button>
          <div className="flex items-center gap-2">
            <ExitIcon width={18} height={18} />
            Salir
          </div>
        </Button>
      </LogoutButton>
    </div>
  );
}
