import Breadcrumbs from "./shared/Breadcrumbs";

export function MatchesBreadcrumbs() {
  return (
    <Breadcrumbs
      crumbs={[
        { label: "Accueil", path: "/" },
        { label: "Matchs", path: "/matches" },
      ]}
    />
  );
}
