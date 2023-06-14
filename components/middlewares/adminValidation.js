import { connection } from "../../index.js";
import { logger } from "../utils/winston.js";

export function adminValidation(req, res, next) {
  const emailId = req.currentEmailId;

  connection.query(
    "SELECT `grant` FROM users WHERE email_id = ?",
    [emailId],
    (err, results) => {
      if (err) {
        logger.error("sql 쿼리 오류", err);
        res.status(500).send("server error");
        return;
      }

      const isAdmin = results[0].grant;

      if (isAdmin !== "admin") {
        res.status(401).json({ message: "관리자 권한 없음" });
      } else {
        next();
      }
    }
  );
}
