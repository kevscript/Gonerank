import { render, screen } from "@testing-library/react";
import Draggable from "@/components/shared/Draggable";

describe("Daggable", () => {
  it("renders correct children", () => {
    const props = { children: <button>Hello World</button> };

    render(<Draggable {...props} />);

    const button = screen.getByRole("button", { name: "Hello World" });
    expect(button).toBeInTheDocument();
  });
});
