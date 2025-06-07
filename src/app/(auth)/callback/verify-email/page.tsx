import React, { use } from "react";
import { verifyEmail } from "./services/services";
import { redirect } from "next/navigation";

const CallbackVerification = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams?.token;

  if (!token) {
    redirect("/auth");
  }

  const verify = use(verifyEmail(token));

  return (
    <main className="text-black flex items-center h-screen justify-center">
      {verify?.success ? <p>{verify.message}</p> : <p>{verify?.message}</p>}
    </main>
  );
};

export default CallbackVerification;
