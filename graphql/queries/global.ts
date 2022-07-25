import { gql } from "@apollo/client";

export const GLOBAL_SEASON_DATA = gql`
  query GlobalSeasonData($seasonId: String!) {
    players(where: { season: { seasonId: $seasonId } }) {
      id
      lastName
      country
      firstName
      countryCode
      birthDate
      image
      active
    }

    matches(where: { seasonId: $seasonId, archived: true }) {
      id
      date
      home
      scored
      conceeded
      active
      archived
      competitionId
      seasonId
      opponentId
    }

    competitions {
      id
      abbreviation
      name
    }

    clubs {
      id
      name
      abbreviation
      primary
      secondary
    }
  }
`;
