"use client";

import { useState } from "react";

type ActiveTab = "signup" | "login";
export const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("signup");
  return (
    <>
      <div className="bg-[#F0EFF2] w-[390px] px-1 mt-10 rounded-lg h-14 flex items-center justify-between">
        <button
          onClick={() => setActiveTab("signup")}
          className={` ${
            activeTab === "signup" ? "bg-white" : "text-[#868686]"
          }  cursor-pointer w-[169px]  py-3  my-[0.5px] font-medium rounded-lg`}
        >
          signup
        </button>
        <button
          onClick={() => setActiveTab("login")}
          className={` w-[169px] ${
            activeTab === "login" ? "bg-white" : "text-[#868686]"
          } cursor-pointer py-3  my-[0.5px] font-medium rounded-lg `}
        >
          login
        </button>
      </div>
      <form className="flex flex-col mt-8 w-[390px]  gap-6">
        {activeTab === "signup" && (
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="border-[#D9D9D9] outline-[#444CE7] placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="bio">Bio(optional)</label>
              <input
                type="bio"
                id="bio"
                name="bio"
                className="border-[#D9D9D9] outline-[#444CE7] placeholder-font-normal placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
                placeholder="Enter your bio"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-[#D9D9D9] outline-[#444CE7] placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-[#D9D9D9] outline-[#444CE7] placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
            placeholder="Enter your password"
          />
        </div>

        <button className="bg-[#444CE7] cursor-pointer text-center font-medium rounded-lg text-white py-4">
          {activeTab === "login" ? "login" : "signup"}
        </button>
      </form>
    </>
  );
};
