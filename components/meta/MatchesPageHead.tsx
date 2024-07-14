import Head from "next/head";

export function MatchesPageHead() {
  return (
    <Head>
      <title>Gonerank - Matchs</title>
      <meta
        name="description"
        content="Page avec les statistiques des matchs"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
