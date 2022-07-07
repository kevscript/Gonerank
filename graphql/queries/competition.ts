import { gql } from "@apollo/client";

export const CREATE_COMPETITION = gql`
  mutation CreateCompetition($data: CreateCompetitionInput!) {
    createCompetition(data: $data) {
      id
      name
      abbreviation
    }
  }
`;

export const UPDATE_COMPETITION = gql`
  mutation UpdateCompetition($id: String!, $data: UpdateCompetitionInput!) {
    updateCompetition(id: $id, data: $data) {
      id
      name
      abbreviation
    }
  }
`;
