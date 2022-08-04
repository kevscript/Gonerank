import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CompetitionForm, {
  CompetitionFormInput,
} from "@/components/forms/CompetitionForm";

describe("CompetitionForm", () => {
  it("renders correct fields", () => {
    render(<CompetitionForm onSubmit={jest.fn()} />);

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /abbr/i })).toBeInTheDocument();
    expect(screen.getByText(/créer/i)).toBeInTheDocument();
    expect(screen.getByText(/annuler/i)).toBeInTheDocument();
  });

  it("renders errors", async () => {
    render(<CompetitionForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByText(/créer/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("error-name")).toBeInTheDocument();
      expect(screen.getByTestId("error-abbreviation")).toBeInTheDocument();
    });
  });

  it("calls onSubmit with correct data", async () => {
    const mockSubmit = jest.fn();
    render(<CompetitionForm onSubmit={mockSubmit} />);

    const name = screen.getByRole("textbox", { name: /name/i });
    fireEvent.change(name, { target: { value: "Ligue 1" } });

    const abbreviation = screen.getByRole("textbox", { name: /abbr/i });
    fireEvent.change(abbreviation, { target: { value: "L1" } });

    const submitButton = screen.getByText(/créer/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Ligue 1",
          abbreviation: "L1",
        })
      );
    });
  });

  it("renders with default values in props", () => {
    const defaultValues: CompetitionFormInput = {
      name: "Champions League",
      abbreviation: "C1",
    };

    render(
      <CompetitionForm onSubmit={jest.fn()} defaultValues={defaultValues} />
    );

    expect(screen.getByRole("textbox", { name: /name/i })).toHaveDisplayValue(
      "Champions League"
    );
    expect(screen.getByRole("textbox", { name: /abbr/i })).toHaveDisplayValue(
      "C1"
    );
  });
});
