"use client";

import { useState } from "react";
import { validateSignup } from "../utils/validate";
import { register } from "@/app/actions/auth/auth";
import toast from "react-hot-toast";
import { Generating } from "@/app/components/icons/Generating";

type ActiveTab = "signup" | "login";
export const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("signup");
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validate = validateSignup(signupData);

    const payload = {
      username: signupData.username.trim().replace(/\s/g, ""),
      email: signupData.email.trim().replace(/\s/g, ""),
      password: signupData.password.trim().replace(/\s/g, ""),
      ...(signupData.bio.trim() && {
        bio: signupData.bio.trim().replace(/\s/g, ""),
      }),
    };

    if (validate) {
      setLoading(true);
      try {
        const response = await register(payload);

        if (response.success) {
          toast.success(response.message);
        } else if (!response.success && response.details) {
          toast.error(response.details || "An error occured");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };

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
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
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
                onChange={(e) =>
                  setSignupData({ ...signupData, bio: e.target.value })
                }
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
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
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
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
            className="border-[#D9D9D9] outline-[#444CE7] placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
            placeholder="Enter your password"
          />
        </div>

        {activeTab === "signup" ? (
          <button
            onClick={handleSignup}
            disabled={
              !signupData.email.trim() ||
              !signupData.username.trim() ||
              !signupData.password.trim()
            }
            className={` ${
              !signupData.email.trim() ||
              !signupData.password.trim() ||
              !signupData.username.trim()
                ? "bg-[#C4C4C4]"
                : "bg-[#444CE7]"
            } cursor-pointer text-center disabled:cursor-not-allowed font-medium rounded-lg text-white py-4`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Generating />
              </div>
            ) : (
              "signup"
            )}
          </button>
        ) : (
          <button
            disabled={!signupData.email.trim() || !signupData.password.trim()}
            className={` ${
              !signupData.email.trim() || !signupData.password.trim()
                ? "bg-[#C4C4C4]"
                : "bg-[#444CE7]"
            } cursor-pointer disabled:cursor-not-allowed text-center font-medium rounded-lg text-white py-4`}
          >
            login
          </button>
        )}
      </form>
    </>
  );
};
