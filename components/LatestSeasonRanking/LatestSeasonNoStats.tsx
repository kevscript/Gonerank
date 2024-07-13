function LatestSeasonNoStats() {
  return (
    <div className="flex justify-center w-full h-full p-2 mt-1 bg-white rounded dark:bg-dark-500 drop-shadow-sm">
      <div className="flex items-center justify-center w-full px-2 py-4 rounded-sm dark:bg-dark-300 bg-marine-50 h-fit">
        <span className="text-xs" data-testid="no-stats">
          Pas encore de stats cette saison.
        </span>
      </div>
    </div>
  );
}

export default LatestSeasonNoStats;
