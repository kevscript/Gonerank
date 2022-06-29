import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Spinner from "@/components/shared/Spinner";

type AdminGuardProps = {
  children: ReactNode;
};

const AdminGuard = ({ children }: AdminGuardProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user.role === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    if (!isAdmin) router.push("/");
  }, [isAdmin, status, session, router]);

  if (isAdmin) return <>{children}</>;

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Spinner />
    </div>
  );
};

export default AdminGuard;
