import { PlayerSeasonDataQuery } from "@/graphql/generated/queryTypes";
import Head from "next/head";

export function PlayerPageHead({
  player,
}: {
  player?: PlayerSeasonDataQuery["player"];
}) {
  return (
    <Head>
      <title>
        {`Gonerank - ${
          player ? player.firstName + " " + player.lastName : "Joueur"
        }`}
      </title>
      <meta
        name="description"
        content={`Page des statistiques pour ${
          player ? player.firstName + " " + player.lastName : "un joueur"
        }`}
      />
    </Head>
  );
}
