import { Header, Footer } from "@repo/ui/layouts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page | Fakebook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header type="full" />
      <div className="pt-16 min-h-[calc(100vh-8rem)]">{children}</div>
      <Footer />
    </>
  );
}
