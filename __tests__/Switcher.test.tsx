import Switcher, { SwitcherProps } from "@/components/shared/Switcher";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Switcher", () => {
  it("renders properly", () => {
    const switcherProps: SwitcherProps = {
      checked: false,
      handleToggle: () => true,
    };

    render(<Switcher {...switcherProps} />);
    const switcher = screen.getByRole("checkbox");
    expect(switcher).toBeInTheDocument();
  });

  it("calls handler on click", async () => {
    const mockedHandler = jest.fn();
    const switcherProps: SwitcherProps = {
      checked: false,
      handleToggle: mockedHandler,
    };

    render(<Switcher {...switcherProps} />);
    const switcher = screen.getByRole("checkbox");
    userEvent.click(switcher);
    await waitFor(() => expect(mockedHandler).toHaveBeenCalledTimes(1));
  });

  it("un/checks the checkbox on click", async () => {
    const switcherProps: SwitcherProps = {
      checked: false,
      handleToggle: () => true,
    };

    render(<Switcher {...switcherProps} />);
    const switcher = screen.getByRole("checkbox");
    // intialy unckecked
    expect(switcher).not.toBeChecked();
    // checked after click
    userEvent.click(switcher);
    await waitFor(() => expect(switcher).toBeChecked());
  });
});
