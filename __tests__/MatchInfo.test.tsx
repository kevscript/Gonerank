import { render, screen } from "@testing-library/react";
import MatchInfo, { MatchInfoProps } from "@/components/MatchDisplay/MatchInfo";
import { getDisplayMatchMockReturnValue } from "@/mocks/getDisplayMatch";
import { getRatingsMockReturnValue } from "@/mocks/getRatings";

describe("MatchInfo", () => {
  it("renders correctly with userRatings", () => {
    const props: MatchInfoProps = {
      match: getDisplayMatchMockReturnValue.displayMatch,
      userRatings: getRatingsMockReturnValue.ratings,
    };

    render(<MatchInfo {...props} />);

    const matchStats = getDisplayMatchMockReturnValue.displayMatch?.stats;

    matchStats &&
      matchStats.forEach((p) => {
        const image = screen.getByAltText(`${p.firstName} ${p.lastName}`);
        const displayName = screen.getByText(
          `${p.firstName[0]}. ${p.lastName}`
        );

        expect(displayName).toBeInTheDocument();
        expect(image).toBeInTheDocument();
      });

    const userVotes = screen.getAllByText("7");
    expect(userVotes).toHaveLength(11);

    const communityAverages = screen.getAllByText("7.00");
    expect(communityAverages).toHaveLength(11);
  });

  it("renders correctly without userRatings", () => {
    const props: MatchInfoProps = {
      match: getDisplayMatchMockReturnValue.displayMatch,
    };

    render(<MatchInfo {...props} />);

    const userVotes = screen.queryAllByText("7");
    expect(userVotes).toHaveLength(0);
  });
});
