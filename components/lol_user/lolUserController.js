import "dotenv/config";
import { Router } from "express";
import { lolUserService } from "./lolUserService.js";
import { LolUser } from "./lolUser.js";
import { login_required } from "../middlewares/login_required.js";

const lolUserController = Router();

lolUserController.post("/lolUser/check", async (req, res) => {
  try {
    const lolUser = new LolUser(req.body.lolId);
    const checkApi = await lolUserService.checkLolUser(lolUser);
    res.status(200).json(checkApi);
  } catch (error) {
    res.status(500).json({ error });
  }
});

lolUserController.post("/lolUser/register", async (req, res) => {
  try {
    const lolUser = new LolUser(req.body.lolId);
    const checkUser = await lolUserService.getLolUser(lolUser);
    if (checkUser) {
      res.status(400).json("이미 존재하는 LOL 계정입니다.");
    } else {
      await lolUserService.addLolUser(lolUser);
      res.status(201).json("LOL 계정 정보 생성 성공");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

lolUserController.get("/lolUser/:lolId", async (req, res) => {
  try {
    const lolUser = new LolUser(req.params.lolId);
    const userInfo = await lolUserService.getLolUser(lolUser);
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      await lolUserService.addLolUser(lolUser);
      const userInfo = await lolUserService.getLolUser(lolUser);
      res.status(201).json(userInfo);
    }
  } catch (error) {
    res.status(500).json("존재하지 않는 LOL 계정입니다.");
  }
});

lolUserController.get("/lolUser/update/:lolId", async (req, res) => {
  try {
    const lolUser = new LolUser(req.params.lolId);
    await lolUserService.setLolUser(lolUser);
    res.status(201).json("LOL 계정 정보 갱신 성공");
  } catch (error) {
    res.status(500).json({ error });
  }
});

lolUserController.put(
  "/lolUser/report/:lolId",
  login_required,
  async (req, res) => {
    try {
      const lolId = req.params.lolId;
      const reportCount = req.body.report_count;
      const mannerGrade = req.body.manner_grade;
      const lolUser = await lolUserService.getLolUser({ lolId });
      console.log("found user:", lolUser);
      if (!lolUser) {
        res.status(400).json("존재하지 않는 LOL 계정입니다.");
      }

      const updatedLolUser = new LolUser(
        lolUser.lol_id,
        reportCount,
        mannerGrade
      );

      await lolUserService.reportLolUser(updatedLolUser);
      res.status(201).json("신고가 등록되었습니다.");
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

lolUserController.delete("/lolUser/delete/:lolId", async (req, res) => {
  try {
    const lolUser = new LolUser(req.params.lolId);
    await lolUserService.removeLolUser(lolUser);
    res.status(201).json("LOL 계정 삭제 성공");
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { lolUserController };
