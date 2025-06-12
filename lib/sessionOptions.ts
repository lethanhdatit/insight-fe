import { SessionOptions } from "iron-session";

export interface UserSession {
  accessToken?: string;
  isGuest?: boolean;
  username?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || '',
  cookieName: 'iron-session',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  },
};