export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  bio?: string;
}

export interface RegisterResponse {
  success: boolean;
  details?: string;
  user?: {
    username: string;
    email: string;
    isVerified: boolean;
  };
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type LoginResponse = Omit<RegisterResponse, "user">;
