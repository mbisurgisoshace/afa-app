import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default async function Home() {
  return (
    <div className="h-full flex flex-row">
      <div className="h-full flex-1 flex flex-col items-center justify-center bg-[#0f172a]">
        <Image
          alt="Login Image"
          width={262}
          height={275}
          className="mb-16"
          src={"/login-image.svg"}
        />
        <Image alt="Logo" height={65} width={442} src={"/logo.svg"} />
        <Image
          alt="Logo Afa"
          height={80}
          width={80}
          src={"/logo-afa.svg"}
          className="mt-20 dark:invert"
        />
      </div>
      <div className="h-full flex-1 flex flex-col items-center justify-center bg-[#F4F4FA]">
        <LoginForm />
      </div>
    </div>
  );
}
