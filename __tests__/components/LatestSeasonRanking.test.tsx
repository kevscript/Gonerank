import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LatestSeasonRanking, {
  LatestSeasonRankingProps,
} from "@/components/LatestSeasonRanking";
import { GetLatestSeasonQuery } from "graphql/generated/queryTypes";

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
  it("displays tendency ranking when rankType = tendency", () => {
    const props: LatestSeasonRankingProps = {
      handleRankingType: jest.fn(),
      rankingType: "tendency",
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

  it("displays average ranking when rankType = average", () => {
    const props: LatestSeasonRankingProps = {
      handleRankingType: jest.fn(),
      rankingType: "average",
      season: mockSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);

    const tendencyRanking = screen.queryByTestId("tdcRanking");
    expect(tendencyRanking).not.toBeInTheDocument();

    const averageRanking = screen.queryByTestId("avgRanking");
    expect(averageRanking).toBeInTheDocument();

    const awardRanking = screen.queryByTestId("awrRanking");
    expect(awardRanking).not.toBeInTheDocument();
  });

  it("displays award ranking when rankType = award", () => {
    const props: LatestSeasonRankingProps = {
      handleRankingType: jest.fn(),
      rankingType: "award",
      season: mockSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);

    const tendencyRanking = screen.queryByTestId("tdcRanking");
    expect(tendencyRanking).not.toBeInTheDocument();

    const averageRanking = screen.queryByTestId("avgRanking");
    expect(averageRanking).not.toBeInTheDocument();

    const awardRanking = screen.queryByTestId("awrRanking");
    expect(awardRanking).toBeInTheDocument();
  });

  it("calls handleRankingType with correct input", async () => {
    const mockHandler = jest.fn();
    const props: LatestSeasonRankingProps = {
      handleRankingType: mockHandler,
      rankingType: "tendency",
      season: mockSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);

    const avgButton = screen.getByRole("button", { name: /moy/i });
    expect(avgButton).toBeInTheDocument();
    const tdcButton = screen.getByRole("button", { name: /tdc/i });
    expect(tdcButton).toBeInTheDocument();
    const awrButton = screen.getByRole("button", { name: /hdm/i });
    expect(awrButton).toBeInTheDocument();

    // expect tendency ranking on initial render based on props
    expect(screen.getByTestId("tdcRanking")).toBeInTheDocument();

    userEvent.click(avgButton);
    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalledTimes(1);
      expect(mockHandler).toHaveBeenCalledWith("average");
    });

    userEvent.click(tdcButton);
    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalledTimes(2);
      expect(mockHandler).toHaveBeenCalledWith("tendency");
    });

    userEvent.click(awrButton);
    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalledTimes(3);
      expect(mockHandler).toHaveBeenCalledWith("award");
    });
  });

  it("renders a message when season has no stats", async () => {
    const mockHandler = jest.fn();
    const props: LatestSeasonRankingProps = {
      handleRankingType: mockHandler,
      rankingType: "tendency",
      season: mockNoStatSeasonObject,
    };

    render(<LatestSeasonRanking {...props} />);
    expect(screen.getByTestId("no-stats")).toBeInTheDocument();
  });
});
