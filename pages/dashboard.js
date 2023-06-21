import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";

import prisma from "../lib/prisma";

export const getServerSideProps = async ({ params }) => {
  const posts = await prisma.post.findMany({
    where: {
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: {
      posts,
    },
  };
};

const dashboard = ({ posts }) => {
  return <Dashboard posts={posts} />;
};

export default dashboard;
