"use client";

import { useEffect, useState } from "react";

const Button = () => {
  const [countDown, setCountDown] = useState(60 * 1);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> | null = null;

    timerId = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);

    if (countDown <= 0) {
      clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [countDown]);

  //   useEffect(() => {
  //     if (countDown < 0) {
  //       console.log("expired");
  //       setCountDown(0);
  //     }
  //   }, [countDown]);

  const seconds = String(countDown % 60).padStart(2, "0");
  const minutes = String(Math.floor(countDown / 60)).padStart(2, "0");

  return (
    <button
      disabled={countDown !== 0}
      className={` ${
        countDown === 0 ? " bg-[#444CE7]" : "bg-[#C4C4C4]"
      } w-[262px] text-white font-medium mt-10 h-14 rounded-lg disabled:cursor-not-allowed`}
    >
      {countDown === 0 ? "Resend verification mail" : `${minutes}:${seconds}`}
    </button>
  );
};

export default Button;
