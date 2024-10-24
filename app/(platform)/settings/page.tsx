import { getTablasStatus } from "@/actions/settings";
import { TablasStatus } from "./_components/TablasStatus";

export default async function Settings() {
  const statuses = await getTablasStatus();

  return (
    <div className="w-full max-w-[1196px] m-auto">
      <div className="flex items-center justify-between mt-2 mb-4">
        <h3 className="text-2xl font-semibold text-[#070F3F]">Settings</h3>
      </div>
      <div className="w-full border border-[#DEDEDE] p-6 bg-white rounded-lg">
        <TablasStatus statuses={statuses} />
      </div>
    </div>
  );
}
