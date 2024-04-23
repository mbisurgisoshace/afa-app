import { auth } from "@/auth";

export default async function Tablas() {
  const session = await auth();

  // const onClick = async () => {
  //   await updateTerroristas();
  // };

  return (
    <div className="w-full max-w-[1196px] m-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-[#070F3F]">Tablas</h3>
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg"></div>
    </div>
  );
}
