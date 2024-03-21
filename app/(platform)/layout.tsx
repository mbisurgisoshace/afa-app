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
      <div className="py-2 px-10 flex-1 h-[calc(100%-128px)] overflow-auto">
        {children}
      </div>
    </div>
  );
}
