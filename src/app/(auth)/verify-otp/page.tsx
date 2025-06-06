import { ArrowLeft } from "lucide-react";
import React from "react";
import OtpInputs from "./components/OtpInputs";

const OtpPage = () => {
  return (
    <div className="">
      <nav className="py-4 px-3">
        <ArrowLeft />
      </nav>
      <main className="flex items-center justify-center h-[calc(100vh-64px)]  flex-col gap-2">
        <h2 className=" text-[32px] font-bold text-center ">
          Enter your otp code
        </h2>
        <p className="text-[#868686] text-center">
          We sent an email to{" "}
          <span className="text-[#444CE7]">coderblip@gmail.com</span> enter it
          below to continue
        </p>

        <OtpInputs />
      </main>
    </div>
  );
};

export default OtpPage;
