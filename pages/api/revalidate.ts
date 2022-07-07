import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getToken({ req, secret });
  if (!user || user.role !== "ADMIN") {
    return res.status(401).json({ message: "Revalidation not authorized" });
  }
  try {
    await res.unstable_revalidate(req.query.url as string);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
