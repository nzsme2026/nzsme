import "./globals.css";

export const metadata = {
  title: "NZSME | Private Membership Network",
  description: "Where NZ business leaders connect."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        
        <main className="flex-grow">
          {children}
        </main>

        <footer className="w-full bg-gray-100 text-sm flex justify-center items-center py-3 border-t">
          <span>
            Copyright © 2026 NZSME. All rights reserved.{" "}
            Powered by{" "}
            <a
              href="https://webfitt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              webfitt.com
            </a>
          </span>
        </footer>

      </body>
    </html>
  );
}