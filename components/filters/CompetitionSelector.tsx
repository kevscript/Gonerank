import { GetCompetitionsQuery } from "@/graphql/generated/queryTypes";

export type CompetitionSelectorProps = {
  currentCompetitionId: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  competitions: GetCompetitionsQuery["competitions"];
};

const CompetitionSelector = ({
  currentCompetitionId,
  handleChange,
  competitions,
}: CompetitionSelectorProps) => {
  return (
    <select
      className="h-10 px-2 text-sm border-2 border-gray-100 rounded outline-none cursor-pointer dark:border-dark-300 text-marine-600 dark:text-white dark:bg-dark-400"
      value={currentCompetitionId}
      onChange={handleChange}
    >
      <option value="all" className="text-black dark:text-white">
        Toutes compétitions
      </option>
      {competitions.map((comp) => (
        <option
          key={comp.id}
          value={comp.id}
          className="text-black dark:text-white"
        >
          {comp.name}
        </option>
      ))}
    </select>
  );
};

export default CompetitionSelector;
