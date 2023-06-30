import React from "react";
import Appointments from "../../components/Appointments/Appointments";
import prisma from "../../lib/prisma";

export async function getServerSideProps({ params }) {
  const appointments = await prisma.appointment.findMany({
    where: {
      userId: String(params?.id),
    },
  });

  return {
    props: {
      appointments,
    },
  };
}

const appointments = ({ appointments }) => {
  return <Appointments appointments={appointments} />;
};

export default appointments;
