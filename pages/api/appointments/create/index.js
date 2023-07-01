import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export const config = {
  runtime: "edge",
};

export default async function handle(req, res) {
  const { hospital, department, appointmentDate, appointmentTime } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "UnAuthorized" });
  }
  const result = await prisma.appointment.create({
    data: {
      hospital: hospital,
      department: department,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      user: { connect: { id: session?.user?.id } },
    },
  });
  return res.status(200).json(result);
}
