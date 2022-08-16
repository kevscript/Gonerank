import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MatchVoter, {
  MatchVoterProps,
} from "@/components/MatchDisplay/MatchVoter";
import { getDisplayMatchMockReturnValue } from "@/mocks/getDisplayMatch";

describe("MatchVoter", () => {
  it("renders correctly", () => {
    const props: MatchVoterProps = {
      match: getDisplayMatchMockReturnValue.displayMatch,
      onSubmit: jest.fn(),
    };

    render(<MatchVoter {...props} />);

    const matchStats = getDisplayMatchMockReturnValue.displayMatch?.stats;

    matchStats &&
      matchStats.forEach((p) => {
        const image = screen.getByAltText(`${p.firstName} ${p.lastName}`);
        const displayName = screen.getByText(
          `${p.firstName[0]}. ${p.lastName}`
        );
        const input = screen.getByLabelText(`${p.firstName} ${p.lastName}`);

        expect(displayName).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).toHaveDisplayValue("5");
      });
  });

  it("increments/decrements a rating correctly", async () => {
    const props: MatchVoterProps = {
      match: getDisplayMatchMockReturnValue.displayMatch,
      onSubmit: jest.fn(),
    };

    render(<MatchVoter {...props} />);

    const player = getDisplayMatchMockReturnValue.displayMatch?.stats[0]!;

    const playerInput = screen.getByLabelText(
      `${player.firstName} ${player.lastName}`
    );
    expect(playerInput).toBeInTheDocument();
    expect(playerInput).toHaveDisplayValue("5");

    const incrementButton = screen.getByTestId(`increment-${player.playerId}`);
    expect(incrementButton).toBeInTheDocument();

    const decrementButton = screen.getByTestId(`decrement-${player.playerId}`);
    expect(decrementButton).toBeInTheDocument();

    // increment once
    userEvent.click(incrementButton);
    await waitFor(() => {
      expect(playerInput).toHaveDisplayValue("5.5");
    });

    // decrement once
    userEvent.click(decrementButton);
    await waitFor(() => {
      expect(playerInput).toHaveDisplayValue("5");
    });

    // set rating to 10 (max) to check limit
    fireEvent.change(playerInput, { target: { value: "10" } });
    await waitFor(() => {
      expect(playerInput).toHaveDisplayValue("10");
    });
    // shouldn't increment if already at max 10
    userEvent.click(incrementButton);
    await waitFor(() => {
      expect(playerInput).not.toHaveDisplayValue("10.5");
      expect(playerInput).toHaveDisplayValue("10");
    });

    // set rating to 1 (min) to check limit
    fireEvent.change(playerInput, { target: { value: "1" } });
    await waitFor(() => {
      expect(playerInput).toHaveDisplayValue("1");
    });
    // shouldn't decrement if already at min 1
    userEvent.click(decrementButton);
    await waitFor(() => {
      expect(playerInput).not.toHaveDisplayValue("0.5");
      expect(playerInput).toHaveDisplayValue("1");
    });
  });
});
