import express from "express";
import cors from "cors";
import { userController } from "./users/userController.js";
import { lolUserController } from "./lol_user/lolUserController.js";
import { reportController } from "./reports/reportController.js";
import { statsController } from "./statistics/statisticsController.js";
import { testController } from "./test/test.js";
// passport 설정 코드를 추가합니다.
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("데이터 분석 프로젝트 8팀 API 입니다.");
});

app.use(userController);
app.use(lolUserController);
app.use(reportController);
app.use(statsController);
app.use(testController);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:3000/login/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

app.use(userController);

export { app };
