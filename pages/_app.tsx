import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="relative w-full flex flex-row">
        <Sidebar />
        <div className="flex-1 py-4 px-2">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
