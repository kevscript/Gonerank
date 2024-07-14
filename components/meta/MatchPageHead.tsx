import { MatchDataQuery } from "@/graphql/generated/queryTypes";
import Head from "next/head";

export function MatchPageHead({ match }: { match: MatchDataQuery["match"] }) {
  return (
    <Head>
      <title>
        {`Gonerank - ${
          match
            ? match.opponent + " " + new Date(match.date).toLocaleDateString()
            : "Match"
        }`}
      </title>
      <meta
        name="description"
        content={`Page des statistiques pour le match contre ${
          match
            ? match.opponent +
              ", le " +
              new Date(match.date).toLocaleDateString()
            : "un adversaire"
        }`}
      />
    </Head>
  );
}
