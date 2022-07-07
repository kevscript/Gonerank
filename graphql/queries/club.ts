import { gql } from "@apollo/client";

export const CREATE_CLUB = gql`
  mutation CreateClub($data: CreateClubInput!) {
    createClub(data: $data) {
      id
      name
      abbreviation
      primary
      secondary
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
    }
  }
`;
