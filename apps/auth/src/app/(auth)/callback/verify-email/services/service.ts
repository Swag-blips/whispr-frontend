import { VerifyEmailResponse } from "@/app/types/auth";

export const verifyEmail = async (
  token: string | string[] | undefined
): Promise<VerifyEmailResponse | undefined> => {
  if (!token) return;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
