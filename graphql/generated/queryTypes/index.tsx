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

export type ClubsWhereInput = {
  abbreviation?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['String']>;
  secondary?: InputMaybe<Scalars['String']>;
};

export type Competition = {
  __typename?: 'Competition';
  abbreviation: Scalars['String'];
  id: Scalars['ID'];
  matches: Array<Match>;
  name: Scalars['String'];
};

export type CompetitionsWhereInput = {
  abbreviation?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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
  archived?: InputMaybe<Scalars['Boolean']>;
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
  rating: Scalars['Float'];
};

export type Match = {
  __typename?: 'Match';
  active: Scalars['Boolean'];
  archived: Scalars['Boolean'];
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
  stats: Array<MatchStats>;
};

export type MatchPlayer = {
  __typename?: 'MatchPlayer';
  id: Scalars['ID'];
  match: Match;
  matchId: Scalars['String'];
  player: Player;
  playerId: Scalars['String'];
};

export type MatchPlayersWhereInput = {
  matchId?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['String']>;
};

export type MatchStats = {
  __typename?: 'MatchStats';
  avgSum: Scalars['Float'];
  firstName: Scalars['String'];
  image: Scalars['String'];
  lastName: Scalars['String'];
  numOfAvg: Scalars['Float'];
  playerId: Scalars['String'];
  tendency: Scalars['Float'];
};

export type MatchesWhereInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  competitionId?: InputMaybe<Scalars['String']>;
  conceeded?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['DateTime']>;
  home?: InputMaybe<Scalars['Boolean']>;
  opponentId?: InputMaybe<Scalars['String']>;
  scored?: InputMaybe<Scalars['Int']>;
  seasonId?: InputMaybe<Scalars['String']>;
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
  toggleMatchArchive: Match;
  toggleMatchStatus: Match;
  updateClub: Club;
  updateCompetition: Competition;
  updateMatch: Match;
  updateMatchPlayers: Array<MatchPlayer>;
  updatePlayer: Player;
  updateSeason: Season;
  updateSeasonPlayers: Array<SeasonPlayer>;
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


export type MutationToggleMatchArchiveArgs = {
  id: Scalars['String'];
};


export type MutationToggleMatchStatusArgs = {
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


export type MutationUpdateSeasonPlayersArgs = {
  playerIds: Array<Scalars['String']>;
  seasonId: Scalars['String'];
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
  seasons: Array<SeasonPlayer>;
};

export type PlayersWhereInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  birthDate?: InputMaybe<Scalars['DateTime']>;
  country?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  club: Club;
  clubs: Array<Club>;
  competition: Competition;
  competitions: Array<Competition>;
  displayMatch: Match;
  match: Match;
  matchPlayer: MatchPlayer;
  matchPlayers: Array<MatchPlayer>;
  matches: Array<Match>;
  player: Player;
  players: Array<Player>;
  rating: Rating;
  ratings: Array<Rating>;
  season: Season;
  seasonPlayer: SeasonPlayer;
  seasonPlayers: Array<SeasonPlayer>;
  seasons: Array<Season>;
  user: User;
  users: Array<User>;
};


export type QueryClubArgs = {
  id: Scalars['String'];
};


export type QueryClubsArgs = {
  where?: InputMaybe<ClubsWhereInput>;
};


export type QueryCompetitionArgs = {
  id: Scalars['String'];
};


export type QueryCompetitionsArgs = {
  where?: InputMaybe<CompetitionsWhereInput>;
};


export type QueryMatchArgs = {
  id: Scalars['String'];
};


export type QueryMatchPlayerArgs = {
  matchId: Scalars['String'];
  playerId: Scalars['String'];
};


export type QueryMatchPlayersArgs = {
  where?: InputMaybe<MatchPlayersWhereInput>;
};


export type QueryMatchesArgs = {
  where?: InputMaybe<MatchesWhereInput>;
};


export type QueryPlayerArgs = {
  id: Scalars['String'];
};


export type QueryPlayersArgs = {
  where?: InputMaybe<PlayersWhereInput>;
};


export type QueryRatingArgs = {
  matchId: Scalars['String'];
  playerId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryRatingsArgs = {
  where?: InputMaybe<RatingsWhereInput>;
};


export type QuerySeasonArgs = {
  id: Scalars['String'];
};


export type QuerySeasonPlayerArgs = {
  playerId: Scalars['String'];
  seasonId: Scalars['String'];
};


export type QuerySeasonPlayersArgs = {
  where?: InputMaybe<SeasonPlayersWhereInput>;
};


export type QuerySeasonsArgs = {
  where?: InputMaybe<SeasonsWhereInput>;
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

export type RatingsWhereInput = {
  matchId?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  matches: Array<Match>;
  players: Array<SeasonPlayer>;
  startDate: Scalars['DateTime'];
};

export type SeasonPlayer = {
  __typename?: 'SeasonPlayer';
  id: Scalars['ID'];
  player: Player;
  playerId: Scalars['String'];
  season: Season;
  seasonId: Scalars['String'];
};

export type SeasonPlayersWhereInput = {
  playerId?: InputMaybe<Scalars['String']>;
  seasonId?: InputMaybe<Scalars['String']>;
};

export type SeasonsWhereInput = {
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
  archived?: InputMaybe<Scalars['Boolean']>;
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

export type GetClubQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetClubQuery = { __typename?: 'Query', club: { __typename?: 'Club', id: string, name: string, abbreviation: string, primary: string, secondary: string } };

export type GetClubsQueryVariables = Exact<{
  where?: InputMaybe<ClubsWhereInput>;
}>;


export type GetClubsQuery = { __typename?: 'Query', clubs: Array<{ __typename?: 'Club', id: string, name: string, abbreviation: string, primary: string, secondary: string }> };

export type CreateClubMutationVariables = Exact<{
  data: CreateClubInput;
}>;


export type CreateClubMutation = { __typename?: 'Mutation', createClub: { __typename?: 'Club', id: string, name: string, abbreviation: string, primary: string, secondary: string } };

export type UpdateClubMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateClubInput;
}>;


export type UpdateClubMutation = { __typename?: 'Mutation', updateClub: { __typename?: 'Club', id: string, name: string, abbreviation: string, primary: string, secondary: string } };

export type DeleteClubMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteClubMutation = { __typename?: 'Mutation', deleteClub: { __typename?: 'Club', id: string, name: string, abbreviation: string, primary: string, secondary: string } };

export type GetCompetitionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCompetitionQuery = { __typename?: 'Query', competition: { __typename?: 'Competition', id: string, name: string, abbreviation: string } };

export type GetCompetitionsQueryVariables = Exact<{
  where?: InputMaybe<CompetitionsWhereInput>;
}>;


export type GetCompetitionsQuery = { __typename?: 'Query', competitions: Array<{ __typename?: 'Competition', id: string, name: string, abbreviation: string }> };

export type CreateCompetitionMutationVariables = Exact<{
  data: CreateCompetitionInput;
}>;


export type CreateCompetitionMutation = { __typename?: 'Mutation', createCompetition: { __typename?: 'Competition', id: string, name: string, abbreviation: string } };

export type UpdateCompetitionMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateCompetitionInput;
}>;


export type UpdateCompetitionMutation = { __typename?: 'Mutation', updateCompetition: { __typename?: 'Competition', id: string, name: string, abbreviation: string } };

export type DeleteCompetitionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCompetitionMutation = { __typename?: 'Mutation', deleteCompetition: { __typename?: 'Competition', id: string, name: string, abbreviation: string } };

export type GetMatchQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetMatchQuery = { __typename?: 'Query', match: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, archived: boolean, competitionId: string, seasonId: string, opponentId: string, players: Array<{ __typename?: 'MatchPlayer', id: string, playerId: string }> } };

export type GetMatchesQueryVariables = Exact<{
  where?: InputMaybe<MatchesWhereInput>;
}>;


export type GetMatchesQuery = { __typename?: 'Query', matches: Array<{ __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, archived: boolean, competitionId: string, seasonId: string, opponentId: string, players: Array<{ __typename?: 'MatchPlayer', id: string, playerId: string }> }> };

export type CreateMatchMutationVariables = Exact<{
  data: CreateMatchInput;
}>;


export type CreateMatchMutation = { __typename?: 'Mutation', createMatch: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, archived: boolean, competitionId: string, seasonId: string, opponentId: string, players: Array<{ __typename?: 'MatchPlayer', id: string, playerId: string }> } };

export type UpdateMatchMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateMatchInput;
}>;


export type UpdateMatchMutation = { __typename?: 'Mutation', updateMatch: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, archived: boolean, competitionId: string, seasonId: string, opponentId: string } };

export type ToggleMatchStatusMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ToggleMatchStatusMutation = { __typename?: 'Mutation', toggleMatchStatus: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, archived: boolean, competitionId: string, seasonId: string, opponentId: string } };

export type ToggleMatchArchiveMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ToggleMatchArchiveMutation = { __typename?: 'Mutation', toggleMatchArchive: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, archived: boolean, competitionId: string, seasonId: string, opponentId: string } };

export type DeleteMatchMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMatchMutation = { __typename?: 'Mutation', deleteMatch: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, archived: boolean, competitionId: string, seasonId: string, opponentId: string } };

export type UpdateMatchPlayersMutationVariables = Exact<{
  matchId: Scalars['String'];
  playerIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateMatchPlayersMutation = { __typename?: 'Mutation', updateMatchPlayers: Array<{ __typename?: 'MatchPlayer', id: string, matchId: string, playerId: string }> };

export type GetDisplayMatchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDisplayMatchQuery = { __typename?: 'Query', displayMatch: { __typename?: 'Match', id: string, date: any, home: boolean, scored: number, conceeded: number, active: boolean, archived: boolean, competition: { __typename?: 'Competition', id: string, name: string, abbreviation: string }, season: { __typename?: 'Season', id: string, startDate: any }, opponent: { __typename?: 'Club', name: string, abbreviation: string, primary: string, secondary: string }, stats: Array<{ __typename?: 'MatchStats', playerId: string, firstName: string, lastName: string, image: string, avgSum: number, numOfAvg: number, tendency: number }> } };

export type GetPlayerQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPlayerQuery = { __typename?: 'Query', player: { __typename?: 'Player', id: string, firstName: string, lastName: string, birthDate: any, country: string, countryCode: string, image: string, active: boolean } };

export type GetPlayersQueryVariables = Exact<{
  where?: InputMaybe<PlayersWhereInput>;
}>;


export type GetPlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: string, firstName: string, lastName: string, birthDate: any, country: string, countryCode: string, image: string, active: boolean }> };

export type UpdatePlayerMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdatePlayerInput;
}>;


export type UpdatePlayerMutation = { __typename?: 'Mutation', updatePlayer: { __typename?: 'Player', id: string, firstName: string, lastName: string, birthDate: any, country: string, countryCode: string, image: string, active: boolean } };

export type CreatePlayerMutationVariables = Exact<{
  data: CreatePlayerInput;
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer: { __typename?: 'Player', id: string, firstName: string, lastName: string, birthDate: any, country: string, countryCode: string, image: string, active: boolean } };

export type DeletePlayerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePlayerMutation = { __typename?: 'Mutation', deletePlayer: { __typename?: 'Player', id: string, firstName: string, lastName: string, birthDate: any, country: string, countryCode: string, image: string, active: boolean } };

export type GetRatingsQueryVariables = Exact<{
  where?: InputMaybe<RatingsWhereInput>;
}>;


export type GetRatingsQuery = { __typename?: 'Query', ratings: Array<{ __typename?: 'Rating', id: string, matchId: string, playerId: string, rating: number }> };

export type CreateUserRatingsMutationVariables = Exact<{
  userId: Scalars['String'];
  matchId: Scalars['String'];
  ratings: Array<CreateUserRatingsInput> | CreateUserRatingsInput;
}>;


export type CreateUserRatingsMutation = { __typename?: 'Mutation', createUserRatings: Array<{ __typename?: 'Rating', id: string, rating: number, userId: string, matchId: string }> };

export type GetSeasonQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSeasonQuery = { __typename?: 'Query', season: { __typename?: 'Season', id: string, startDate: any, players: Array<{ __typename?: 'SeasonPlayer', id: string, playerId: string }> } };

export type GetSeasonsQueryVariables = Exact<{
  where?: InputMaybe<SeasonsWhereInput>;
}>;


export type GetSeasonsQuery = { __typename?: 'Query', seasons: Array<{ __typename?: 'Season', id: string, startDate: any }> };

export type CreateSeasonMutationVariables = Exact<{
  data: CreateSeasonInput;
}>;


export type CreateSeasonMutation = { __typename?: 'Mutation', createSeason: { __typename?: 'Season', id: string, startDate: any } };

export type UpdateSeasonMutationVariables = Exact<{
  id: Scalars['String'];
  data: UpdateSeasonInput;
}>;


export type UpdateSeasonMutation = { __typename?: 'Mutation', updateSeason: { __typename?: 'Season', id: string, startDate: any } };

export type DeleteSeasonMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteSeasonMutation = { __typename?: 'Mutation', deleteSeason: { __typename?: 'Season', id: string, startDate: any } };

export type UpdateSeasonPlayersMutationVariables = Exact<{
  seasonId: Scalars['String'];
  playerIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateSeasonPlayersMutation = { __typename?: 'Mutation', updateSeasonPlayers: Array<{ __typename?: 'SeasonPlayer', id: string, seasonId: string, playerId: string }> };

export type GetSeasonPlayersQueryVariables = Exact<{
  where?: InputMaybe<SeasonPlayersWhereInput>;
}>;


export type GetSeasonPlayersQuery = { __typename?: 'Query', seasonPlayers: Array<{ __typename?: 'SeasonPlayer', id: string, player: { __typename?: 'Player', id: string, firstName: string, lastName: string } }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, role: Role, name?: string | null, email?: string | null, image?: string | null }> };


export const GetClubDocument = gql`
    query GetClub($id: String!) {
  club(id: $id) {
    id
    name
    abbreviation
    primary
    secondary
  }
}
    `;

/**
 * __useGetClubQuery__
 *
 * To run a query within a React component, call `useGetClubQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClubQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClubQuery(baseOptions: Apollo.QueryHookOptions<GetClubQuery, GetClubQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClubQuery, GetClubQueryVariables>(GetClubDocument, options);
      }
export function useGetClubLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClubQuery, GetClubQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClubQuery, GetClubQueryVariables>(GetClubDocument, options);
        }
export type GetClubQueryHookResult = ReturnType<typeof useGetClubQuery>;
export type GetClubLazyQueryHookResult = ReturnType<typeof useGetClubLazyQuery>;
export type GetClubQueryResult = Apollo.QueryResult<GetClubQuery, GetClubQueryVariables>;
export const GetClubsDocument = gql`
    query GetClubs($where: ClubsWhereInput) {
  clubs(where: $where) {
    id
    name
    abbreviation
    primary
    secondary
  }
}
    `;

/**
 * __useGetClubsQuery__
 *
 * To run a query within a React component, call `useGetClubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClubsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetClubsQuery(baseOptions?: Apollo.QueryHookOptions<GetClubsQuery, GetClubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClubsQuery, GetClubsQueryVariables>(GetClubsDocument, options);
      }
export function useGetClubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClubsQuery, GetClubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClubsQuery, GetClubsQueryVariables>(GetClubsDocument, options);
        }
export type GetClubsQueryHookResult = ReturnType<typeof useGetClubsQuery>;
export type GetClubsLazyQueryHookResult = ReturnType<typeof useGetClubsLazyQuery>;
export type GetClubsQueryResult = Apollo.QueryResult<GetClubsQuery, GetClubsQueryVariables>;
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
export const DeleteClubDocument = gql`
    mutation DeleteClub($id: String!) {
  deleteClub(id: $id) {
    id
    name
    abbreviation
    primary
    secondary
  }
}
    `;
export type DeleteClubMutationFn = Apollo.MutationFunction<DeleteClubMutation, DeleteClubMutationVariables>;

/**
 * __useDeleteClubMutation__
 *
 * To run a mutation, you first call `useDeleteClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClubMutation, { data, loading, error }] = useDeleteClubMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClubMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClubMutation, DeleteClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClubMutation, DeleteClubMutationVariables>(DeleteClubDocument, options);
      }
export type DeleteClubMutationHookResult = ReturnType<typeof useDeleteClubMutation>;
export type DeleteClubMutationResult = Apollo.MutationResult<DeleteClubMutation>;
export type DeleteClubMutationOptions = Apollo.BaseMutationOptions<DeleteClubMutation, DeleteClubMutationVariables>;
export const GetCompetitionDocument = gql`
    query GetCompetition($id: String!) {
  competition(id: $id) {
    id
    name
    abbreviation
  }
}
    `;

/**
 * __useGetCompetitionQuery__
 *
 * To run a query within a React component, call `useGetCompetitionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCompetitionQuery(baseOptions: Apollo.QueryHookOptions<GetCompetitionQuery, GetCompetitionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompetitionQuery, GetCompetitionQueryVariables>(GetCompetitionDocument, options);
      }
export function useGetCompetitionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionQuery, GetCompetitionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompetitionQuery, GetCompetitionQueryVariables>(GetCompetitionDocument, options);
        }
export type GetCompetitionQueryHookResult = ReturnType<typeof useGetCompetitionQuery>;
export type GetCompetitionLazyQueryHookResult = ReturnType<typeof useGetCompetitionLazyQuery>;
export type GetCompetitionQueryResult = Apollo.QueryResult<GetCompetitionQuery, GetCompetitionQueryVariables>;
export const GetCompetitionsDocument = gql`
    query GetCompetitions($where: CompetitionsWhereInput) {
  competitions(where: $where) {
    id
    name
    abbreviation
  }
}
    `;

/**
 * __useGetCompetitionsQuery__
 *
 * To run a query within a React component, call `useGetCompetitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompetitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompetitionsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCompetitionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCompetitionsQuery, GetCompetitionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompetitionsQuery, GetCompetitionsQueryVariables>(GetCompetitionsDocument, options);
      }
export function useGetCompetitionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompetitionsQuery, GetCompetitionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompetitionsQuery, GetCompetitionsQueryVariables>(GetCompetitionsDocument, options);
        }
export type GetCompetitionsQueryHookResult = ReturnType<typeof useGetCompetitionsQuery>;
export type GetCompetitionsLazyQueryHookResult = ReturnType<typeof useGetCompetitionsLazyQuery>;
export type GetCompetitionsQueryResult = Apollo.QueryResult<GetCompetitionsQuery, GetCompetitionsQueryVariables>;
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
export const DeleteCompetitionDocument = gql`
    mutation DeleteCompetition($id: String!) {
  deleteCompetition(id: $id) {
    id
    name
    abbreviation
  }
}
    `;
export type DeleteCompetitionMutationFn = Apollo.MutationFunction<DeleteCompetitionMutation, DeleteCompetitionMutationVariables>;

/**
 * __useDeleteCompetitionMutation__
 *
 * To run a mutation, you first call `useDeleteCompetitionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCompetitionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCompetitionMutation, { data, loading, error }] = useDeleteCompetitionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCompetitionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCompetitionMutation, DeleteCompetitionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCompetitionMutation, DeleteCompetitionMutationVariables>(DeleteCompetitionDocument, options);
      }
export type DeleteCompetitionMutationHookResult = ReturnType<typeof useDeleteCompetitionMutation>;
export type DeleteCompetitionMutationResult = Apollo.MutationResult<DeleteCompetitionMutation>;
export type DeleteCompetitionMutationOptions = Apollo.BaseMutationOptions<DeleteCompetitionMutation, DeleteCompetitionMutationVariables>;
export const GetMatchDocument = gql`
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

/**
 * __useGetMatchQuery__
 *
 * To run a query within a React component, call `useGetMatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMatchQuery(baseOptions: Apollo.QueryHookOptions<GetMatchQuery, GetMatchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchQuery, GetMatchQueryVariables>(GetMatchDocument, options);
      }
export function useGetMatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchQuery, GetMatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchQuery, GetMatchQueryVariables>(GetMatchDocument, options);
        }
export type GetMatchQueryHookResult = ReturnType<typeof useGetMatchQuery>;
export type GetMatchLazyQueryHookResult = ReturnType<typeof useGetMatchLazyQuery>;
export type GetMatchQueryResult = Apollo.QueryResult<GetMatchQuery, GetMatchQueryVariables>;
export const GetMatchesDocument = gql`
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

/**
 * __useGetMatchesQuery__
 *
 * To run a query within a React component, call `useGetMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMatchesQuery(baseOptions?: Apollo.QueryHookOptions<GetMatchesQuery, GetMatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchesQuery, GetMatchesQueryVariables>(GetMatchesDocument, options);
      }
export function useGetMatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchesQuery, GetMatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchesQuery, GetMatchesQueryVariables>(GetMatchesDocument, options);
        }
export type GetMatchesQueryHookResult = ReturnType<typeof useGetMatchesQuery>;
export type GetMatchesLazyQueryHookResult = ReturnType<typeof useGetMatchesLazyQuery>;
export type GetMatchesQueryResult = Apollo.QueryResult<GetMatchesQuery, GetMatchesQueryVariables>;
export const CreateMatchDocument = gql`
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
    archived
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
export const ToggleMatchStatusDocument = gql`
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
export type ToggleMatchStatusMutationFn = Apollo.MutationFunction<ToggleMatchStatusMutation, ToggleMatchStatusMutationVariables>;

/**
 * __useToggleMatchStatusMutation__
 *
 * To run a mutation, you first call `useToggleMatchStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleMatchStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleMatchStatusMutation, { data, loading, error }] = useToggleMatchStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleMatchStatusMutation(baseOptions?: Apollo.MutationHookOptions<ToggleMatchStatusMutation, ToggleMatchStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleMatchStatusMutation, ToggleMatchStatusMutationVariables>(ToggleMatchStatusDocument, options);
      }
export type ToggleMatchStatusMutationHookResult = ReturnType<typeof useToggleMatchStatusMutation>;
export type ToggleMatchStatusMutationResult = Apollo.MutationResult<ToggleMatchStatusMutation>;
export type ToggleMatchStatusMutationOptions = Apollo.BaseMutationOptions<ToggleMatchStatusMutation, ToggleMatchStatusMutationVariables>;
export const ToggleMatchArchiveDocument = gql`
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
export type ToggleMatchArchiveMutationFn = Apollo.MutationFunction<ToggleMatchArchiveMutation, ToggleMatchArchiveMutationVariables>;

/**
 * __useToggleMatchArchiveMutation__
 *
 * To run a mutation, you first call `useToggleMatchArchiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleMatchArchiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleMatchArchiveMutation, { data, loading, error }] = useToggleMatchArchiveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleMatchArchiveMutation(baseOptions?: Apollo.MutationHookOptions<ToggleMatchArchiveMutation, ToggleMatchArchiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleMatchArchiveMutation, ToggleMatchArchiveMutationVariables>(ToggleMatchArchiveDocument, options);
      }
export type ToggleMatchArchiveMutationHookResult = ReturnType<typeof useToggleMatchArchiveMutation>;
export type ToggleMatchArchiveMutationResult = Apollo.MutationResult<ToggleMatchArchiveMutation>;
export type ToggleMatchArchiveMutationOptions = Apollo.BaseMutationOptions<ToggleMatchArchiveMutation, ToggleMatchArchiveMutationVariables>;
export const DeleteMatchDocument = gql`
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
export type DeleteMatchMutationFn = Apollo.MutationFunction<DeleteMatchMutation, DeleteMatchMutationVariables>;

/**
 * __useDeleteMatchMutation__
 *
 * To run a mutation, you first call `useDeleteMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMatchMutation, { data, loading, error }] = useDeleteMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMatchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMatchMutation, DeleteMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMatchMutation, DeleteMatchMutationVariables>(DeleteMatchDocument, options);
      }
export type DeleteMatchMutationHookResult = ReturnType<typeof useDeleteMatchMutation>;
export type DeleteMatchMutationResult = Apollo.MutationResult<DeleteMatchMutation>;
export type DeleteMatchMutationOptions = Apollo.BaseMutationOptions<DeleteMatchMutation, DeleteMatchMutationVariables>;
export const UpdateMatchPlayersDocument = gql`
    mutation UpdateMatchPlayers($matchId: String!, $playerIds: [String!]!) {
  updateMatchPlayers(matchId: $matchId, playerIds: $playerIds) {
    id
    matchId
    playerId
  }
}
    `;
export type UpdateMatchPlayersMutationFn = Apollo.MutationFunction<UpdateMatchPlayersMutation, UpdateMatchPlayersMutationVariables>;

/**
 * __useUpdateMatchPlayersMutation__
 *
 * To run a mutation, you first call `useUpdateMatchPlayersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMatchPlayersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMatchPlayersMutation, { data, loading, error }] = useUpdateMatchPlayersMutation({
 *   variables: {
 *      matchId: // value for 'matchId'
 *      playerIds: // value for 'playerIds'
 *   },
 * });
 */
export function useUpdateMatchPlayersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMatchPlayersMutation, UpdateMatchPlayersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMatchPlayersMutation, UpdateMatchPlayersMutationVariables>(UpdateMatchPlayersDocument, options);
      }
export type UpdateMatchPlayersMutationHookResult = ReturnType<typeof useUpdateMatchPlayersMutation>;
export type UpdateMatchPlayersMutationResult = Apollo.MutationResult<UpdateMatchPlayersMutation>;
export type UpdateMatchPlayersMutationOptions = Apollo.BaseMutationOptions<UpdateMatchPlayersMutation, UpdateMatchPlayersMutationVariables>;
export const GetDisplayMatchDocument = gql`
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

/**
 * __useGetDisplayMatchQuery__
 *
 * To run a query within a React component, call `useGetDisplayMatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDisplayMatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDisplayMatchQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDisplayMatchQuery(baseOptions?: Apollo.QueryHookOptions<GetDisplayMatchQuery, GetDisplayMatchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDisplayMatchQuery, GetDisplayMatchQueryVariables>(GetDisplayMatchDocument, options);
      }
export function useGetDisplayMatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDisplayMatchQuery, GetDisplayMatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDisplayMatchQuery, GetDisplayMatchQueryVariables>(GetDisplayMatchDocument, options);
        }
export type GetDisplayMatchQueryHookResult = ReturnType<typeof useGetDisplayMatchQuery>;
export type GetDisplayMatchLazyQueryHookResult = ReturnType<typeof useGetDisplayMatchLazyQuery>;
export type GetDisplayMatchQueryResult = Apollo.QueryResult<GetDisplayMatchQuery, GetDisplayMatchQueryVariables>;
export const GetPlayerDocument = gql`
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

/**
 * __useGetPlayerQuery__
 *
 * To run a query within a React component, call `useGetPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlayerQuery(baseOptions: Apollo.QueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
      }
export function useGetPlayerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayerQuery, GetPlayerQueryVariables>(GetPlayerDocument, options);
        }
export type GetPlayerQueryHookResult = ReturnType<typeof useGetPlayerQuery>;
export type GetPlayerLazyQueryHookResult = ReturnType<typeof useGetPlayerLazyQuery>;
export type GetPlayerQueryResult = Apollo.QueryResult<GetPlayerQuery, GetPlayerQueryVariables>;
export const GetPlayersDocument = gql`
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

/**
 * __useGetPlayersQuery__
 *
 * To run a query within a React component, call `useGetPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
      }
export function useGetPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
        }
export type GetPlayersQueryHookResult = ReturnType<typeof useGetPlayersQuery>;
export type GetPlayersLazyQueryHookResult = ReturnType<typeof useGetPlayersLazyQuery>;
export type GetPlayersQueryResult = Apollo.QueryResult<GetPlayersQuery, GetPlayersQueryVariables>;
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
export const DeletePlayerDocument = gql`
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
export type DeletePlayerMutationFn = Apollo.MutationFunction<DeletePlayerMutation, DeletePlayerMutationVariables>;

/**
 * __useDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlayerMutation, { data, loading, error }] = useDeletePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlayerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlayerMutation, DeletePlayerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlayerMutation, DeletePlayerMutationVariables>(DeletePlayerDocument, options);
      }
export type DeletePlayerMutationHookResult = ReturnType<typeof useDeletePlayerMutation>;
export type DeletePlayerMutationResult = Apollo.MutationResult<DeletePlayerMutation>;
export type DeletePlayerMutationOptions = Apollo.BaseMutationOptions<DeletePlayerMutation, DeletePlayerMutationVariables>;
export const GetRatingsDocument = gql`
    query GetRatings($where: RatingsWhereInput) {
  ratings(where: $where) {
    id
    matchId
    playerId
    rating
  }
}
    `;

/**
 * __useGetRatingsQuery__
 *
 * To run a query within a React component, call `useGetRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetRatingsQuery(baseOptions?: Apollo.QueryHookOptions<GetRatingsQuery, GetRatingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRatingsQuery, GetRatingsQueryVariables>(GetRatingsDocument, options);
      }
export function useGetRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRatingsQuery, GetRatingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRatingsQuery, GetRatingsQueryVariables>(GetRatingsDocument, options);
        }
export type GetRatingsQueryHookResult = ReturnType<typeof useGetRatingsQuery>;
export type GetRatingsLazyQueryHookResult = ReturnType<typeof useGetRatingsLazyQuery>;
export type GetRatingsQueryResult = Apollo.QueryResult<GetRatingsQuery, GetRatingsQueryVariables>;
export const CreateUserRatingsDocument = gql`
    mutation CreateUserRatings($userId: String!, $matchId: String!, $ratings: [CreateUserRatingsInput!]!) {
  createUserRatings(userId: $userId, matchId: $matchId, ratings: $ratings) {
    id
    rating
    userId
    matchId
  }
}
    `;
export type CreateUserRatingsMutationFn = Apollo.MutationFunction<CreateUserRatingsMutation, CreateUserRatingsMutationVariables>;

/**
 * __useCreateUserRatingsMutation__
 *
 * To run a mutation, you first call `useCreateUserRatingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserRatingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserRatingsMutation, { data, loading, error }] = useCreateUserRatingsMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      matchId: // value for 'matchId'
 *      ratings: // value for 'ratings'
 *   },
 * });
 */
export function useCreateUserRatingsMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserRatingsMutation, CreateUserRatingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserRatingsMutation, CreateUserRatingsMutationVariables>(CreateUserRatingsDocument, options);
      }
export type CreateUserRatingsMutationHookResult = ReturnType<typeof useCreateUserRatingsMutation>;
export type CreateUserRatingsMutationResult = Apollo.MutationResult<CreateUserRatingsMutation>;
export type CreateUserRatingsMutationOptions = Apollo.BaseMutationOptions<CreateUserRatingsMutation, CreateUserRatingsMutationVariables>;
export const GetSeasonDocument = gql`
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

/**
 * __useGetSeasonQuery__
 *
 * To run a query within a React component, call `useGetSeasonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeasonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeasonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSeasonQuery(baseOptions: Apollo.QueryHookOptions<GetSeasonQuery, GetSeasonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeasonQuery, GetSeasonQueryVariables>(GetSeasonDocument, options);
      }
export function useGetSeasonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeasonQuery, GetSeasonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeasonQuery, GetSeasonQueryVariables>(GetSeasonDocument, options);
        }
export type GetSeasonQueryHookResult = ReturnType<typeof useGetSeasonQuery>;
export type GetSeasonLazyQueryHookResult = ReturnType<typeof useGetSeasonLazyQuery>;
export type GetSeasonQueryResult = Apollo.QueryResult<GetSeasonQuery, GetSeasonQueryVariables>;
export const GetSeasonsDocument = gql`
    query GetSeasons($where: SeasonsWhereInput) {
  seasons(where: $where) {
    id
    startDate
  }
}
    `;

/**
 * __useGetSeasonsQuery__
 *
 * To run a query within a React component, call `useGetSeasonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeasonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeasonsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetSeasonsQuery(baseOptions?: Apollo.QueryHookOptions<GetSeasonsQuery, GetSeasonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeasonsQuery, GetSeasonsQueryVariables>(GetSeasonsDocument, options);
      }
export function useGetSeasonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeasonsQuery, GetSeasonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeasonsQuery, GetSeasonsQueryVariables>(GetSeasonsDocument, options);
        }
export type GetSeasonsQueryHookResult = ReturnType<typeof useGetSeasonsQuery>;
export type GetSeasonsLazyQueryHookResult = ReturnType<typeof useGetSeasonsLazyQuery>;
export type GetSeasonsQueryResult = Apollo.QueryResult<GetSeasonsQuery, GetSeasonsQueryVariables>;
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
export const DeleteSeasonDocument = gql`
    mutation DeleteSeason($id: String!) {
  deleteSeason(id: $id) {
    id
    startDate
  }
}
    `;
export type DeleteSeasonMutationFn = Apollo.MutationFunction<DeleteSeasonMutation, DeleteSeasonMutationVariables>;

/**
 * __useDeleteSeasonMutation__
 *
 * To run a mutation, you first call `useDeleteSeasonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSeasonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSeasonMutation, { data, loading, error }] = useDeleteSeasonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSeasonMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSeasonMutation, DeleteSeasonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSeasonMutation, DeleteSeasonMutationVariables>(DeleteSeasonDocument, options);
      }
export type DeleteSeasonMutationHookResult = ReturnType<typeof useDeleteSeasonMutation>;
export type DeleteSeasonMutationResult = Apollo.MutationResult<DeleteSeasonMutation>;
export type DeleteSeasonMutationOptions = Apollo.BaseMutationOptions<DeleteSeasonMutation, DeleteSeasonMutationVariables>;
export const UpdateSeasonPlayersDocument = gql`
    mutation UpdateSeasonPlayers($seasonId: String!, $playerIds: [String!]!) {
  updateSeasonPlayers(seasonId: $seasonId, playerIds: $playerIds) {
    id
    seasonId
    playerId
  }
}
    `;
export type UpdateSeasonPlayersMutationFn = Apollo.MutationFunction<UpdateSeasonPlayersMutation, UpdateSeasonPlayersMutationVariables>;

/**
 * __useUpdateSeasonPlayersMutation__
 *
 * To run a mutation, you first call `useUpdateSeasonPlayersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSeasonPlayersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSeasonPlayersMutation, { data, loading, error }] = useUpdateSeasonPlayersMutation({
 *   variables: {
 *      seasonId: // value for 'seasonId'
 *      playerIds: // value for 'playerIds'
 *   },
 * });
 */
export function useUpdateSeasonPlayersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSeasonPlayersMutation, UpdateSeasonPlayersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSeasonPlayersMutation, UpdateSeasonPlayersMutationVariables>(UpdateSeasonPlayersDocument, options);
      }
export type UpdateSeasonPlayersMutationHookResult = ReturnType<typeof useUpdateSeasonPlayersMutation>;
export type UpdateSeasonPlayersMutationResult = Apollo.MutationResult<UpdateSeasonPlayersMutation>;
export type UpdateSeasonPlayersMutationOptions = Apollo.BaseMutationOptions<UpdateSeasonPlayersMutation, UpdateSeasonPlayersMutationVariables>;
export const GetSeasonPlayersDocument = gql`
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

/**
 * __useGetSeasonPlayersQuery__
 *
 * To run a query within a React component, call `useGetSeasonPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeasonPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeasonPlayersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetSeasonPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetSeasonPlayersQuery, GetSeasonPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeasonPlayersQuery, GetSeasonPlayersQueryVariables>(GetSeasonPlayersDocument, options);
      }
export function useGetSeasonPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeasonPlayersQuery, GetSeasonPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeasonPlayersQuery, GetSeasonPlayersQueryVariables>(GetSeasonPlayersDocument, options);
        }
export type GetSeasonPlayersQueryHookResult = ReturnType<typeof useGetSeasonPlayersQuery>;
export type GetSeasonPlayersLazyQueryHookResult = ReturnType<typeof useGetSeasonPlayersLazyQuery>;
export type GetSeasonPlayersQueryResult = Apollo.QueryResult<GetSeasonPlayersQuery, GetSeasonPlayersQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    role
    name
    email
    image
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;