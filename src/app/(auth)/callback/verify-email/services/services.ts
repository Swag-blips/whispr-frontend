import { VerifyEmailResponse } from "@/app/types/auth";

export const verifyEmail = async (): Promise<VerifyEmailResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
