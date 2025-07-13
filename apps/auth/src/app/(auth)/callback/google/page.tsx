"use client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { authenticateWithGoogle } from "./services/service";
import { Generating } from "@repo/ui/icons/Generating";
import useSWR from "swr";

type Props = {};

const GoogleCallback = () => {
  const code = useSearchParams().get("code");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const authenticateWithGoogleWrapper = async () => {
    try {
      const response = await authenticateWithGoogle(code!);
      if (response.success) {
        console.log("SUCCESS");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateWithGoogleWrapper();
  }, [code]);

  if (!code) {
    redirect("/auth");
  }

  if (loading) {
    return (
      <main className="flex items-center flex-col gap-2 justify-center h-screen">
        <Generating />
        <p>Authenticating with google</p>
      </main>
    );
  }

  return (
    <main className="flex items-center flex-col gap-2 justify-center h-screen"></main>
  );
};

export default GoogleCallback;
