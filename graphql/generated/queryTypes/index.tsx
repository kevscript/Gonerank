import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Bytes: any;
  DateTime: any;
  Decimal: any;
  Json: any;
};

export type Account = {
  __typename?: 'Account';
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  id_token?: Maybe<Scalars['String']>;
  oauth_token?: Maybe<Scalars['String']>;
  oauth_token_secret?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  session_state?: Maybe<Scalars['String']>;
  token_type?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  userId: Scalars['String'];
};

export type Club = {
  __typename?: 'Club';
  abbreviation: Scalars['String'];
  id: Scalars['ID'];
  matches: Array<Match>;
  name: Scalars['String'];
  primary: Scalars['String'];
  secondary: Scalars['String'];
};

export type Competition = {
  __typename?: 'Competition';
  abbreviation: Scalars['String'];
  id: Scalars['ID'];
  matches: Array<Match>;
  name: Scalars['String'];
};

export type CreateClubInput = {
  abbreviation: Scalars['String'];
  name: Scalars['String'];
  primary: Scalars['String'];
  secondary: Scalars['String'];
};

export type CreateCompetitionInput = {
  abbreviation: Scalars['String'];
  name: Scalars['String'];
};

export type CreateMatchInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  competitionId: Scalars['String'];
  conceeded: Scalars['Int'];
  date: Scalars['DateTime'];
  home?: InputMaybe<Scalars['Boolean']>;
  opponentId: Scalars['String'];
  scored: Scalars['Int'];
  seasonId: Scalars['String'];
};

export type CreatePlayerInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  birthDate: Scalars['DateTime'];
  country?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
};

export type CreateSeasonInput = {
  startDate: Scalars['DateTime'];
};

export type CreateUserRatingsInput = {
  playerId: Scalars['String'];
  rating: Scalars['Int'];
};

export type Match = {
  __typename?: 'Match';
  active: Scalars['Boolean'];
  competition: Competition;
  competitionId: Scalars['String'];
  conceeded: Scalars['Int'];
  date: Scalars['DateTime'];
  home: Scalars['Boolean'];
  id: Scalars['ID'];
  opponent: Club;
  opponentId: Scalars['String'];
  players: Array<MatchPlayer>;
  ratings: Array<Rating>;
  scored: Scalars['Int'];
  season: Season;
  seasonId: Scalars['String'];
};

export type MatchPlayer = {
  __typename?: 'MatchPlayer';
  id: Scalars['ID'];
  match: Match;
  matchId: Scalars['String'];
  player: Player;
  playerId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClub: Club;
  createCompetition: Competition;
  createMatch: Match;
  createPlayer: Player;
  createSeason: Season;
  createUserRatings: Array<Rating>;
  deleteClub: Club;
  deleteCompetition: Competition;
  deleteMatch: Match;
  deletePlayer: Player;
  deleteSeason: Season;
  deleteUser: User;
  updateClub: Club;
  updateCompetition: Competition;
  updateMatch: Match;
  updateMatchPlayers: Array<MatchPlayer>;
  updatePlayer: Player;
  updateSeason: Season;
  updateUser: User;
};


export type MutationCreateClubArgs = {
  data: CreateClubInput;
};


export type MutationCreateCompetitionArgs = {
  data: CreateCompetitionInput;
};


export type MutationCreateMatchArgs = {
  data: CreateMatchInput;
};


export type MutationCreatePlayerArgs = {
  data: CreatePlayerInput;
};


export type MutationCreateSeasonArgs = {
  data: CreateSeasonInput;
};


export type MutationCreateUserRatingsArgs = {
  matchId: Scalars['String'];
  ratings: Array<CreateUserRatingsInput>;
  userId: Scalars['String'];
};


export type MutationDeleteClubArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCompetitionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMatchArgs = {
  id: Scalars['String'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSeasonArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateClubArgs = {
  data: UpdateClubInput;
  id: Scalars['String'];
};


export type MutationUpdateCompetitionArgs = {
  data: UpdateCompetitionInput;
  id: Scalars['String'];
};


export type MutationUpdateMatchArgs = {
  data: UpdateMatchInput;
  id: Scalars['String'];
};


export type MutationUpdateMatchPlayersArgs = {
  matchId: Scalars['String'];
  playerIds: Array<Scalars['String']>;
};


export type MutationUpdatePlayerArgs = {
  data: UpdatePlayerInput;
  id: Scalars['String'];
};


export type MutationUpdateSeasonArgs = {
  data: UpdateSeasonInput;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserInput;
};

export type Player = {
  __typename?: 'Player';
  active: Scalars['Boolean'];
  birthDate: Scalars['DateTime'];
  country: Scalars['String'];
  countryCode: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  lastName: Scalars['String'];
  matches: Array<MatchPlayer>;
  ratings: Array<Rating>;
};

export type Query = {
  __typename?: 'Query';
  club: Club;
  clubs: Array<Club>;
  competition: Competition;
  competitions: Array<Competition>;
  match: Match;
  matchPlayer: MatchPlayer;
  matchPlayers: Array<MatchPlayer>;
  matches: Array<Match>;
  player: Player;
  players: Array<Player>;
  rating: Rating;
  ratings: Array<Rating>;
  season: Season;
  seasons: Array<Season>;
  user: User;
  users: Array<User>;
};


export type QueryClubArgs = {
  id: Scalars['String'];
};


export type QueryCompetitionArgs = {
  id: Scalars['String'];
};


export type QueryMatchArgs = {
  id: Scalars['String'];
};


export type QueryMatchPlayerArgs = {
  matchId: Scalars['String'];
  playerId: Scalars['String'];
};


export type QueryMatchPlayersArgs = {
  matchId?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['String']>;
};


export type QueryPlayerArgs = {
  id: Scalars['String'];
};


export type QueryRatingArgs = {
  matchId: Scalars['String'];
  playerId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryRatingsArgs = {
  matchId?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QuerySeasonArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['ID'];
  match: Match;
  matchId: Scalars['String'];
  player: Player;
  playerId: Scalars['String'];
  rating: Scalars['Float'];
  user: User;
  userId: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  matches: Array<Match>;
  startDate: Scalars['DateTime'];
};

export type Session = {
  __typename?: 'Session';
  expires: Scalars['DateTime'];
  id: Scalars['ID'];
  sessionToken: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type UpdateClubInput = {
  abbreviation?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['String']>;
  secondary?: InputMaybe<Scalars['String']>;
};

export type UpdateCompetitionInput = {
  abbreviation?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateMatchInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  competitionId?: InputMaybe<Scalars['String']>;
  conceeded?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['DateTime']>;
  home?: InputMaybe<Scalars['Boolean']>;
  opponentId?: InputMaybe<Scalars['String']>;
  scored?: InputMaybe<Scalars['Int']>;
  seasonId?: InputMaybe<Scalars['String']>;
};

export type UpdatePlayerInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  birthDate?: InputMaybe<Scalars['DateTime']>;
  country?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UpdateSeasonInput = {
  startDate: Scalars['DateTime'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  accounts: Array<Account>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ratings: Array<Rating>;
  role: Role;
  sessions: Array<Session>;
};

export type VerificationToken = {
  __typename?: 'VerificationToken';
  expires: Scalars['DateTime'];
  identifier: Scalars['String'];
  token: Scalars['String'];
};

export type CreateClubMutationVariables = Exact<{
  data: CreateClubInput;
}>;


export type CreateClubMutation = { __typename?: 'Mutation', createClub: { __typename?: 'Club', id: string, name: string, abbreviation: string, primary: string, secondary: string } };

export type UpdateClubMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateClubInput;
}>;


export type UpdateClubMutation = { __typename?: 'Mutation', updateClub: { __typename?: 'Club', id: string, name: string, abbreviation: string, primary: string, secondary: string } };

export type CreateCompetitionMutationVariables = Exact<{
  data: CreateCompetitionInput;
}>;


export type CreateCompetitionMutation = { __typename?: 'Mutation', createCompetition: { __typename?: 'Competition', id: string, name: string, abbreviation: string } };

export type UpdateCompetitionMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateCompetitionInput;
}>;


export type UpdateCompetitionMutation = { __typename?: 'Mutation', updateCompetition: { __typename?: 'Competition', id: string, name: string, abbreviation: string } };

export type CreateMatchMutationVariables = Exact<{
  data: CreateMatchInput;
}>;


export type CreateMatchMutation = { __typename?: 'Mutation', createMatch: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, competitionId: string, seasonId: string, opponentId: string } };

export type UpdateMatchMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateMatchInput;
}>;


export type UpdateMatchMutation = { __typename?: 'Mutation', updateMatch: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, competitionId: string, seasonId: string, opponentId: string } };

export type GetAllPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: string, firstName: string, lastName: string, birthDate: any, country: string, countryCode: string, image: string, active: boolean }> };

export type UpdatePlayerMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdatePlayerInput;
}>;


export type UpdatePlayerMutation = { __typename?: 'Mutation', updatePlayer: { __typename?: 'Player', id: string, firstName: string, lastName: string, birthDate: any, country: string, countryCode: string, image: string, active: boolean } };

export type CreatePlayerMutationVariables = Exact<{
  data: CreatePlayerInput;
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer: { __typename?: 'Player', id: string, firstName: string, lastName: string, birthDate: any, country: string, countryCode: string, image: string, active: boolean } };

export type CreateSeasonMutationVariables = Exact<{
  data: CreateSeasonInput;
}>;


export type CreateSeasonMutation = { __typename?: 'Mutation', createSeason: { __typename?: 'Season', id: string, startDate: any } };

export type UpdateSeasonMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateSeasonInput;
}>;


export type UpdateSeasonMutation = { __typename?: 'Mutation', updateSeason: { __typename?: 'Season', id: string, startDate: any } };


export const CreateClubDocument = gql`
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
export type CreateClubMutationFn = Apollo.MutationFunction<CreateClubMutation, CreateClubMutationVariables>;

/**
 * __useCreateClubMutation__
 *
 * To run a mutation, you first call `useCreateClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClubMutation, { data, loading, error }] = useCreateClubMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateClubMutation(baseOptions?: Apollo.MutationHookOptions<CreateClubMutation, CreateClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClubMutation, CreateClubMutationVariables>(CreateClubDocument, options);
      }
export type CreateClubMutationHookResult = ReturnType<typeof useCreateClubMutation>;
export type CreateClubMutationResult = Apollo.MutationResult<CreateClubMutation>;
export type CreateClubMutationOptions = Apollo.BaseMutationOptions<CreateClubMutation, CreateClubMutationVariables>;
export const UpdateClubDocument = gql`
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
export type UpdateClubMutationFn = Apollo.MutationFunction<UpdateClubMutation, UpdateClubMutationVariables>;

/**
 * __useUpdateClubMutation__
 *
 * To run a mutation, you first call `useUpdateClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClubMutation, { data, loading, error }] = useUpdateClubMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateClubMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClubMutation, UpdateClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClubMutation, UpdateClubMutationVariables>(UpdateClubDocument, options);
      }
export type UpdateClubMutationHookResult = ReturnType<typeof useUpdateClubMutation>;
export type UpdateClubMutationResult = Apollo.MutationResult<UpdateClubMutation>;
export type UpdateClubMutationOptions = Apollo.BaseMutationOptions<UpdateClubMutation, UpdateClubMutationVariables>;
export const CreateCompetitionDocument = gql`
    mutation CreateCompetition($data: CreateCompetitionInput!) {
  createCompetition(data: $data) {
    id
    name
    abbreviation
  }
}
    `;
export type CreateCompetitionMutationFn = Apollo.MutationFunction<CreateCompetitionMutation, CreateCompetitionMutationVariables>;

/**
 * __useCreateCompetitionMutation__
 *
 * To run a mutation, you first call `useCreateCompetitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompetitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompetitionMutation, { data, loading, error }] = useCreateCompetitionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCompetitionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompetitionMutation, CreateCompetitionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompetitionMutation, CreateCompetitionMutationVariables>(CreateCompetitionDocument, options);
      }
export type CreateCompetitionMutationHookResult = ReturnType<typeof useCreateCompetitionMutation>;
export type CreateCompetitionMutationResult = Apollo.MutationResult<CreateCompetitionMutation>;
export type CreateCompetitionMutationOptions = Apollo.BaseMutationOptions<CreateCompetitionMutation, CreateCompetitionMutationVariables>;
export const UpdateCompetitionDocument = gql`
    mutation UpdateCompetition($id: String!, $data: UpdateCompetitionInput!) {
  updateCompetition(id: $id, data: $data) {
    id
    name
    abbreviation
  }
}
    `;
export type UpdateCompetitionMutationFn = Apollo.MutationFunction<UpdateCompetitionMutation, UpdateCompetitionMutationVariables>;

/**
 * __useUpdateCompetitionMutation__
 *
 * To run a mutation, you first call `useUpdateCompetitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompetitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompetitionMutation, { data, loading, error }] = useUpdateCompetitionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCompetitionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompetitionMutation, UpdateCompetitionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompetitionMutation, UpdateCompetitionMutationVariables>(UpdateCompetitionDocument, options);
      }
export type UpdateCompetitionMutationHookResult = ReturnType<typeof useUpdateCompetitionMutation>;
export type UpdateCompetitionMutationResult = Apollo.MutationResult<UpdateCompetitionMutation>;
export type UpdateCompetitionMutationOptions = Apollo.BaseMutationOptions<UpdateCompetitionMutation, UpdateCompetitionMutationVariables>;
export const CreateMatchDocument = gql`
    mutation CreateMatch($data: CreateMatchInput!) {
  createMatch(data: $data) {
    id
    date
    home
    scored
    conceeded
    active
    competitionId
    seasonId
    opponentId
  }
}
    `;
export type CreateMatchMutationFn = Apollo.MutationFunction<CreateMatchMutation, CreateMatchMutationVariables>;

/**
 * __useCreateMatchMutation__
 *
 * To run a mutation, you first call `useCreateMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMatchMutation, { data, loading, error }] = useCreateMatchMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMatchMutation(baseOptions?: Apollo.MutationHookOptions<CreateMatchMutation, CreateMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMatchMutation, CreateMatchMutationVariables>(CreateMatchDocument, options);
      }
export type CreateMatchMutationHookResult = ReturnType<typeof useCreateMatchMutation>;
export type CreateMatchMutationResult = Apollo.MutationResult<CreateMatchMutation>;
export type CreateMatchMutationOptions = Apollo.BaseMutationOptions<CreateMatchMutation, CreateMatchMutationVariables>;
export const UpdateMatchDocument = gql`
    mutation UpdateMatch($id: String!, $data: UpdateMatchInput!) {
  updateMatch(id: $id, data: $data) {
    id
    date
    home
    scored
    conceeded
    active
    competitionId
    seasonId
    opponentId
  }
}
    `;
export type UpdateMatchMutationFn = Apollo.MutationFunction<UpdateMatchMutation, UpdateMatchMutationVariables>;

/**
 * __useUpdateMatchMutation__
 *
 * To run a mutation, you first call `useUpdateMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMatchMutation, { data, loading, error }] = useUpdateMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMatchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMatchMutation, UpdateMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMatchMutation, UpdateMatchMutationVariables>(UpdateMatchDocument, options);
      }
export type UpdateMatchMutationHookResult = ReturnType<typeof useUpdateMatchMutation>;
export type UpdateMatchMutationResult = Apollo.MutationResult<UpdateMatchMutation>;
export type UpdateMatchMutationOptions = Apollo.BaseMutationOptions<UpdateMatchMutation, UpdateMatchMutationVariables>;
export const GetAllPlayersDocument = gql`
    query GetAllPlayers {
  players {
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

/**
 * __useGetAllPlayersQuery__
 *
 * To run a query within a React component, call `useGetAllPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPlayersQuery, GetAllPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPlayersQuery, GetAllPlayersQueryVariables>(GetAllPlayersDocument, options);
      }
export function useGetAllPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPlayersQuery, GetAllPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPlayersQuery, GetAllPlayersQueryVariables>(GetAllPlayersDocument, options);
        }
export type GetAllPlayersQueryHookResult = ReturnType<typeof useGetAllPlayersQuery>;
export type GetAllPlayersLazyQueryHookResult = ReturnType<typeof useGetAllPlayersLazyQuery>;
export type GetAllPlayersQueryResult = Apollo.QueryResult<GetAllPlayersQuery, GetAllPlayersQueryVariables>;
export const UpdatePlayerDocument = gql`
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
export type UpdatePlayerMutationFn = Apollo.MutationFunction<UpdatePlayerMutation, UpdatePlayerMutationVariables>;

/**
 * __useUpdatePlayerMutation__
 *
 * To run a mutation, you first call `useUpdatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlayerMutation, { data, loading, error }] = useUpdatePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlayerMutation, UpdatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlayerMutation, UpdatePlayerMutationVariables>(UpdatePlayerDocument, options);
      }
export type UpdatePlayerMutationHookResult = ReturnType<typeof useUpdatePlayerMutation>;
export type UpdatePlayerMutationResult = Apollo.MutationResult<UpdatePlayerMutation>;
export type UpdatePlayerMutationOptions = Apollo.BaseMutationOptions<UpdatePlayerMutation, UpdatePlayerMutationVariables>;
export const CreatePlayerDocument = gql`
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
export type CreatePlayerMutationFn = Apollo.MutationFunction<CreatePlayerMutation, CreatePlayerMutationVariables>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerMutation, CreatePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument, options);
      }
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<CreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const CreateSeasonDocument = gql`
    mutation CreateSeason($data: CreateSeasonInput!) {
  createSeason(data: $data) {
    id
    startDate
  }
}
    `;
export type CreateSeasonMutationFn = Apollo.MutationFunction<CreateSeasonMutation, CreateSeasonMutationVariables>;

/**
 * __useCreateSeasonMutation__
 *
 * To run a mutation, you first call `useCreateSeasonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSeasonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSeasonMutation, { data, loading, error }] = useCreateSeasonMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSeasonMutation(baseOptions?: Apollo.MutationHookOptions<CreateSeasonMutation, CreateSeasonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSeasonMutation, CreateSeasonMutationVariables>(CreateSeasonDocument, options);
      }
export type CreateSeasonMutationHookResult = ReturnType<typeof useCreateSeasonMutation>;
export type CreateSeasonMutationResult = Apollo.MutationResult<CreateSeasonMutation>;
export type CreateSeasonMutationOptions = Apollo.BaseMutationOptions<CreateSeasonMutation, CreateSeasonMutationVariables>;
export const UpdateSeasonDocument = gql`
    mutation UpdateSeason($id: String!, $data: UpdateSeasonInput!) {
  updateSeason(id: $id, data: $data) {
    id
    startDate
  }
}
    `;
export type UpdateSeasonMutationFn = Apollo.MutationFunction<UpdateSeasonMutation, UpdateSeasonMutationVariables>;

/**
 * __useUpdateSeasonMutation__
 *
 * To run a mutation, you first call `useUpdateSeasonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSeasonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSeasonMutation, { data, loading, error }] = useUpdateSeasonMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSeasonMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSeasonMutation, UpdateSeasonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSeasonMutation, UpdateSeasonMutationVariables>(UpdateSeasonDocument, options);
      }
export type UpdateSeasonMutationHookResult = ReturnType<typeof useUpdateSeasonMutation>;
export type UpdateSeasonMutationResult = Apollo.MutationResult<UpdateSeasonMutation>;
export type UpdateSeasonMutationOptions = Apollo.BaseMutationOptions<UpdateSeasonMutation, UpdateSeasonMutationVariables>;