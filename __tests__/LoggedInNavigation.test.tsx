import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoggedInNavigation, {
  LoggedInNavigationProps,
} from "@/components/LoggedInNavigation";
import { signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signOut: jest.fn(),
}));

describe("LoggedInNavigation", () => {
  it("displays user information", () => {
    const props: LoggedInNavigationProps = {
      user: {
        id: "1",
        email: "daniel@gmail.com",
        role: "USER",
        image: "http://image.com",
        name: "Daniel",
      },
    };

    render(<LoggedInNavigation {...props} />);

    const name = screen.getByText("Daniel");
    expect(name).toBeInTheDocument();

    const image = screen.getByAltText("user avatar");
    expect(image).toBeInTheDocument();
  });

  it("displays a default Icon if no image provided", () => {
    const props: LoggedInNavigationProps = {
      user: {
        id: "1",
        email: "daniel@gmail.com",
        role: "USER",
        image: null,
        name: "Daniel",
      },
    };

    const { container } = render(<LoggedInNavigation {...props} />);

    const image = screen.queryByAltText("user avatar");
    expect(image).not.toBeInTheDocument();

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("opens/closes the user menu", async () => {
    const props: LoggedInNavigationProps = {
      user: {
        id: "1",
        email: "daniel@gmail.com",
        role: "USER",
        image: null,
        name: "Daniel",
      },
    };

    render(<LoggedInNavigation {...props} />);

    const menuOpener = screen.getByRole("button", { name: /daniel/i });
    expect(menuOpener).toBeInTheDocument();

    userEvent.click(menuOpener);
    await waitFor(() => {
      const userMenu = screen.getByRole("menu");
      expect(userMenu).toBeInTheDocument();
    });

    userEvent.click(menuOpener);
    await waitForElementToBeRemoved(screen.queryByRole("menu"));
  });

  it("has a signout process", async () => {
    const props: LoggedInNavigationProps = {
      user: {
        id: "1",
        email: "daniel@gmail.com",
        role: "USER",
        image: null,
        name: "Daniel",
      },
    };

    render(<LoggedInNavigation {...props} />);

    const signoutText = screen.queryByText(/déconnexion/i);
    expect(signoutText).not.toBeInTheDocument();

    const menuOpener = screen.getByRole("button", { name: /daniel/i });
    userEvent.click(menuOpener);

    await waitFor(() => {
      const signoutButton = screen.getByRole("menuitem", {
        name: /déconnexion/i,
      });
      expect(signoutButton).toBeInTheDocument();
    });

    const signoutButton = screen.getByRole("menuitem", {
      name: /déconnexion/i,
    });
    userEvent.click(signoutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledTimes(1);
    });
  });
});
