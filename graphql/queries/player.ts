import { gql } from "@apollo/client";

export const GET_ALL_PLAYERS = gql`
  query GetAllPlayers {
    players {
      id
      firstName
      lastName
      birthDate
      country
      countryCode
      image
      active
    }
  }
`;
