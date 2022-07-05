import { InputProps } from "@/components/shared/Input";
import { render, screen } from "@testing-library/react";
import Input from "@/components/shared/Input";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
  }),
}));

describe("Input", () => {
  it("displays correct label", () => {
    const props: InputProps = {
      label: "Email",
      name: "email",
      register: jest.fn(),
      value: "joe@gmail.com",
      error: undefined,
    };

    render(<Input {...props} />);

    const label = screen.getByLabelText(/email/i);
    expect(label).toBeInTheDocument();
  });

  it("displays error", () => {
    const props: InputProps = {
      label: "Email",
      name: "email",
      register: jest.fn(),
      value: "joe@gmail.com",
      error: { message: "Too short", type: "minLength" },
    };

    render(<Input {...props} />);

    const errorMessage = screen.getByText("Too short");
    expect(errorMessage).toBeInTheDocument();
  });

  it("calls register", () => {
    const mockedRegister = jest.fn();
    const props: InputProps = {
      label: "Email",
      name: "email",
      register: mockedRegister,
      value: "joe@gmail.com",
      error: { message: "Too short", type: "minLength" },
    };

    render(<Input {...props} />);

    expect(mockedRegister).toHaveBeenCalledTimes(1);
  });

  it("uses correct input type", () => {
    const props: InputProps = {
      label: "Email",
      name: "email",
      register: jest.fn(),
      value: 99,
      error: undefined,
      type: "number",
    };

    render(<Input {...props} />);

    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute("type", "number");
  });
});
