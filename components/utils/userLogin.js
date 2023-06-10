import { userService } from "../users/userService.js";

const userLoginFunction = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const token = await userService.loginUser({ emailId, password });
    res.status(200).json({ message: "로그인 되었습니다.", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { userLoginFunction };
