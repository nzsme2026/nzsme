import Navbar from "@/components/Navbar";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  children,
}: Props) {
  return (
    <>
      {/* Constant Header */}
      <Navbar />

      <main className="min-h-screen bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-16">

          <h1 className="text-4xl font-bold mb-10">
            {title}
          </h1>

          <div className="space-y-6 text-[17px] leading-8">
            {children}
          </div>

        </div>
      </main>
    </>
  );
}