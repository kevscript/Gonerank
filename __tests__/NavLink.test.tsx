import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavLink, { NavLinkProps } from "@/components/NavLink";
import React from "react";
import MatchIcon from "@/components/Icons/Match";

describe("NavLink", () => {
  it("shows the right label", () => {
    const props: NavLinkProps = {
      isActive: false,
      path: "/test",
      label: "Test",
      type: "user",
    };

    render(<NavLink {...props} />);

    const navLink = screen.getByText(/test/i);
    expect(navLink).toBeInTheDocument();
  });

  it("passes the right href to the nav item", () => {
    const props: NavLinkProps = {
      isActive: false,
      path: "/test",
      label: "Test",
      type: "user",
    };

    render(<NavLink {...props} />);

    const link = screen.getByRole("listitem");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("displays an SVG when Icon in props", () => {
    const props: NavLinkProps = {
      isActive: false,
      path: "/test",
      label: "Test",
      type: "user",
      Icon: MatchIcon,
    };

    const { container } = render(<NavLink {...props} />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
