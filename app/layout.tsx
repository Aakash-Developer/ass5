import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className=" max-w-screen-xl mx-auto ">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
