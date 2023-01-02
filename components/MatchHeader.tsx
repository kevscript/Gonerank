import {
  GetDisplayMatchQuery,
  MatchDataQuery,
} from "graphql/generated/queryTypes";
import ClubIcon from "./Icons/Club";
import LyonIcon from "./Icons/Lyon";

export type MatchHeaderProps = {
  match: GetDisplayMatchQuery["displayMatch"] | MatchDataQuery["match"];
};

const MatchHeader = ({ match }: MatchHeaderProps) => {
  return (
    <div
      className={`w-full lg:border-none lg:drop-shadow-sm rounded flex justify-between gap-x-4 ${
        !match?.home && "flex-row-reverse"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center xl:justify-start xl:flex-nowrap xl:gap-4 xl:flex-1 bg-white dark:bg-dark-500 px-8 flex-1 ${
          match?.home ? "xl:flex-row" : "xl:flex-row-reverse"
        }`}
      >
        <LyonIcon className="w-8 h-8" />
        <span className="mt-1 font-bold xl:hidden">OL</span>
        <span className="hidden text-lg font-bold uppercase xl:inline-block">
          Olympique Lyonnais
        </span>
      </div>
      <div className="flex flex-col items-center justify-center px-8 bg-white h-28 dark:bg-dark-500">
        <span className="text-xs">{match?.competition.name}</span>
        <div
          className={`flex items-center text-xl lg:text-3xl font-num font-black py-1 ${
            !match?.home && "flex-row-reverse"
          } ${
            match?.scored! > match?.conceeded!
              ? "text-marine-500"
              : match?.scored! < match?.conceeded!
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          <span className="" title="buts marqués">
            {match?.scored}
          </span>
          <span className="lg:mx-2">:</span>
          <span className="" title="buts concédés">
            {match?.conceeded}
          </span>
        </div>
        <span className="text-xs font-num">
          {new Date(match?.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
      </div>
      <div
        className={`flex flex-col items-center justify-center xl:justify-start xl:flex-nowrap xl:gap-4 xl:flex-1 bg-white dark:bg-dark-500 px-8 flex-1 ${
          match?.home ? "xl:flex-row-reverse" : "xl:flex-row"
        }`}
        title={match?.opponent.name}
      >
        <ClubIcon
          className="w-8 h-8"
          primary={match?.opponent.primary || "#333"}
          secondary={match?.opponent.secondary || "#444"}
        />
        <span className="mt-1 font-bold xl:hidden" title={match?.opponent.name}>
          {match?.opponent.abbreviation}
        </span>
        <span className="hidden text-lg font-bold uppercase xl:inline-block">
          {match?.opponent.name}
        </span>
      </div>
    </div>
  );
};

export default MatchHeader;
