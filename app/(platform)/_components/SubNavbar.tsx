"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon,
  CircleUserIcon,
  LayoutDashboardIcon,
  MenuSquareIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SubNavbar() {
  const { data } = useSession();
  const pathname = usePathname();

  return (
    <div className="bg-white h-[64px] px-6 flex items-center border-b border-[#DEDEDE] gap-4">
      <Button
        asChild
        className="rounded-2xl"
        variant={pathname === "/dashboard" ? "default" : "secondary"}
      >
        <Link href="/dashboard" className="flex flex-row items-center gap-2">
          <LayoutDashboardIcon size={24} strokeWidth={1.5} />
          <span>Dashboard</span>
        </Link>
      </Button>
      <Button
        asChild
        className="rounded-2xl"
        variant={pathname === "/formularios" ? "default" : "secondary"}
      >
        <Link href="/formularios" className="flex flex-row items-center gap-2">
          <MenuSquareIcon size={24} strokeWidth={1.5} />
          <span>Formularios</span>
        </Link>
      </Button>
      <Button
        asChild
        className="rounded-2xl"
        variant={pathname.includes("/entidades") ? "default" : "secondary"}
      >
        <Link href="/entidades" className="flex flex-row items-center gap-2">
          <BriefcaseIcon size={24} strokeWidth={1.5} />
          <span>Entidades</span>
        </Link>
      </Button>
      {data?.user.role === "ADMIN" && (
        <Button
          asChild
          className="rounded-2xl"
          variant={pathname.includes("/users") ? "default" : "secondary"}
        >
          <Link href="/users" className="flex flex-row items-center gap-2">
            <CircleUserIcon size={24} strokeWidth={1.5} />
            <span>Administración de Usuarios</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
