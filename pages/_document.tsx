import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr-FR">
        <Head>
          <link rel="shortcut icon" href="/logo.ico" />
        </Head>
        <body className="min-h-screen bg-gray-50 dark:bg-dark-600">
          <Main />
          <div id="portalRoot" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
