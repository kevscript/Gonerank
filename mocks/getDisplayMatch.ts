import { GetDisplayMatchQuery } from "graphql/generated/queryTypes";

export const getDisplayMatchMockReturnValue: GetDisplayMatchQuery = {
  displayMatch: {
    active: true,
    archived: false,
    competition: { abbreviation: "L1", id: "1", name: "Ligue 1" },
    conceeded: 2,
    scored: 3,
    date: "2022-05-15T12:00:00Z",
    home: false,
    id: "1",
    opponent: {
      abbreviation: "PSG",
      name: "Paris",
      primary: "#ffffff",
      secondary: "#000000",
      logo: "psg",
    },
    season: {
      id: "1",
      startDate: "2022-05-10T12:00:00Z",
    },
    stats: [
      {
        playerId: "1",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "A",
        lastName: "A",
        image: "A.png",
      },
      {
        playerId: "2",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "B",
        lastName: "B",
        image: "B.png",
      },
      {
        playerId: "3",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "C",
        lastName: "C",
        image: "C.png",
      },
      {
        playerId: "4",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "D",
        lastName: "D",
        image: "D.png",
      },
      {
        playerId: "5",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "E",
        lastName: "E",
        image: "E.png",
      },
      {
        playerId: "6",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "F",
        lastName: "F",
        image: "F.png",
      },
      {
        playerId: "7",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "G",
        lastName: "G",
        image: "G.png",
      },
      {
        playerId: "8",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "H",
        lastName: "H",
        image: "H.png",
      },
      {
        playerId: "9",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "I",
        lastName: "I",
        image: "I.png",
      },
      {
        playerId: "10",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "J",
        lastName: "J",
        image: "J.png",
      },
      {
        playerId: "11",
        avgSum: 7,
        numOfAvg: 1,
        tendency: 2,
        positiveTendency: 2,
        negativeTendency: 0,
        firstName: "K",
        lastName: "K",
        image: "K.png",
      },
    ],
  },
};
