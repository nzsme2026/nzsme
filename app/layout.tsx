import "./globals.css";

export const metadata = {
  title: "NZSME | Private Membership Network",
  description: "Where NZ business leaders connect.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white">

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full border-t bg-white text-sm text-gray-500 py-6">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <p>
              © 2026 NZSME. All rights reserved.
            </p>

            <p className="mt-1">
              Powered by{" "}
              <a
                href="https://webfitt.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-medium hover:underline"
              >
                Webfit Solutions Limited
              </a>
            </p>

            {/* Footer Links */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">

              <a
                href="/faq"
                className="hover:text-black transition"
              >
                FAQ
              </a>

              <a
                href="/membership-guidelines"
                className="hover:text-black transition"
              >
                Membership Guidelines
              </a>

              <a
                href="/executive-charter"
                className="hover:text-black transition"
              >
                Executive Charter
              </a>

              <a
                href="/terms-and-conditions"
                className="hover:text-black transition"
              >
                Terms & Conditions
              </a>

              <a
                href="/privacy-policy"
                className="hover:text-black transition"
              >
                Privacy Policy
              </a>

            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}