import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Provider from "@/context/client-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingContextProvider } from "@/context/loading";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <LoadingContextProvider>
            {children} <ToastContainer />
          </LoadingContextProvider>
        </Provider>
      </body>
    </html>
  );
}