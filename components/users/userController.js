import { Router } from "express";
import { userService } from "./userService.js";
import { User } from "./User.js";
import bcrypt from "bcrypt";
import { login_required } from "../middlewares/login_required.js";

const userController = Router();

userController.post("/user/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const token = await userService.loginUser({ emailId, password });

    if (token) {
      res.status(200).json({ token, message: "로그인 되었습니다." });
    } else {
      res.status(401).json({
        error: "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userController.post("/user/register", async (req, res) => {
  console.log(req.body);
  try {
    const {
      emailId,
      password,
      nickname,
      name,
      personalInfoAgree,
      isMale,
      lolId,
    } = req.body;
    const grant = "user";

    const user = new User(
      emailId,
      password,
      nickname,
      name,
      personalInfoAgree,
      grant,
      isMale,
      lolId
    );
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    console.log(user.password);
    await userService.addUser(user);
    res.status(201).json("계정 생성 성공");
  } catch (error) {
    if (error.message.includes("이미 등록된 이메일입니다.")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
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
