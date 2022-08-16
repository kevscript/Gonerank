import { render, screen } from "@testing-library/react";
import LatestSeasonAvgRanking, {
  LatestSeasonAvgRankingProps,
} from "@/components/LatestSeasonRanking/LatestSeasonAvgRanking";
import { latestSeasonPlayerStatsMockReturnValue } from "@/mocks/latestSeasonPlayerStats";

describe("LatestSeasonAvgRanking", () => {
  it("renders correctly", () => {
    const props: LatestSeasonAvgRankingProps = {
      stats: latestSeasonPlayerStatsMockReturnValue.stats,
    };

    render(<LatestSeasonAvgRanking {...props} />);

    props.stats &&
      props.stats.forEach((p) => {
        const displayName = screen.getByText(
          `${p.firstName[0]}. ${p.lastName}`
        );
        expect(displayName).toBeInTheDocument();
      });

    const averages = screen.getAllByText("7.00");
    expect(averages).toHaveLength(3);
  });
});
