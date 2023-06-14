import { validateEmail, validatePassword } from "../utils/validationUtils.js";
import { userService } from "../users/userService.js";
import { User } from "../users/User.js";
import { logger } from "./winston.js";
import bcrypt from "bcrypt";

const registerController = async (req, res) => {
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

    if (!validateEmail(emailId)) {
      return res
        .status(400)
        .json({ error: "유효한 이메일 주소 형식이 아닙니다." });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ error: "비밀번호는 최소 8자 이상이어야 합니다." });
    }

    // 유효성 검사를 통과한 경우에만 계속 진행
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

    user.deleted_at = "NOW()";

    await userService.addUser(user);
    logger.info("/Post user success");
    res.status(201).json("계정 생성 성공");
  } catch (error) {
    logger.error("/Post user failed");
    if (error.message.includes("이미 등록된 이메일입니다.")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default registerController;
