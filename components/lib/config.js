import dotenv from "dotenv";
dotenv.config();

// Google OAuth 구성 정보
export const googleConfig = {
  clientID: process.env.GOOGLE_ID, // Google 클라이언트 ID
  clientSecret: process.env.GOOGLE_SECRET, // Google 클라이언트 비밀
  callbackURL: process.env.REDIRECT_CALLBACK + "user/google/callback", // Google OAuth 콜백 URL
};
