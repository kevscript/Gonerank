import { useSession } from "next-auth/react";
import { LoggedInMobile } from "./LoggedInMobile";
import { LoggedOutMobile } from "./LoggedOutMobile";

export function UserMobile() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <LoggedInMobile user={session.user} />;
  }

  return <LoggedOutMobile />;
}
