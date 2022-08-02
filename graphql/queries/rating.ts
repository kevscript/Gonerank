import { gql } from "@apollo/client";

export const GET_RATINGS = gql`
  query GetRatings($where: RatingsWhereInput) {
    ratings(where: $where) {
      id
      matchId
      playerId
      rating
    }
  }
`;

export const CREATE_USER_RATINGS = gql`
  mutation CreateUserRatings(
    $userId: String!
    $matchId: String!
    $ratings: [CreateUserRatingsInput!]!
  ) {
    createUserRatings(userId: $userId, matchId: $matchId, ratings: $ratings) {
      id
      rating
      userId
      matchId
    }
  }
`;

export const GET_SEASON_RATINGS = gql`
  query GetSeasonRatings($seasonId: String!, $archived: Boolean) {
    ratings(where: { seasonId: $seasonId, archived: $archived }) {
      id
      playerId
      matchId
      rating
    }
  }
`;

export const GET_SEASON_USER_RATINGS = gql`
  query GetSeasonUserRatings(
    $seasonId: String!
    $userId: String!
    $archived: Boolean
  ) {
    ratings(
      where: { seasonId: $seasonId, userId: $userId, archived: $archived }
    ) {
      id
      playerId
      matchId
      rating
    }
  }
`;
