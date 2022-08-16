import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MatchInfoBar, {
  MatchInfoBarProps,
} from "@/components/MatchDisplay/MatchInfoBar";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
}));

describe("MatchInfoBar", () => {
  it("renders correctly when not authenticated and calls signIn", async () => {
    const props: MatchInfoBarProps = {
      authenticated: false,
    };
    render(<MatchInfoBar {...props} />);

    const signInButton = screen.getByRole("button", {
      name: /connectez-vous/i,
    });
    expect(signInButton).toBeInTheDocument();

    userEvent.click(signInButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledTimes(1);
    });
  });

  it("renders correctly when the match is archived", () => {
    const props: MatchInfoBarProps = {
      authenticated: true,
      archived: true,
    };
    render(<MatchInfoBar {...props} />);

    expect(screen.getByText("Les votes sont finis.")).toBeInTheDocument();
  });

  it("renders correctly when the user already voted", () => {
    const props: MatchInfoBarProps = {
      authenticated: true,
      voted: true,
    };
    render(<MatchInfoBar {...props} />);

    expect(screen.getByText("Vous avez déjà voté.")).toBeInTheDocument();
  });

  it("renders correctly when the user did not vote yet", () => {
    const props: MatchInfoBarProps = {
      authenticated: true,
      voted: true,
      twitterText: "hello",
    };
    render(<MatchInfoBar {...props} />);

    expect(screen.getByText("Vous avez déjà voté.")).toBeInTheDocument();

    const tweetLink = expect(screen.getByRole("link", { name: "Tweeter" }));
    waitFor(() => {
      expect(tweetLink).toBeInTheDocument();
      expect(tweetLink).toHaveAttribute(
        "href",
        `https://twitter.com/intent/tweet?via=GoneRank&text=${props.twitterText}`
      );
    });
  });
});
