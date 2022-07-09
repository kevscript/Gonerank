import { gql } from "@apollo/client";

// export const GET_ALL_PLAYERS = gql`
//   query GetAllPlayers {
//     players {
//       id
//       firstName
//       lastName
//       birthDate
//       country
//       countryCode
//       image
//       active
//     }
//   }
// `;

export const GET_PLAYERS = gql`
  query GetPlayers($where: PlayersWhereInput) {
    players(where: $where) {
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

export const DELETE_PLAYER = gql`
  mutation DeletePlayer($id: String!) {
    deletePlayer(id: $id) {
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
