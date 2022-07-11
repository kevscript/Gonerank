import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SeasonForm, { SeasonFormInput } from "@/components/forms/SeasonForm";

describe("SeasonForm", () => {
  it("renders correct fields", () => {
    render(<SeasonForm onSubmit={jest.fn()} />);

    expect(screen.getByRole("textbox", { name: /date/i })).toBeInTheDocument();
    expect(screen.getByText(/create/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it("renders errors", async () => {
    render(<SeasonForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByText(/create/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      const startDateError = screen.getByTestId("error-startDate");
      expect(startDateError).toBeInTheDocument();
    });
  });

  it("calls onSubmit with correct data", async () => {
    const mockSubmit = jest.fn();
    render(<SeasonForm onSubmit={mockSubmit} />);

    const startDate = screen.getByRole("textbox", { name: /date/i });
    fireEvent.change(startDate, { target: { value: "20/05/1998" } });

    const submitButton = screen.getByText(/create/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: new Date(1998, 4, 20),
        })
      );
    });
  });

  it("renders with default values in props", () => {
    const defaultValues: SeasonFormInput = {
      startDate: new Date("2011-10-05T00:00:00.000Z"),
    };
    render(<SeasonForm onSubmit={jest.fn()} defaultValues={defaultValues} />);

    const startDate = screen.getByRole("textbox", { name: /date/i });
    expect(startDate).toHaveDisplayValue("05/10/2011");
  });
});
