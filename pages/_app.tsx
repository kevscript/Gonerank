import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-screen flex flex-row relative">
      <Sidebar />
      <div className="flex-1 py-4 px-2">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
