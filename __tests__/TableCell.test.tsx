import { render, screen } from "@testing-library/react";
import TableCell from "@/components/shared/TableCell";

describe("TableCell", () => {
  it("renders its content", () => {
    render(
      <TableCell>
        <button>Hello</button>
      </TableCell>
    );

    expect(screen.getByRole("button", { name: "Hello" })).toBeInTheDocument();
  });
});
