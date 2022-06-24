import { JWT } from "next-auth/jwt";

export type Context = {
  auth: JWT | null;
};
