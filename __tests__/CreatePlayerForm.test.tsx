import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreatePlayerForm from "@/components/forms/CreatePlayerForm";

describe("CreatePlayerForm", () => {
  it("renders correct fields", () => {
    render(<CreatePlayerForm onSubmit={jest.fn()} />);

    expect(screen.getByRole("textbox", { name: /first/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /last/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /country/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /code/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /birth/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /image/i })).toBeInTheDocument();
    expect(screen.getByText(/create/i)).toBeDisabled();
  });

  it("renders correct buttons state", () => {
    render(<CreatePlayerForm onSubmit={jest.fn()} />);
    expect(screen.getByText(/cancel/i)).not.toBeDisabled();
    expect(screen.getByText(/create/i)).toBeDisabled();
  });

  it("renders errors", async () => {
    render(<CreatePlayerForm onSubmit={jest.fn()} />);

    const firstName = screen.getByRole("textbox", { name: /first/i });
    fireEvent.change(firstName, { target: { value: "A" } });

    const lastName = screen.getByRole("textbox", { name: /last/i });
    fireEvent.change(lastName, { target: { value: "A" } });

    const country = screen.getByRole("textbox", { name: /country/i });
    fireEvent.change(country, { target: { value: "A" } });

    const code = screen.getByRole("textbox", { name: /code/i });
    fireEvent.change(code, { target: { value: "A" } });

    await waitFor(() => {
      const firstNameError = screen.getByTestId("error-firstName");
      expect(firstNameError).toBeInTheDocument();
      const lastNameError = screen.getByTestId("error-lastName");
      expect(lastNameError).toBeInTheDocument();
      const countryError = screen.getByTestId("error-country");
      expect(countryError).toBeInTheDocument();
      const countryCodeError = screen.getByTestId("error-countryCode");
      expect(countryCodeError).toBeInTheDocument();
    });
  });

  it("calls onSubmit with correct data", async () => {
    const mockSubmit = jest.fn();
    render(<CreatePlayerForm onSubmit={mockSubmit} />);

    const firstName = screen.getByRole("textbox", { name: /first/i });
    fireEvent.change(firstName, { target: { value: "Harry" } });

    const lastName = screen.getByRole("textbox", { name: /last/i });
    fireEvent.change(lastName, { target: { value: "Potter" } });

    const country = screen.getByRole("textbox", { name: /country/i });
    fireEvent.change(country, { target: { value: "United Kingdom" } });

    const code = screen.getByRole("textbox", { name: /code/i });
    fireEvent.change(code, { target: { value: "UK" } });

    const birthDate = screen.getByRole("textbox", { name: /birth/i });
    fireEvent.change(birthDate, { target: { value: "20/05/1998" } });

    const image = screen.getByRole("textbox", { name: /image/i });
    fireEvent.change(image, { target: { value: "https://image.com" } });

    await waitFor(() => {
      expect(screen.getByText(/create/i)).not.toBeDisabled();
    });

    const submitButton = screen.getByText(/create/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "Harry",
          lastName: "Potter",
          country: "United Kingdom",
          countryCode: "UK",
          birthDate: new Date(1998, 4, 20),
          image: "https://image.com",
        })
      );
    });
  });
});
