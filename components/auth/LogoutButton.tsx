"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export default function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
}
