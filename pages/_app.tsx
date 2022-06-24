import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="w-screen flex flex-row relative">
        <Sidebar />
        <div className="flex-1 py-4 px-2">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
