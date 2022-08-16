import { render, screen } from "@testing-library/react";
import LatestSeasonAwardRanking, {
  LatestSeasonAwardRankingProps,
} from "@/components/LatestSeasonRanking/LatestSeasonAwardRanking";
import { latestSeasonPlayerStatsMockReturnValue } from "@/mocks/latestSeasonPlayerStats";

describe("LatestSeasonAwardRanking", () => {
  it("renders correctly", () => {
    const props: LatestSeasonAwardRankingProps = {
      stats: latestSeasonPlayerStatsMockReturnValue.stats,
    };

    render(<LatestSeasonAwardRanking {...props} />);

    props.stats &&
      props.stats.forEach((p) => {
        const displayName = screen.getByText(
          `${p.firstName[0]}. ${p.lastName}`
        );
        expect(displayName).toBeInTheDocument();
      });

    const awards = screen.getAllByText("5");
    expect(awards).toHaveLength(3);
  });
});
