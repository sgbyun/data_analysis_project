import { Router } from "express";
import { userService } from "./userService.js";
import { User } from "./User.js";

const userController = Router();

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

    await userService.addUser(user);
    res.status(201).json("계정 생성 성공");
  } catch (error) {
    res.status(500).json({ error });
  }
});

userController.get("/userlist", async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userController.get("/user/:emailId", async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const result = await userService.getUserOne({ emailId });

    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userController.put("/user/:emailId", async (req, res) => {
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
userController.delete("/user/:emailId", async (req, res) => {
  try {
    const emailId = req.params.emailId;
    await userService.removeUser({ emailId });
    res.status(200).json("계정이 삭제되었습니다.");
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { userController };
