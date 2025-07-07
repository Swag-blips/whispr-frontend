"use client";
import { Google } from "@/app/components/icons";
import { useRouter } from "next/navigation";

type Props = {};

export const GoogleAuth = (props: Props) => {
  const router = useRouter();
  const handleClick = () => {
    const callbackUrl = "http://localhost:3006/auth/callback/google/";
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
    router.push(targetUrl);
  };
  return (
    <button
      onClick={handleClick}
      className="rounded-full cursor-pointer flex items-center justify-center w-12 h-12 text-[#C4C4C4] text-size-12 border-[0.5px] border-[#D9D9D9] "
    >
      <Google />
    </button>
  );
};
