import { MatchDataQuery } from "@/graphql/generated/queryTypes";
import Breadcrumbs from "./shared/Breadcrumbs";

export function MatchBreadcrumbs({
  match,
}: {
  match: MatchDataQuery["match"];
}) {
  return (
    <Breadcrumbs
      crumbs={[
        { label: "Accueil", path: "/" },
        { label: "Matchs", path: "/matches" },
        {
          label: match
            ? `${match.competition.abbreviation} - ${
                match.opponent.abbreviation
              } ${new Date(match.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })} ${match.home ? "[Dom]" : "[Ext]"} `
            : "",
          path: `/matches/${match.id}`,
        },
      ]}
    />
  );
}
