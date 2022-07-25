import { gql } from "@apollo/client";

export const GET_SEASON = gql`
  query GetSeason($id: String!) {
    season(id: $id) {
      id
      startDate
      players {
        id
        playerId
      }
    }
  }
`;

export const GET_SEASONS = gql`
  query GetSeasons($where: SeasonsWhereInput) {
    seasons(where: $where) {
      id
      startDate
    }
  }
`;

export const CREATE_SEASON = gql`
  mutation CreateSeason($data: CreateSeasonInput!) {
    createSeason(data: $data) {
      id
      startDate
    }
  }
`;

export const UPDATE_SEASON = gql`
  mutation UpdateSeason($id: String!, $data: UpdateSeasonInput!) {
    updateSeason(id: $id, data: $data) {
      id
      startDate
    }
  }
`;

export const DELETE_SEASON = gql`
  mutation DeleteSeason($id: String!) {
    deleteSeason(id: $id) {
      id
      startDate
    }
  }
`;

export const UPDATE_SEASON_PLAYERS = gql`
  mutation UpdateSeasonPlayers($seasonId: String!, $playerIds: [String!]!) {
    updateSeasonPlayers(seasonId: $seasonId, playerIds: $playerIds) {
      id
      seasonId
      playerId
    }
  }
`;

export const GET_SEASON_PLAYERS = gql`
  query GetSeasonPlayers($where: SeasonPlayersWhereInput) {
    seasonPlayers(where: $where) {
      id
      player {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_SEASON_PLAYERSTATS = gql`
  query GetSeasonPlayerStats($seasonId: String!) {
    season(id: $seasonId) {
      id
      startDate
      playerStats {
        playerId
        firstName
        lastName
        image
        matches {
          matchId
          averageSum
          averageQuantity
          tendency
          motm
          botm
        }
      }
    }
  }
`;
