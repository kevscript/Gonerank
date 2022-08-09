import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/logo.ico" />
        </Head>
        <body className="min-h-screen bg-gray-50">
          <Main />
          <div id="portalRoot" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
