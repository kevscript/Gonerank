import { gql } from "@apollo/client";

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
