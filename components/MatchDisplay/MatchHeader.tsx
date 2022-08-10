import { GetDisplayMatchQuery } from "graphql/generated/queryTypes";
import ClubIcon from "../Icons/Club";
import LyonIcon from "../Icons/Lyon";

export type MatchHeaderProps = {
  match: GetDisplayMatchQuery["displayMatch"];
};

const MatchHeader = ({ match }: MatchHeaderProps) => {
  return (
    <div
      className={`w-full bg-white dark:bg-dark-500 lg:border-none lg:drop-shadow-sm rounded flex justify-between py-4 px-8 ${
        !match?.home && "flex-row-reverse"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center xl:flex-nowrap xl:gap-4 xl:flex-1 ${
          match?.home
            ? "xl:flex-row xl:justify-start"
            : "xl:flex-row-reverse xl:justify-end"
        }`}
      >
        <LyonIcon className="w-12 h-12" />
        <span className="mt-1 font-bold xl:hidden">OL</span>
        <span className="hidden text-lg uppercase xl:inline-block">
          Olympique Lyonnais
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs lg:text-base">{match?.competition.name}</span>
        <div
          className={`flex items-center text-xl lg:text-3xl font-num font-black ${
            !match?.home && "flex-row-reverse"
          }`}
        >
          <span className="dark:text-marine-600">{match?.scored}</span>
          <span className="lg:mx-2 dark:text-marine-600">:</span>
          <span className="dark:text-marine-600">{match?.conceeded}</span>
        </div>
        <span className="text-xs lg:text-base font-num">
          {new Date(match?.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
      </div>
      <div
        className={`flex flex-col items-center justify-center xl:flex-nowrap xl:gap-4 xl:flex-1 ${
          match?.home
            ? "xl:flex-row-reverse xl:justify-start"
            : "xl:flex-row xl:justify-end"
        }`}
        title={match?.opponent.name}
      >
        <ClubIcon
          className="w-12 h-12"
          primary={match?.opponent.primary || "#333"}
          secondary={match?.opponent.secondary || "#444"}
        />
        <span className="mt-1 font-bold xl:hidden" title={match?.opponent.name}>
          {match?.opponent.abbreviation}
        </span>
        <span className="hidden text-lg uppercase xl:inline-block">
          {match?.opponent.name}
        </span>
      </div>
    </div>
  );
};

export default MatchHeader;
