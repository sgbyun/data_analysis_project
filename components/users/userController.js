import { Router } from "express";
import { userService } from "./userService.js"; // userService를 중괄호로 감싸지 않음
import { User } from "./User.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { userLoginFunction } from "../utils/userLogin.js";
import registerController from "../utils/registerController.js";
import { sendEmail } from "../utils/findPassword.js";
import { hashPassword } from "../utils/hashPassword.js";
import { logger } from "../utils/winston.js";

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
    logger.info("유저 인증번호 발송 성공");
    res.status(201).json(result);
  } catch (error) {
    logger.error("유저 인증번호 발송 실패");
    res.status(500).json({ error: error.message });
  }
});

userController.get("/findPassword/:emailId", async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const result = await userService.getKey(emailId);
    logger.info("유저 인증번호 불러오기 성공", result);
    res.status(201).json(result);
  } catch (error) {
    logger.error("유저 인증번호 불러오기 실패");
    res.status(500).json({ error: error.message });
  }
});

userController.post("/changePassword", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = new User(emailId, password);
    user.password = await hashPassword(password);
    await userService.changePassword(user);
    logger.info("유저 비밀번호 변경 성공");
    res.status(201).json("비밀번호 변경 완료");
  } catch (error) {
    logger.error("유저 비밀번호 변경 실패");
    res.status(500).json({ error: error.message });
  }
});

userController.get("/userlist", loginRequired, async (req, res) => {
  try {
    const result = await userService.getUsers();
    logger.info("전체 유저 목록 불러오기 성공", result);
    res.status(200).json(result);
  } catch {
    logger.error("전체 유저 목록 불러오기 실패");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userController.get("/user/:emailId", loginRequired, async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const result = await userService.getUserOne({ emailId });
    logger.info("이메일로 유저 찾기 성공", result);
    res.status(200).json(result);
  } catch {
    logger.error("이메일로 유저 찾기 실패");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userController.put("/user/:emailId", loginRequired, async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const { password, nickname, name, isMale, lolId } = req.body;

    const user = await userService.getUserOne({ emailId });

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
    logger.info("유저 정보 수정 성공");
    res.status(201).json("정보 수정 성공");
  } catch (error) {
    logger.error("유저 정보 수정 실패");
    res.status(500).json({ error: error.message });
  }
});

// 코치님 피드백
userController.delete("/user/:emailId", loginRequired, async (req, res) => {
  try {
    const emailId = req.params.emailId;
    await userService.removeUser({ emailId });
    res.status(200).json("계정이 삭제되었습니다.");
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { userController };
