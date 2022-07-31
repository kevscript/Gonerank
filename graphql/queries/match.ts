import { gql } from "@apollo/client";

export const GET_MATCH = gql`
  query GetMatch($id: String!) {
    match(id: $id) {
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
      players {
        id
        playerId
      }
    }
  }
`;

export const GET_MATCHES = gql`
  query GetMatches($where: MatchesWhereInput) {
    matches(where: $where) {
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
      players {
        id
        playerId
      }
    }
  }
`;

export const CREATE_MATCH = gql`
  mutation CreateMatch($data: CreateMatchInput!) {
    createMatch(data: $data) {
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
      players {
        id
        playerId
      }
    }
  }
`;

export const UPDATE_MATCH = gql`
  mutation UpdateMatch($id: String!, $data: UpdateMatchInput!) {
    updateMatch(id: $id, data: $data) {
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
  }
`;

export const TOGGLE_MATCH_STATUS = gql`
  mutation ToggleMatchStatus($id: String!) {
    toggleMatchStatus(id: $id) {
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
  }
`;

export const TOGGLE_MATCH_ARCHIVE = gql`
  mutation ToggleMatchArchive($id: String!) {
    toggleMatchArchive(id: $id) {
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
  }
`;

export const DELETE_MATCH = gql`
  mutation DeleteMatch($id: String!) {
    deleteMatch(id: $id) {
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
  }
`;

export const UPDATE_MATCH_PLAYERS = gql`
  mutation UpdateMatchPlayers($matchId: String!, $playerIds: [String!]!) {
    updateMatchPlayers(matchId: $matchId, playerIds: $playerIds) {
      id
      matchId
      playerId
    }
  }
`;

export const GET_DISPLAY_MATCH = gql`
  query GetDisplayMatch {
    displayMatch {
      id
      date
      home
      scored
      conceeded
      active
      archived

      competition {
        id
        name
        abbreviation
      }

      season {
        id
        startDate
      }

      opponent {
        name
        abbreviation
        primary
        secondary
      }

      stats {
        playerId
        firstName
        lastName
        image
        avgSum
        numOfAvg
        tendency
      }
    }
  }
`;

export const MATCH_RATINGS = gql`
  query MatchRatings($matchId: String!) {
    ratings(where: { matchId: $matchId }) {
      id
      playerId
      userId
      rating
    }
  }
`;

export const MATCH_DATA = gql`
  query MatchData($matchId: String!) {
    match(id: $matchId) {
      id
      date
      home
      scored
      conceeded
      active
      archived
      competitionId
      competition {
        id
        name
        abbreviation
      }
      seasonId
      season {
        id
        startDate
      }
      opponentId
      opponent {
        id
        name
        abbreviation
        primary
        secondary
      }
    }

    players(where: { match: { matchId: $matchId } }) {
      id
      lastName
      country
      firstName
      countryCode
      birthDate
      image
      active
    }
  }
`;
