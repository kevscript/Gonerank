import { render, screen } from "@testing-library/react";
import AdminGuard from "@/components/AdminGuard";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("AdminGuard", () => {
  it("renders children if admin", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "Joe",
          role: "ADMIN",
        },
      },
      status: "authenticated",
    });

    render(
      <AdminGuard>
        <button>Hello</button>
      </AdminGuard>
    );

    expect(screen.getByRole("button", { name: "Hello" })).toBeInTheDocument();
  });

  it("renders loader on loading", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "Joe",
          role: "USER",
        },
      },
      status: "loading",
    });

    render(
      <AdminGuard>
        <button>Hello</button>
      </AdminGuard>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Hello" })
    ).not.toBeInTheDocument();
  });

  it("redirects if not admin", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "Joe",
          role: "USER",
        },
      },
      status: "authenticated",
    });

    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    render(
      <AdminGuard>
        <button>Hello</button>
      </AdminGuard>
    );

    expect(router.push).toHaveBeenCalledWith("/");
  });
});
