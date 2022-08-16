import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ClubForm, { ClubFormInput } from "@/components/forms/ClubForm";

describe("ClubForm", () => {
  it("renders correct fields", () => {
    render(<ClubForm onSubmit={jest.fn()} />);

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /abbr/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /primary/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /secondary/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/créer/i)).toBeInTheDocument();
    expect(screen.getByText(/annuler/i)).toBeInTheDocument();
  });

  it("renders errors", async () => {
    render(<ClubForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByText(/créer/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("error-name")).toBeInTheDocument();
      expect(screen.getByTestId("error-abbreviation")).toBeInTheDocument();
      // primary and secondary are set initialy
      expect(screen.queryByTestId("error-primary")).not.toBeInTheDocument();
      expect(screen.queryByTestId("error-secondary")).not.toBeInTheDocument();
    });
  });

  it("calls onSubmit wtih correct data", async () => {
    const mockSubmit = jest.fn();
    render(<ClubForm onSubmit={mockSubmit} />);

    const name = screen.getByRole("textbox", { name: /name/i });
    fireEvent.change(name, { target: { value: "Lille" } });

    const abbreviation = screen.getByRole("textbox", { name: /abbr/i });
    fireEvent.change(abbreviation, { target: { value: "LOSC" } });

    const primary = screen.getByRole("textbox", { name: /primary/i });
    fireEvent.change(primary, { target: { value: "#333" } });

    const secondary = screen.getByRole("textbox", { name: /secondary/i });
    fireEvent.change(secondary, { target: { value: "#444" } });

    const submitButton = screen.getByText(/créer/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Lille",
          abbreviation: "LOSC",
          primary: "#333",
          secondary: "#444",
        })
      );
    });
  });

  it("renders with default values in props", () => {
    const defaultValues: ClubFormInput = {
      name: "Paris Saint-Germain",
      abbreviation: "PSG",
      primary: "#555",
      secondary: "#666",
    };

    render(<ClubForm onSubmit={jest.fn()} defaultValues={defaultValues} />);

    expect(screen.getByRole("textbox", { name: /name/i })).toHaveDisplayValue(
      "Paris Saint-Germain"
    );
    expect(screen.getByRole("textbox", { name: /abbr/i })).toHaveDisplayValue(
      "PSG"
    );

    expect(
      screen.getByRole("textbox", { name: /primary/i })
    ).toHaveDisplayValue("#555");
    expect(
      screen.getByRole("textbox", { name: /secondary/i })
    ).toHaveDisplayValue("#666");
  });
});
