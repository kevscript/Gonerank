import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import { NextPage } from "next";
import AdminGuard from "@/components/AdminGuard";

export type NextCustomPage<P = any, IP = P> = NextPage<P, IP> & {
  isAdminPage?: boolean;
};

function MyApp({ pageProps: { session, ...pageProps }, ...props }: AppProps) {
  const { Component }: { Component: NextCustomPage } = props;

  return (
    <SessionProvider session={session}>
      <div className="relative w-full flex flex-row">
        <Sidebar />
        <div className="flex-1 py-4 px-2">
          {Component.isAdminPage ? (
            <AdminGuard>
              <Component {...pageProps} />
            </AdminGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
