import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ColorInput, { ColorInputProps } from "@/components/inputs/ColorInput";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
  }),
}));

describe("ColorInput", () => {
  it("renders correctly", () => {
    const props: ColorInputProps = {
      name: "ternary",
      label: "Ternary",
      register: jest.fn(),
      error: undefined,
      setValue: jest.fn(),
    };
    render(<ColorInput {...props} />);

    expect(screen.getByLabelText("Ternary")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#000")).toBeInTheDocument();
    expect(screen.queryByTestId("picker")).not.toBeInTheDocument();
  });

  it("renders correctly with initialValue prop", () => {
    const props: ColorInputProps = {
      name: "ternary",
      label: "Ternary",
      register: jest.fn(),
      error: undefined,
      setValue: jest.fn(),
      initialValue: "#9d2d8",
    };
    render(<ColorInput {...props} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveDisplayValue("#9d2d8");
  });

  it("opens the colorpicker on click", async () => {
    const props: ColorInputProps = {
      name: "ternary",
      label: "Ternary",
      register: jest.fn(),
      error: undefined,
      setValue: jest.fn(),
      initialValue: "#9d2d8",
    };
    render(<ColorInput {...props} />);

    const label = screen.getByLabelText("Ternary");
    fireEvent.click(label);

    await waitFor(() => {
      const picker = screen.getByTestId("picker");
      expect(picker).toBeInTheDocument();
    });
  });
});
