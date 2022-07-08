import { gql } from "@apollo/client";

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
