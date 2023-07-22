import { InputProps } from "@/components/inputs/CountryInput";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import CountryInput from "@/components/inputs/CountryInput";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
  }),
}));

describe("CountryInput", () => {
  it("displays correct information", () => {
    const props: InputProps = {
      label: "Country",
      name: "countryCode",
      register: jest.fn(),
      error: undefined,
      country: "France",
      countryCode: "FR",
      children: (
        <>
          <option value="FR">France</option>
          <option value="BE">Belgium</option>
        </>
      ),
    };

    render(<CountryInput {...props} />);

    const label = screen.getByLabelText(/country/i);
    expect(label).toBeInTheDocument();

    const select = screen.getByRole("combobox");
    expect(select).toHaveDisplayValue(/france/i);

    const countryCode = screen.getByText("FR");
    expect(countryCode).toBeInTheDocument();

    const flagImage = screen.getByAltText(/france/i);
    expect(flagImage).toBeInTheDocument();
  });

  it("displays correct error", () => {
    const props: InputProps = {
      label: "Country",
      name: "countryCode",
      register: jest.fn(),
      error: { message: "Hello", type: "required" },
      options: { required: true },
      country: "France",
      countryCode: "FR",
      children: (
        <>
          <option value="" />
          <option value="BE">Belgium</option>
        </>
      ),
    };

    render(<CountryInput {...props} />);

    const errorText = screen.getByText("Hello");
    expect(errorText).toBeInTheDocument();
  });

  it("simulates selection correctly", async () => {
    const props: InputProps = {
      label: "Country",
      name: "countryCode",
      register: jest.fn(),
      error: undefined,
      country: "France",
      countryCode: "FR",
      children: (
        <>
          <option value="FR">France</option>
          <option value="BE">Belgium</option>
        </>
      ),
    };

    render(<CountryInput {...props} />);

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "BE" } });

    await waitFor(() => {
      expect(select).toHaveDisplayValue("Belgium");
    });
  });
});
