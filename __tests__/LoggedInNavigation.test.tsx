import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoggedInNavigation, {
  LoggedInNavigationProps,
} from "@/components/LoggedInNavigation";

describe("LoggedInNavigation", () => {
  it("displays user name", () => {
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

    const name = screen.getByText(/daniel/i);
    expect(name).toBeInTheDocument();
  });

  it("displays user image if it has one", () => {
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

  it("opens menu on click and shows logout text", async () => {
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

    const logoutText = screen.queryByText(/déconnexion/i);
    expect(logoutText).not.toBeInTheDocument();

    const name = screen.getByText(/daniel/i);
    userEvent.click(name);

    await waitFor(() => {
      const logoutText = screen.getByText(/déconnexion/i);
      expect(logoutText).toBeInTheDocument();
    });
  });
});
