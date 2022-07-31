import { gql } from "@apollo/client";

export const GET_PLAYER = gql`
  query GetPlayer($id: String!) {
    player(id: $id) {
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

export const PLAYER_SEASON_RATINGS = gql`
  query PlayerSeasonRatings($playerId: String!, $seasonId: String!) {
    ratings(where: { playerId: $playerId, seasonId: $seasonId }) {
      id
      matchId
      userId
      rating
    }
  }
`;

export const PLAYER_SEASON_DATA = gql`
  query PlayerSeasonData($playerId: String!, $seasonId: String!) {
    player(id: $playerId) {
      id
      lastName
      country
      firstName
      countryCode
      birthDate
      image
      active
      seasons {
        seasonId
      }
    }

    matches(
      where: { seasonId: $seasonId, archived: true, playerId: $playerId }
    ) {
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
