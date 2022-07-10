import { gql } from "@apollo/client";

export const GET_COMPETITION = gql`
  query GetCompetition($id: String!) {
    competition(id: $id) {
      id
      name
      abbreviation
    }
  }
`;

export const GET_COMPETITIONS = gql`
  query GetCompetitions($where: CompetitionsWhereInput) {
    competitions(where: $where) {
      id
      name
      abbreviation
    }
  }
`;

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

export const DELETE_COMPETITION = gql`
  mutation DeleteCompetition($id: String!) {
    deleteCompetition(id: $id) {
      id
      name
      abbreviation
    }
  }
`;
