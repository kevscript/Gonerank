import { gql } from "@apollo/client";

export const GET_CLUB = gql`
  query GetClub($id: String!) {
    club(id: $id) {
      id
      name
      abbreviation
      primary
      secondary
      logo
    }
  }
`;

export const GET_CLUBS = gql`
  query GetClubs($where: ClubsWhereInput) {
    clubs(where: $where) {
      id
      name
      abbreviation
      primary
      secondary
      logo
    }
  }
`;

export const CREATE_CLUB = gql`
  mutation CreateClub($data: CreateClubInput!) {
    createClub(data: $data) {
      id
      name
      abbreviation
      primary
      secondary
      logo
    }
  }
`;

export const UPDATE_CLUB = gql`
  mutation UpdateClub($id: String!, $data: UpdateClubInput!) {
    updateClub(id: $id, data: $data) {
      id
      name
      abbreviation
      primary
      secondary
      logo
    }
  }
`;

export const DELETE_CLUB = gql`
  mutation DeleteClub($id: String!) {
    deleteClub(id: $id) {
      id
      name
      abbreviation
      primary
      secondary
      logo
    }
  }
`;
