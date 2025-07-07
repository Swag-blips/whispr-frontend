export const authenticateWithGoogle = async (code: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in-with-google`,
      {
        method: "POST",
        headers: {
          authorization: code,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(
        `an error occured signing in with goole ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
