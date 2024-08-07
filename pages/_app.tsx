import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/sidebar/Sidebar";
import { NextPage } from "next";
import AdminGuard from "@/components/AdminGuard";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/mobile/Header";

export type NextCustomPage<P = any, IP = P> = NextPage<P, IP> & {
  isAdminPage?: boolean;
};

function MyApp({ pageProps: { session, ...pageProps }, ...props }: AppProps) {
  const { Component }: { Component: NextCustomPage } = props;

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="w-full min-h-screen lg:pl-16 xl:pl-64">
              {Component.isAdminPage ? (
                <AdminGuard>
                  <Component {...pageProps} />
                </AdminGuard>
              ) : (
                <Component {...pageProps} />
              )}
            </div>
          </div>
        </ThemeProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
