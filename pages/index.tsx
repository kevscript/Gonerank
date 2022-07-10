import Head from "next/head";
import TwitterIcon from "../components/Icons/Twitter";
import ClubIcon from "../components/Icons/Club";
import LyonIcon from "../components/Icons/Lyon";
import matchPlayers from "../mocks/matchPlayers";
import { club } from "../mocks/clubs";
import { NextCustomPage } from "./_app";

const HomePage: NextCustomPage = () => {
  return (
    <div className="p-4">
      <Head>
        <title>Gonerank - Home</title>
        <meta name="description" content="Home page for Gonerank app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="w-full bg-white border border-gray-100 rounded flex justify-between py-4 px-8">
          <div className="flex flex-col items-center">
            <LyonIcon className="w-12 h-12" />
            <span className="mt-1 font-bold">OL</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs">Ligue 1</span>
            <span className="text-xl font-num font-black">3 : 2</span>
            <span className="text-xs font-num">01/02/22</span>
          </div>
          <div className="flex flex-col items-center">
            <ClubIcon
              className="w-12 h-12"
              primary={club.primary}
              secondary={club.secondary}
            />
            <span className="mt-1 font-bold" title={club.name}>
              {club.abbreviation}
            </span>
          </div>
        </div>

        <button className="w-full bg-gray-200 mt-4 h-10 rounded flex justify-center items-center">
          <span className="uppercase text-xs font-bold">
            Connectez-vous pour voter
          </span>
          <TwitterIcon className="w-4 h-4 ml-3" />
        </button>

        <ul className="mt-4">
          {matchPlayers &&
            matchPlayers.map((player) => (
              <li
                key={player.id}
                className="w-full h-10 bg-white rounded border border-gray-100 flex items-center justify-between mt-2 first:mt-0"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-300 ml-2"></div>
                  <span className="ml-2 text-sm">M.Caqueret</span>
                </div>
                <div className="flex h-full items-center">
                  <div className="h-full w-6 bg-gray-200 flex justify-center items-center">
                    -
                  </div>
                  <div className="w-10 flex justify-center items-center font-num font-bold">
                    7.5
                  </div>
                  <div className="h-full w-6 bg-gray-200 flex justify-center items-center">
                    +
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <div className="mt-4 flex justify-center">
          <button className="py-2 px-4 bg-gray-200 min-w-[80px] rounded-sm">
            Réinitialiser
          </button>
          <button className="ml-4 py-2 px-4 bg-gray-200 min-w-[80px] rounded-sm">
            Voter
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
