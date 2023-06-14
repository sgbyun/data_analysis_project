import "dotenv/config";
import { app } from "./components/app.js";
import mysql from "mysql2";
import { logger } from "./components/utils/winston.js";

const port = process.env.SERVER_PORT || 3001;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    logger.error("MySQL 연결 에러:", err);
    return;
  }
  logger.info("MySQL 서버에 연결되었습니다.");
});

process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

app.listen(port, () => {
  logger.info(port, "포트에서 서버를 시작했어요");
});

export { connection };
