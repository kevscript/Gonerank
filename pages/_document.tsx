import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr-FR">
        <Head>
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
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
