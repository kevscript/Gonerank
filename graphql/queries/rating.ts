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
