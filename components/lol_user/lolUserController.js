import "dotenv/config";
import { Router } from "express";
import { lolUserService } from "./lolUserService.js";

const lolUserController = Router();

lolUserController.post("/loluser", async (req, res) => {
  try {
    const lolId = req.body.lolId;

    await lolUserService.addLolUser({ lolId });
    res.status(201).json("LOL 계정 정보 생성 성공");
  } catch (error) {
    res.status(500).json({ error });
  }
});

lolUserController.get("/loluser/:lolId", async (req, res) => {
  try {
    const lolId = req.params.lolId;
    const userInfo = await lolUserService.getLolUser({ lolId });
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

lolUserController.get("/loluser/update/:lolId", async (req, res) => {
  try {
    const lolId = req.params.lolId;
    await lolUserService.setLolUser({ lolId });
    res.status(201).json("LOL 계정 정보 갱신 성공");
  } catch (error) {
    res.status(500).json({ error });
  }
});

lolUserController.put("/loluser/report/:lolId", async (req, res) => {
  try {
    const lolId = req.params.lolId;
    const reportCount = req.body.report_count;
    const mannerGrade = req.body.manner_grade;

    await lolUserService.reportLolUser({ lolId, reportCount, mannerGrade });
    res.status(201).json("신고가 등록되었습니다.");
  } catch (error) {
    res.status(500).json({ error });
  }
});

lolUserController.delete("/loluser/delete/:lolId", async (req, res) => {
  try {
    const lolId = req.params.lolId;
    await lolUserService.removeLolUser({ lolId });
    res.status(201).json("LOL 계정 삭제 성공");
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { lolUserController };
