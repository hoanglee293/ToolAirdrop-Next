import { Inter } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";
import Proivder from "./Provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tool airdrop",
  description: "Tool airdrop",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    router.push("/news");
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black min-h-screen flex flex-col ${inter.className}`}>
        <Proivder>{children}</Proivder>
      </body>
    </html>
  );
}
