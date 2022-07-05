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

export const UPDATE_PLAYER = gql`
  mutation UpdatePlayer($id: String!, $data: UpdatePlayerInput!) {
    updatePlayer(id: $id, data: $data) {
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

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($data: CreatePlayerInput!) {
    createPlayer(data: $data) {
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
