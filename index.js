import { app } from "./components/app.js";
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '1234',
  database: 'test_db'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 에러:', err);
    return;
  }
  console.log('MySQL 서버에 연결되었습니다.');
});

process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

const port = 3000;

app.listen(port, () => {
  console.log(port,'포트에서 서버를 시작했어요');
});

export {connection}