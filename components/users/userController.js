import { Router } from "express";
import { userService } from "./userService.js"; // userService를 중괄호로 감싸지 않음
import { User } from "./User.js";
import { login_required } from "../middlewares/loginRequired.js";
import { userLoginFunction } from "../utils/userLogin.js";
import registerController from "../utils/registerController.js";
import { sendEmail } from "../utils/findPassword.js";
import { hashPassword } from "../utils/hashPassword.js";

// ...이하 코드 생략...

const userController = Router();

userController.post("/user/login", userLoginFunction);

userController.post("/user/register", registerController);

userController.post("/findPassword", async (req, res) => {
  try {
    const authKey = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      "0"
    );
    const emailId = req.body.emailId;
    const result = await sendEmail(emailId, authKey);
    await userService.addKey(emailId, authKey);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userController.get("/findPassword/:emailId", async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const result = await userService.getKey(emailId);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userController.post("/changePassword", async (req, res) => {
  const { emailId, password } = req.body;
  const user = new User(emailId, password);
  user.password = await hashPassword(password);
  await userService.changePassword(user);
  res.status(201).json("비밀번호 변경 완료");
});

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

export { userController };
