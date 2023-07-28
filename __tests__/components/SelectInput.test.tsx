import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SelectInput, { SelectInputProps } from "@/components/inputs/SelectInput";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
  }),
}));

describe("SelectInput", () => {
  it("displays correct label", () => {
    const props: SelectInputProps<{ color: "red" }> = {
      label: "Color",
      name: "color",
      error: undefined,
      value: "red",
      options: { required: "required" },
      register: jest.fn(),
      children: (
        <>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </>
      ),
    };

    render(<SelectInput {...props} />);

    const label = screen.getByLabelText(/color/i);
    expect(label).toBeInTheDocument();
  });

  it("renders all options", () => {
    const props: SelectInputProps<{ color: "red" }> = {
      label: "Color",
      name: "color",
      error: undefined,
      value: "red",
      options: { required: "required" },
      register: jest.fn(),
      children: (
        <>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </>
      ),
    };

    render(<SelectInput {...props} />);

    const option1 = screen.getByText("Red");
    const option2 = screen.getByText("Blue");
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it("displays the right value", () => {
    const props: SelectInputProps<{ color: "red" }> = {
      label: "Color",
      name: "color",
      error: undefined,
      value: "red",
      options: { required: "required" },
      register: jest.fn(),
      children: (
        <>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </>
      ),
    };

    render(<SelectInput {...props} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveDisplayValue("Red");
  });

  it("displays the right error", () => {
    const props: SelectInputProps<{ color: "red" }> = {
      label: "Color",
      name: "color",
      error: { message: "Hello", type: "max" },
      value: "red",
      options: { required: "required" },
      register: jest.fn(),
      children: (
        <>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </>
      ),
    };

    render(<SelectInput {...props} />);

    const select = screen.getByText("Hello");
    expect(select).toBeInTheDocument();
  });

  it("simulates selection correctly", async () => {
    const props: SelectInputProps<{ color: "red" }> = {
      label: "Color",
      name: "color",
      error: undefined,
      value: "red",
      options: { required: "required" },
      register: jest.fn(),
      children: (
        <>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </>
      ),
    };

    render(<SelectInput {...props} />);

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "blue" } });

    await waitFor(() => {
      expect(select).toHaveDisplayValue("Blue");
    });
  });
});
