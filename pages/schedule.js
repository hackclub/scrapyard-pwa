import Session from "@/lib/sessions";
import { useState } from "react";
import { useRouter } from "next/router";
import Main from "@/components/layouts/Main";
import useDevMode from "@/utils/useDevMode";
import Schedule from "@/components/schedule/Schedule";
import $ from "@/utils/animation";

export default function Dashboard({}) {
  return (
    <Main pageName="Schedule" red>
      <Schedule />
    </Main>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await Session.from(req, res);

  if (!session.authorized) {
    return {
      props: {
        user: null
      }
    };
  }

  // const user = await session.currentUser();

  return {
    props: {
      // user
    }
  };
};
