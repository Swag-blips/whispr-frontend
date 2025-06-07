export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ otp, email }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
