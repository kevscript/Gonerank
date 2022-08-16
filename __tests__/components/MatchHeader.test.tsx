import { render, screen } from "@testing-library/react";
import MatchHeader, {
  MatchHeaderProps,
} from "@/components/MatchDisplay/MatchHeader";
import { getDisplayMatchMockReturnValue } from "@/mocks/getDisplayMatch";

describe("MatchHeader", () => {
  it("renders correctly", () => {
    const props: MatchHeaderProps = {
      match: getDisplayMatchMockReturnValue.displayMatch,
    };
    render(<MatchHeader {...props} />);

    expect(screen.getByText("Ligue 1")).toBeInTheDocument();
    expect(screen.getByText("15/05/22")).toBeInTheDocument();

    expect(screen.getByText("OL")).toBeInTheDocument();
    expect(screen.getByText("Olympique Lyonnais")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("PSG")).toBeInTheDocument();

    expect(screen.getByTitle("buts marqués")).toHaveTextContent("3");
    expect(screen.getByTitle("buts concédés")).toHaveTextContent("2");
  });
});
