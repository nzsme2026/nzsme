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
                href="https://webfitt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-medium hover:underline"
              >
                webfitt.com
              </a>
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}