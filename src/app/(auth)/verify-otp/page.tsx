import { ArrowLeft } from "lucide-react";
import React from "react";
import OtpInputs from "./components/OtpInputs";
import Link from "next/link";
import { redirect } from "next/navigation";

const OtpPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const email = searchParams?.email;

  if (!email) {
    redirect("/auth");
  }
  return (
    <div className="">
      <nav className="py-4 px-3">
        <Link href={"/auth"}>
          <ArrowLeft />
        </Link>
      </nav>
      <main className="flex items-center justify-center h-[calc(100vh-64px)]  flex-col gap-2">
        <h2 className=" text-[32px] font-bold text-center ">
          Enter your otp code
        </h2>
        <p className="text-[#868686] text-center">
          We sent an otp to <span className="text-[#444CE7]">{email}</span>{" "}
          enter it below to continue
        </p>

        <OtpInputs email={email} />
      </main>
    </div>
  );
};

export default OtpPage;
