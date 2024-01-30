import Navbar from "./_components/Navbar";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-[#F4F4FA]">
      <Navbar />
      {children}
    </div>
  );
}
