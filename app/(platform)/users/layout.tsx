import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") return redirect("/dashboard");

  return <>{children}</>;
}
