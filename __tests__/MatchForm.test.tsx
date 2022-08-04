import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MatchForm, { MatchFormProps } from "@/components/forms/MatchForm";

const mockProps: Partial<MatchFormProps> = {
  seasons: [
    { id: "1", startDate: new Date(1990, 5, 5), players: [] },
    { id: "2", startDate: new Date(1991, 6, 6), players: [] },
  ],
  competitions: [
    { id: "1", name: "Ligue 1", abbreviation: "L1" },
    { id: "2", name: "Champions League", abbreviation: "C1" },
  ],
  clubs: [
    {
      id: "1",
      name: "Saint-Etienne",
      abbreviation: "ASSE",
      primary: "#333",
      secondary: "#444",
    },
    {
      id: "2",
      name: "Nantes",
      abbreviation: "FCN",
      primary: "#555",
      secondary: "#666",
    },
  ],
};

describe("MatchForm", () => {
  it("renders correct fields", () => {
    const mockSubmit = jest.fn();
    const props: MatchFormProps = {
      seasons: mockProps.seasons,
      competitions: mockProps.competitions,
      clubs: mockProps.clubs,
      onSubmit: mockSubmit,
    };

    render(<MatchForm {...props} />);

    expect(screen.getByRole("textbox", { name: /date/i })).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /season/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /competition/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /opponent/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /location/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /score/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /conceed/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/créer/i)).toBeInTheDocument();
    expect(screen.getByText(/annuler/i)).toBeInTheDocument();
  });

  it("renders correct errors", async () => {
    const mockSubmit = jest.fn();
    const props: MatchFormProps = {
      seasons: mockProps.seasons,
      competitions: mockProps.competitions,
      clubs: mockProps.clubs,
      onSubmit: mockSubmit,
    };

    render(<MatchForm {...props} />);

    const submitButton = screen.getByText(/créer/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      const dateError = screen.queryByTestId("error-date");
      expect(dateError).toBeInTheDocument();

      const seasonError = screen.queryByTestId("error-seasonId");
      expect(seasonError).not.toBeInTheDocument();

      const competitionError = screen.queryByTestId("error-competitionId");
      expect(competitionError).not.toBeInTheDocument();

      const clubError = screen.queryByTestId("error-clubId");
      expect(clubError).not.toBeInTheDocument();

      const locationError = screen.queryByTestId("error-home");
      expect(locationError).not.toBeInTheDocument();

      const scoredError = screen.queryByTestId("error-scored");
      expect(scoredError).toBeInTheDocument();

      const conceededError = screen.queryByTestId("error-conceeded");
      expect(conceededError).toBeInTheDocument();
    });
  });

  it("calls onSubmit with correct data", async () => {
    const mockSubmit = jest.fn();
    const props: MatchFormProps = {
      seasons: mockProps.seasons,
      competitions: mockProps.competitions,
      clubs: mockProps.clubs,
      onSubmit: mockSubmit,
    };

    render(<MatchForm {...props} />);

    const date = screen.getByRole("textbox", { name: /date/i });
    fireEvent.change(date, { target: { value: "20/05/1998" } });

    const scored = screen.getByRole("spinbutton", { name: /score/i });
    fireEvent.change(scored, { target: { value: 2 } });

    const conceeded = screen.getByRole("spinbutton", { name: /conceed/i });
    fireEvent.change(conceeded, { target: { value: 1 } });

    const submitButton = screen.getByText(/créer/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          date: new Date(1998, 4, 20),
          seasonId: "1",
          competitionId: "1",
          opponentId: "1",
          home: "home",
          scored: 2,
          conceeded: 1,
        })
      );
    });
  });

  it("renders with default values in props", async () => {
    const mockSubmit = jest.fn();
    const props: MatchFormProps = {
      seasons: mockProps.seasons,
      competitions: mockProps.competitions,
      clubs: mockProps.clubs,
      onSubmit: mockSubmit,
      defaultValues: {
        date: new Date("2011-10-05T00:00:00.000Z"),
        seasonId: "2",
        competitionId: "2",
        opponentId: "2",
        home: "away",
        scored: 0,
        conceeded: 3,
      },
    };

    render(<MatchForm {...props} />);

    expect(screen.getByRole("textbox", { name: /date/i })).toHaveDisplayValue(
      "05/10/2011"
    );
    expect(
      screen.getByRole("combobox", { name: /season/i })
    ).toHaveDisplayValue("1991/1992");
    expect(
      screen.getByRole("combobox", { name: /competition/i })
    ).toHaveDisplayValue("Champions League");
    expect(
      screen.getByRole("combobox", { name: /opponent/i })
    ).toHaveDisplayValue("Nantes");
    expect(
      screen.getByRole("combobox", { name: /location/i })
    ).toHaveDisplayValue("Away");
    expect(
      screen.getByRole("spinbutton", { name: /score/i })
    ).toHaveDisplayValue("0");
    expect(
      screen.getByRole("spinbutton", { name: /conceed/i })
    ).toHaveDisplayValue("3");
  });
});
