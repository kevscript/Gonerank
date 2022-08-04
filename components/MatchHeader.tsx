import { GetDisplayMatchQuery } from "graphql/generated/queryTypes";
import ClubIcon from "./Icons/Club";
import LyonIcon from "./Icons/Lyon";

export type MatchHeaderProps = {
  match: GetDisplayMatchQuery["displayMatch"];
};

const MatchHeader = ({ match }: MatchHeaderProps) => {
  return (
    <div
      className={`w-full bg-white border border-gray-100 lg:border-none lg:drop-shadow-sm rounded flex justify-between py-4 px-8 ${
        !match?.home && "flex-row-reverse"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <LyonIcon className="w-12 h-12" />
        <span className="mt-1 font-bold">OL</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs lg:text-base">{match?.competition.name}</span>
        <div
          className={`flex items-center text-xl lg:text-3xl font-num font-black ${
            !match?.home && "flex-row-reverse"
          }`}
        >
          <span>{match?.scored}</span>
          <span className="lg:mx-2">:</span>
          <span>{match?.conceeded}</span>
        </div>
        <span className="text-xs lg:text-base font-num">
          {new Date(match?.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <ClubIcon
          className="w-12 h-12"
          primary={match?.opponent.primary || "#333"}
          secondary={match?.opponent.secondary || "#444"}
        />
        <span className="mt-1 font-bold" title={match?.opponent.name}>
          {match?.opponent.abbreviation}
        </span>
      </div>
    </div>
  );
};

export default MatchHeader;
