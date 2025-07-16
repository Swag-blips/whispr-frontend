"use client";

import React, { useEffect, useRef, useState } from "react";
import { resendOtp, verifyOtp } from "../services/service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Generating } from "@repo/ui/icons/Generating";


type Props = {
  email: string | string[] | undefined;
};
const OtpInputs = ({ email }: Props) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const otpBoxReference = useRef<HTMLInputElement[]>([]);

  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    const parsedValue = parseInt(value);
    if (parsedValue > 9) return;
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 6 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleChangeCharacter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.currentTarget.value && index < 6 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
    if (e.key === "ArrowRight" && e.currentTarget.value && index < 6 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleSubmit = async (email: string, otp: string) => {
    setLoading(true);
    try {
      const response = await verifyOtp(email, otp);

      if (response.success) {
        toast.success(response.message);
        router.push("/");
      } else if (!response.success && response.details) {
        toast.error(response.details || "An error occured");
      } else {
        toast.error(response.message);
      }
    } catch (error) { 
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async (email: string) => {
    try {
      const response = await resendOtp(email);

      if (response.success) {
        toast.success(response.message);
        router.push("/");
      } else if (!response.success && response.details) {
        toast.error(response.details || "An error occured");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (otp.some((digit) => digit === "")) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [otp]);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-4">
        {otp.map((value: number, index: number) => (
          <input
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleChangeCharacter(e, index)}
            id={`otp-${index}`}
            key={index}
            type="number"
            min="0"
            max="9"
            step="1"
            ref={(el) => {
              if (el) {
                otpBoxReference.current[index] = el;
              }
            }}
            className="outline-none focus:border-[#444CE7] text-center border rounded-lg border-[#868686] h-16 w-[71px] [&::-webkit-inner-spin-button]:appearance-none"
          />
        ))}
      </div>
      <button
        onClick={() => handleSubmit(email as string, otp.join(""))}
        disabled={!enabled}
        className={`mt-10 h-14 rounded-lg ${
          enabled ? "bg-[#444CE7] " : "bg-[#C4C4C4]"
        } text-white font-medium  cursor-pointer
         disabled:cursor-not-allowed  w-full`}
      >
        {loading ? (
          <>
            <div className="flex items-center justify-center">
              <Generating />
            </div>
          </>
        ) : (
          "verify"
        )}
      </button>
      <span
        onClick={() => handleResendOtp(email as string)}
        className="underline cursor-pointer flex items-center justify-center mt-8 text-[#444CE7]"
      >
        Resend otp
      </span>
    </div>
  );
};

export default OtpInputs;
