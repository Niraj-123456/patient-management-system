import React from "react";
import Profile from "../../components/Profile/Profile";
import prisma from "../../lib/prisma";

export const getServerSideProps = async ({ params }) => {
  const profile = await prisma.profile.findUnique({
    where: {
      userId: String(params?.id),
    },
  });
  return {
    props: { profile },
  };
};

const profile = ({ profile }) => {
  return <Profile profile={profile} />;
};

export default profile;
