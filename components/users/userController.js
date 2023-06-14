import { Router } from "express";
import { userService } from "./userService.js"; // userService를 중괄호로 감싸지 않음
import { User } from "./User.js";
import { login_required } from "../middlewares/login_required.js";
import { userLoginFunction } from "../utils/userLogin.js";
import registerController from "../utils/registerController.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// ...이하 코드 생략...

const userController = Router();

userController.post("/user/login", userLoginFunction);

userController.post("/user/register", registerController);

userController.get("/userlist", login_required, async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userController.get("/user/:emailId", login_required, async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const result = await userService.getUserOne({ emailId });

    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userController.put("/user/:emailId", login_required, async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const { password, nickname, name, isMale, lolId } = req.body;

    const user = await userService.getUserOne({ emailId });
    console.log("userController user : ", user);

    if (!user) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    const updatedUser = new User(
      user.email_id,
      password,
      nickname,
      name,
      user.personal_info_agree,
      user.grant,
      isMale,
      lolId
    );

    await userService.setUser(updatedUser);
    res.status(201).json("정보 수정 성공");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 코치님 피드백
userController.delete("/user/:emailId", login_required, async (req, res) => {
  try {
    const emailId = req.params.emailId;
    await userService.removeUser({ emailId });
    res.status(200).json("계정이 삭제되었습니다.");
  } catch (error) {
    res.status(500).json({ error });
  }
});

userController.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userController.get(
  "/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/error" }),
  (req, res) => {
    // 콜백 성공 시 처리할 로직
    res.redirect("/"); // 예시로 메인 페이지로 리다이렉트
  }
);

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
export { userController };
