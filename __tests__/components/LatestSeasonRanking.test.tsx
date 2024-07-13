import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LatestSeasonRanking, {
  LatestSeasonRankingProps,
} from "@/components/LatestSeasonRanking/LatestSeasonRanking";
import { GetLatestSeasonQuery } from "graphql/generated/queryTypes";
import { defaultRankingType } from "@/hooks/useRankingType";

const mockSeasonObject: GetLatestSeasonQuery["latestSeason"] = {
  id: "1",
  startDate: "2022-05-15T12:00:00Z",
  playerStats: [
    {
      __typename: "SeasonPlayerStats",
      playerId: "1",
      firstName: "John",
      lastName: "Doe",
      image: "www.image.com",
      matches: [],
    },
  ],
};

const mockNoStatSeasonObject: GetLatestSeasonQuery["latestSeason"] = {
  id: "1",
  startDate: "2022-05-15T12:00:00Z",
  playerStats: [],
};

describe("LatestSeasonRanking", () => {
  it(`init with default ranking type as tendency`, () => {
    const props: LatestSeasonRankingProps = {
      season: mockSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);

    const tendencyRanking = screen.queryByTestId("tdcRanking");
    expect(tendencyRanking).toBeInTheDocument();

    const averageRanking = screen.queryByTestId("avgRanking");
    expect(averageRanking).not.toBeInTheDocument();

    const awardRanking = screen.queryByTestId("awrRanking");
    expect(awardRanking).not.toBeInTheDocument();
  });

  it("displays average ranking when clicking average button", async () => {
    const props: LatestSeasonRankingProps = {
      season: mockSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);

    const avgButton = screen.getByRole("button", { name: /moy/i });
    userEvent.click(avgButton);

    await waitFor(() => {
      const tendencyRanking = screen.queryByTestId("tdcRanking");
      expect(tendencyRanking).not.toBeInTheDocument();

      const averageRanking = screen.queryByTestId("avgRanking");
      expect(averageRanking).toBeInTheDocument();

      const awardRanking = screen.queryByTestId("awrRanking");
      expect(awardRanking).not.toBeInTheDocument();
    });
  });

  it("displays tendency ranking when clicking tendency button", async () => {
    const props: LatestSeasonRankingProps = {
      season: mockSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);

    const tdcButton = screen.getByRole("button", { name: /tdc/i });
    userEvent.click(tdcButton);

    await waitFor(() => {
      const tendencyRanking = screen.queryByTestId("tdcRanking");
      expect(tendencyRanking).toBeInTheDocument();

      const averageRanking = screen.queryByTestId("avgRanking");
      expect(averageRanking).not.toBeInTheDocument();

      const awardRanking = screen.queryByTestId("awrRanking");
      expect(awardRanking).not.toBeInTheDocument();
    });
  });

  it("displays award ranking when clicking award button", async () => {
    const props: LatestSeasonRankingProps = {
      season: mockSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);

    const awrButton = screen.getByRole("button", { name: /hdm/i });
    userEvent.click(awrButton);

    await waitFor(() => {
      const tendencyRanking = screen.queryByTestId("tdcRanking");
      expect(tendencyRanking).not.toBeInTheDocument();

      const averageRanking = screen.queryByTestId("avgRanking");
      expect(averageRanking).not.toBeInTheDocument();

      const awardRanking = screen.queryByTestId("awrRanking");
      expect(awardRanking).toBeInTheDocument();
    });
  });

  it("renders a message when season has no stats", async () => {
    const props: LatestSeasonRankingProps = {
      season: mockNoStatSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);
    expect(screen.getByTestId("no-stats")).toBeInTheDocument();
  });
});
