import { RegisterPayload } from "@/app/types/auth";
import toast from "react-hot-toast";

export const validateSignup = (payload: RegisterPayload) => {
  let isValid = true;
  const { email, password, username } = payload;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(email.trim()) || !email.trim()) {
    toast.error("Invalid email");
    isValid = false;
    return;
  }

  if (!password.trim()) {
    toast.error("Invalid password");
    isValid = false;
    return;
  } else if (password.trim().length < 6) {
    toast.error("Password must be at least 6 characters long");
    isValid = false;
    return;
  }

  if (!username.trim()) {
    toast.error("Invalid username");
    isValid = false;
    return;
  } else if (username.trim().length < 6) {
    toast.error("username must be at least 6 characters long");
    isValid = false;
    return;
  }

  return isValid;
};
