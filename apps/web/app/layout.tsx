import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionWrapper } from "@repo/ui/session";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fakebook",
  description: "Fakebook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={geist.className}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
