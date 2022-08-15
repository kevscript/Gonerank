import { signIn } from "next-auth/react";
import TwitterIcon from "../Icons/Twitter";

export type MatchInfoBarProps = {
  archived?: boolean;
  voted?: boolean;
  authenticated?: boolean;
  twitterText?: string;
};

const MatchInfoBar = ({
  archived,
  voted,
  authenticated,
  twitterText,
}: MatchInfoBarProps) => {
  return (
    <>
      {authenticated === false ? (
        <button
          className="flex items-center justify-center w-full h-10 p-4 mt-4 rounded bg-marine-50 dark:bg-marine-900/50 lg:mt-8"
          onClick={() => signIn("twitter")}
        >
          <span className="text-xs font-bold uppercase text-marine-600 dark:text-white">
            Connectez-vous pour voter.
          </span>
          <TwitterIcon className="w-4 h-4 ml-3 fill-marine-600" />
        </button>
      ) : (
        <>
          {archived && (
            <div className="flex items-center justify-center w-full h-10 mt-4 rounded bg-red-50 dark:bg-red-600/10 lg:mt-8">
              <span className="text-xs font-bold text-red-500 dark:text-white first-line:uppercase">
                Les votes sont finis.
              </span>
            </div>
          )}
          {voted && (
            <div className="flex flex-row items-center w-full mt-4 flex-nowrap gap-x-2 lg:gap-x-4 lg:mt-8">
              <div className="flex items-center justify-center flex-1 h-10 rounded bg-marine-50 dark:bg-dark-300">
                <span className="text-xs font-bold uppercase text-marine-600 dark:text-white">
                  Vous avez déjà voté.
                </span>
              </div>
              <a
                href={`https://twitter.com/intent/tweet?via=GoneRank&text=${twitterText}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-20 h-10 text-xs font-bold text-white uppercase rounded bg-marine-600 hover:bg-marine-500"
              >
                Tweeter
              </a>
            </div>
          )}
          {voted === false && (
            <div className="flex items-center justify-center w-full h-10 mt-4 rounded bg-marine-50 dark:bg-dark-300">
              <span className="text-xs font-bold uppercase text-marine-600 dark:text-white">
                Les votes sont ouverts!
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MatchInfoBar;
