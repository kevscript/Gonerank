import { ApolloError } from "@apollo/client";

function MatchDisplayError({ error }: { error: ApolloError }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-center w-full p-4 bg-gray-300 rounded dark:bg-slate-900">
        <p className="text-sm font-normal text-center text-gray-600 dark:text-white">
          {error.message}
        </p>
      </div>
    </div>
  );
}

export default MatchDisplayError;
