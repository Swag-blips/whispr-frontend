"use client";

import { useState } from "react";
import { validateSignup } from "../utils/validate";

import toast from "react-hot-toast";
import { Generating } from "@/app/components/icons/Generating";
import { login, register } from "../services/service";
import { useRouter } from "next/navigation";

type ActiveTab = "signup" | "login";
export const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("signup");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [authData, setAuthData] = useState({
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validate = validateSignup(authData);

    const payload = {
      username: authData.username.trim().replace(/\s/g, ""),
      email: authData.email.trim().replace(/\s/g, ""),
      password: authData.password.trim().replace(/\s/g, ""),
      ...(authData.bio.trim() && {
        bio: authData.bio.trim().replace(/\s/g, ""),
      }),
    };

    if (validate) {
      setLoading(true);
      try {
        const response = await register(payload);

        if (response.success) {
          toast.success(response.message);
          router.push("verify-email");
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

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      email: authData.email.trim().replace(/\s/g, ""),
      password: authData.password.trim().replace(/\s/g, ""),
    };
    try {
      const response = await login(payload);
      if (response.success) {
        toast.success(response.message);
        router.push("/verify-otp");
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
  };

  return (
    <>
      <div className="bg-[#F0EFF2] w-[390px] px-1 mt-10 rounded-lg h-14 flex items-center justify-between">
        <button
          onClick={() => {
            if (!loading) {
              setActiveTab("signup");
            }
          }}
          className={` ${
            activeTab === "signup" ? "bg-white" : "text-[#868686]"
          }  cursor-pointer w-[169px]  py-3  my-[0.5px] font-medium rounded-lg`}
        >
          signup
        </button>
        <button
          onClick={() => {
            if (!loading) {
              setActiveTab("login");
            }
          }}
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
                  setAuthData({ ...authData, username: e.target.value })
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
                  setAuthData({ ...authData, bio: e.target.value })
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
              setAuthData({ ...authData, email: e.target.value })
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
              setAuthData({ ...authData, password: e.target.value })
            }
            className="border-[#D9D9D9] outline-[#444CE7] placeholder:text-[#C4C4C4] placeholder-text-sm border-[0.5px] rounded-lg py-3 pl-3"
            placeholder="Enter your password"
          />
        </div>

        {activeTab === "signup" ? (
          <button
            onClick={handleSignup}
            disabled={
              !authData.email.trim() ||
              !authData.username.trim() ||
              !authData.password.trim() ||
              loading
            }
            className={` ${
              !authData.email.trim() ||
              !authData.password.trim() ||
              !authData.username.trim()
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
            onClick={handleLogin}
            disabled={!authData.email.trim() || !authData.password.trim()}
            className={` ${
              !authData.email.trim() || !authData.password.trim()
                ? "bg-[#C4C4C4]"
                : "bg-[#444CE7]"
            } cursor-pointer disabled:cursor-not-allowed text-center font-medium rounded-lg text-white py-4`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Generating />
              </div>
            ) : (
              "login"
            )}
          </button>
        )}
      </form>
    </>
  );
};
