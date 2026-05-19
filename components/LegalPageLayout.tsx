import Navbar from "@/components/Navbar";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <>
      {/* Constant Header */}
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="border-b bg-white">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <p className="text-sm font-semibold tracking-wide uppercase text-yellow-600 mb-3">
              NZSME Information Centre
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-4 text-lg text-slate-600 leading-8 max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl shadow-sm border p-6 md:p-10">
            <div className="space-y-8 text-[17px] leading-8 text-slate-800">
              {children}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}