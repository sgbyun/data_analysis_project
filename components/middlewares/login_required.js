import jwt from "jsonwebtoken";

function login_required(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음.
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    console.log(
      "서비스 사용 요청이 있습니다. 하지만, Authorization 토큰이 없음"
    );
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  // 토큰 추출
  const token = authorizationHeader.split(" ")[1];

  // 토큰이 존재하지 않을 경우
  if (!token) {
    console.log("서비스 사용 요청이 있습니다. 하지만, 토큰이 없음");
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  }

  // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(token, secretKey);
    const user_id = jwtDecoded.user_id;
    req.currentUserId = user_id;
    next();
  } catch (error) {
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
}

export { login_required };
