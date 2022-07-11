import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PlayerForm, { PlayerFormInput } from "@/components/forms/PlayerForm";

describe("PlayerForm", () => {
  it("renders correct fields", () => {
    render(<PlayerForm onSubmit={jest.fn()} />);

    expect(screen.getByRole("textbox", { name: /first/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /last/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /country/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /code/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /birth/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /image/i })).toBeInTheDocument();
    expect(screen.getByText(/create/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it("renders errors", async () => {
    render(<PlayerForm onSubmit={jest.fn()} />);

    const firstName = screen.getByRole("textbox", { name: /first/i });
    fireEvent.change(firstName, { target: { value: "A" } });

    const lastName = screen.getByRole("textbox", { name: /last/i });
    fireEvent.change(lastName, { target: { value: "A" } });

    const country = screen.getByRole("textbox", { name: /country/i });
    fireEvent.change(country, { target: { value: "A" } });

    const code = screen.getByRole("textbox", { name: /code/i });
    fireEvent.change(code, { target: { value: "A" } });

    const submitButton = screen.getByText(/create/i);
    fireEvent.click(submitButton);

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
    render(<PlayerForm onSubmit={mockSubmit} />);

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

  it("renders with default values in props", () => {
    const mockSubmit = jest.fn();
    const defaultValues: PlayerFormInput = {
      firstName: "John",
      lastName: "Doe",
      country: "Brazil",
      countryCode: "BR",
      birthDate: new Date("2011-10-05T00:00:00.000Z"),
      image: "https://test.com",
    };
    render(<PlayerForm onSubmit={mockSubmit} defaultValues={defaultValues} />);

    const firstName = screen.getByRole("textbox", { name: /first/i });
    expect(firstName).toHaveDisplayValue("John");

    const lastName = screen.getByRole("textbox", { name: /last/i });
    expect(lastName).toHaveDisplayValue("Doe");

    const country = screen.getByRole("textbox", { name: /country/i });
    expect(country).toHaveDisplayValue("Brazil");

    const code = screen.getByRole("textbox", { name: /code/i });
    expect(code).toHaveDisplayValue("BR");

    const birthDate = screen.getByRole("textbox", { name: /birth/i });
    expect(birthDate).toHaveDisplayValue("05/10/2011");

    const image = screen.getByRole("textbox", { name: /image/i });
    expect(image).toHaveDisplayValue("https://test.com");
  });
});
