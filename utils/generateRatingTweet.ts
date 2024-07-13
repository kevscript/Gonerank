import {
  GetDisplayMatchQuery,
  GetRatingsQuery,
} from "@/graphql/generated/queryTypes";

type GenerateRatingTweetArgs = {
  userRatings: GetRatingsQuery["ratings"];
  match: NonNullable<GetDisplayMatchQuery["displayMatch"]>;
};

export function generateRatingTweet({
  userRatings,
  match,
}: GenerateRatingTweetArgs) {
  const ratings: { firstName: string; lastName: string; rating: number }[] = [];

  userRatings.forEach((r) => {
    const player = match.stats.find((s) => s.playerId === r.playerId);
    if (player) {
      ratings.push({
        firstName: player.firstName,
        lastName: player.lastName,
        rating: r.rating,
      });
    }
  });

  const ratingsArr = ratings
    .sort((a, b) => (a.rating > b.rating ? -1 : 1))
    .map((r) => encodeURI(`${r.lastName} - ${r.rating}`));

  const ratingsText = ratingsArr.join("%0D%0A");
  const headerText = `Mes notes vs ${match.opponent.abbreviation.toUpperCase()} - ${new Date(
    match.date
  ).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })} :`;

  const finalText = `${headerText}%0D%0A${ratingsText}`;

  return finalText;
}
