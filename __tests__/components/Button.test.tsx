import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Button, { ButtonProps } from "@/components/shared/Button";

describe("Button", () => {
  it("renders correctly", () => {
    const props: ButtonProps = {
      label: "Hello",
    };

    render(<Button {...props} />);

    expect(screen.getByRole("button", { name: "Hello" })).toBeInTheDocument();
  });

  it("renders with correct state", () => {
    const props: ButtonProps = {
      label: "Hello",
      disabled: true,
    };

    render(<Button {...props} />);

    expect(screen.getByRole("button", { name: "Hello" })).toBeDisabled();
  });

  it("calls the onClick handler", async () => {
    const mockHandler = jest.fn();
    const props: ButtonProps = {
      label: "Hello",
      onClick: mockHandler,
    };

    render(<Button {...props} />);

    fireEvent.click(screen.getByRole("button", { name: "Hello" }));

    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });
});
