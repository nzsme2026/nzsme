
import "./globals.css";


export const metadata = {
  title: "NZSME | Private Membership Network",
  description: "Where NZ business leaders connect."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}