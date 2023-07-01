import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handle(req, res) {
  const { name, address, ageRange } = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "UnAuthorized" });
  }

  const result = await prisma.profile.create({
    data: {
      name: name,
      address: address,
      ageRange: ageRange,
      user: { connect: { id: session?.user?.id } },
    },
  });
  return res.status(200).json(result);
}
