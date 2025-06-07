import React, { use } from "react";
import { verifyEmail } from "./services/services";
import { redirect } from "next/navigation";
import emailGif from "../../../../../public/emailGif.gif";
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

  console.log(verify);

  return (
    <main className="text-black flex items-center flex-col h-screen justify-center">
      <img src={emailGif.src} alt="" />
      {verify?.success ? <p>{verify.message}</p> : <p>{verify?.message}</p>}
    </main>
  );
};

export default CallbackVerification;
