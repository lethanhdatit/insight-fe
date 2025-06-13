import { SessionOptions } from "iron-session";
import { Locale } from '@/lib/i18n/locales';

export interface UserSession {
  accessToken?: string;
  isGuest?: boolean;
  username?: string;
  lang?: Locale;
  theologyResult?: any;
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