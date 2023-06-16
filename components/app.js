import express from "express";
import cors from "cors";
import { userController } from "./users/userController.js";
import { lolUserController } from "./lol_user/lolUserController.js";
import { reportController } from "./reports/reportController.js";
import { statsController } from "./statistics/statisticsController.js";

const app = express();

app.use(
  cors({
    /* origin: "http://34.64.185.130", */
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("데이터 분석 프로젝트 8팀 API 입니다.");
});

app.use(userController);
app.use(lolUserController);
app.use(reportController);
app.use(statsController);
export { app };
