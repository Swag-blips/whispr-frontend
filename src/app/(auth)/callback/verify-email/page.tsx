import React, { use } from "react";
import { verifyEmail } from "./services/services";
import { redirect } from "next/navigation";
import emailGif from "../../../../../public/emailGif.gif";
import { decodeJwt } from "./utils/decodeToken";
import Link from "next/link";

const CallbackVerification = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams?.token;

  const email = decodeJwt(token as string);

  if (!token) {
    redirect("/auth");
  }

  const verify = use(verifyEmail(token));

  return (
    <main className="text-black flex items-center flex-col h-screen justify-center">
      <img src={emailGif.src} alt="" />

      {verify?.success ? (
        <>
          <h2 className="text-[32px] font-medium">{verify.message}</h2>
          <p className="text-[#868686]">
            Your email &nbsp;
            <span className="text-[#444CE7]">{email && email}</span> has been
            successfully verified
          </p>
        </>
      ) : (
        <>
          <h2 className="text-[32px] font-medium">{verify?.message}</h2>
        </>
      )}
      <Link
        href={"/auth"}
        className="bg-[#444CE7]  text-center justify-center flex items-center cursor-pointer text-white font-medium  h-14  w-[262px] rounded-lg mt-4"
      >
        Login
      </Link>
    </main>
  );
};

export default CallbackVerification;
