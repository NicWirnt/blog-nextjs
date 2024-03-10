import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`font-sans ${inter.variable}`}>
          <div className="flex h-screen flex-col">
            <Header />
            <main className="w-full max-w-7xl flex-1 p-5 md:px-10 lg:mx-auto xl:px-0">
              <TRPCReactProvider> {children} </TRPCReactProvider>
            </main>

            <Footer />
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
