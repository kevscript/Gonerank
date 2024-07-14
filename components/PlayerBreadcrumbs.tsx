import { PlayerSeasonDataQuery } from "@/graphql/generated/queryTypes";
import Breadcrumbs from "./shared/Breadcrumbs";

export function PlayerBreadcrumbs({
  player,
}: {
  player: PlayerSeasonDataQuery["player"];
}) {
  return (
    <Breadcrumbs
      crumbs={[
        { label: "Accueil", path: "/" },
        { label: "Joueurs", path: "/players" },
        {
          label: player ? `${player.firstName} ${player.lastName}` : "",
          path: `/players/${player.id}`,
        },
      ]}
    />
  );
}
