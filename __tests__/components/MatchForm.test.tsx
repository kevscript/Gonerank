import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MatchForm, { MatchFormProps } from "@/components/forms/MatchForm";
import { noTimezone } from "@/utils/noTimezone";

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
    expect(screen.getByTestId("form-submit")).toBeInTheDocument();
    expect(screen.getByText(/annuler/i)).toBeInTheDocument();
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
    const submitButton = screen.getByTestId("form-submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          date: new Date(noTimezone(new Date(1998, 4, 20))),
          seasonId: mockProps.seasons?.sort((a, b) =>
            new Date(a.startDate) > new Date(b.startDate) ? -1 : 1
          )[0].id,
          competitionId: "1",
          opponentId: mockProps.clubs?.sort((a, b) =>
            a.name > b.name ? 1 : -1
          )[0].id,
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
        date: new Date("2011-10-05T12:00:00.000Z"),
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
