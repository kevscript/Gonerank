import { render, screen } from "@testing-library/react";
import LatestSeasonTdcRanking, {
  LatestSeasonTdcRankingProps,
} from "@/components/LatestSeasonRanking/LatestSeasonTdcRanking";
import { latestSeasonPlayerStatsMockReturnValue } from "@/mocks/latestSeasonPlayerStats";

describe("LatestSeasonTdcRanking", () => {
  it("renders correctly", () => {
    const props: LatestSeasonTdcRankingProps = {
      stats: latestSeasonPlayerStatsMockReturnValue.stats,
    };

    render(<LatestSeasonTdcRanking {...props} />);

    props.stats &&
      props.stats.forEach((p) => {
        const displayName = screen.getByText(
          `${p.firstName[0]}. ${p.lastName}`
        );
        expect(displayName).toBeInTheDocument();
      });

    const tendencies = screen.getAllByText("2.0");
    expect(tendencies).toHaveLength(3);
  });
});
