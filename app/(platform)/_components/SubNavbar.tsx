"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  TableIcon,
  BriefcaseIcon,
  CircleUserIcon,
  MenuSquareIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SubNavbar() {
  const { data } = useSession();
  const pathname = usePathname();

  return (
    <div className="bg-white h-[52px] px-6 flex items-center border-b border-[#DEDEDE] gap-4">
      <Button
        asChild
        variant={
          pathname === "/dashboard" ? "navbarLinkSelected" : "navbarLink"
        }
      >
        <Link href="/dashboard" className="flex flex-row items-center gap-2">
          <LayoutDashboardIcon size={24} strokeWidth={1.5} />
          <span>Dashboard</span>
        </Link>
      </Button>

      <Button
        asChild
        variant={
          pathname === "/formularios" ? "navbarLinkSelected" : "navbarLink"
        }
      >
        <Link href="/formularios" className="flex flex-row items-center gap-2">
          <MenuSquareIcon size={24} strokeWidth={1.5} />
          <span>Formularios</span>
        </Link>
      </Button>
      <Button
        asChild
        variant={
          pathname.includes("/entidades") ? "navbarLinkSelected" : "navbarLink"
        }
      >
        <Link href="/entidades" className="flex flex-row items-center gap-2">
          <BriefcaseIcon size={24} strokeWidth={1.5} />
          <span>Entidades</span>
        </Link>
      </Button>

      {data?.user.role === "ADMIN" && (
        <Button
          asChild
          variant={
            pathname === "/settings" ? "navbarLinkSelected" : "navbarLink"
          }
        >
          <Link href="/settings" className="flex flex-row items-center gap-2">
            <SettingsIcon size={24} strokeWidth={1.5} />
            <span>Settings</span>
          </Link>
        </Button>
      )}

      {data?.user.role === "ADMIN" && (
        <Button
          asChild
          variant={
            pathname.includes("/users") ? "navbarLinkSelected" : "navbarLink"
          }
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
