import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <div className="h-full flex flex-row">
      <div className="h-full flex-1 flex flex-col items-center justify-center bg-[#0f172a]">
        <Image
          alt="Login Image"
          width={262}
          height={275}
          className="mb-14"
          src={"/login-image.svg"}
        />
        <Image
          alt="Logo Afa"
          height={137}
          width={137}
          src={"/logo-afa.svg"}
          className="mb-14 dark:invert"
        />

        <h2 className="text-3xl text-white font-semibold">Modelo de Riesgo</h2>

        <Image
          alt="Logo"
          height={27}
          width={180}
          src={"/logo.svg"}
          className="mt-36"
        />
      </div>
      <div className="h-full flex-1 flex flex-col items-center justify-center bg-[#F4F4FA]">
        <LoginForm />
      </div>
    </div>
  );
}
