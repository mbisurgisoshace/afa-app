import Navbar from "./_components/Navbar";
import SubNavbar from "./_components/SubNavbar";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-[#F4F4FA] flex flex-col">
      <Navbar />
      <SubNavbar />
      <div className="p-10 flex-1">{children}</div>
    </div>
  );
}
