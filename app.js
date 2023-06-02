import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("8팀 꿀벌에 온걸 환영해요");
  });

  app.listen(port, () => {
    console.log(port,'포트에서 서버를 시작했어요');
  });