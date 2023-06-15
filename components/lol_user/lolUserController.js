import "dotenv/config";
import { Router } from "express";
import { lolUserService } from "./lolUserService.js";
import { LolUser } from "./lolUser.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { logger } from "../utils/winston.js";

const lolUserController = Router();

lolUserController.post("/lolUser/check", async (req, res) => {
  try {
    const lolUser = new LolUser(req.body.lolId);
    const checkApi = await lolUserService.checkLolUser(lolUser);
    logger.info("riot api 롤 유저 조회 성공");
    res.status(200).json(checkApi);
  } catch (error) {
    logger.error("riot api 롤 유저 조회 실패");
    res.status(500).json({ error });
  }
});

lolUserController.post("/lolUser/register", async (req, res) => {
  try {
    const lolUser = new LolUser(req.body.lolId);
    const checkUser = await lolUserService.getLolUser(lolUser);
    if (checkUser) {
      logger.info("lol user 조회 성공");
      res.status(400).json("이미 존재하는 LOL 계정입니다.");
    } else {
      logger.info("lol user 생성 성공");
      await lolUserService.addLolUser(lolUser);
      res.status(201).json("LOL 계정 정보 생성 성공");
    }
  } catch (error) {
    logger.error("lol user 조회 or 생성 실패");
    res.status(500).json({ error });
  }
});

// email_id로 lol_user 조회
lolUserController.get("/lolUser/my", loginRequired, async (req, res) => {
  try {
    const emailId = req.currentEmailId;
    const userInfo = await lolUserService.getLolUserByEmailId(emailId);
    logger.info("email_id로 lol user 조회 성공");
    res.status(200).json(userInfo);
  } catch (error) {
    logger.error("email_id로 lol user 조회 실패");
    res.status(500).json({ error });
  }
});

// lol_id로 lol_user 조회
lolUserController.get("/lolUser/:lolId", async (req, res) => {
  try {
    const lolUser = new LolUser(req.params.lolId);
    const userInfo = await lolUserService.getLolUser(lolUser);
    if (userInfo) {
      logger.info("db에 있는 lol_user 조회 성공");
      res.status(200).json(userInfo);
    } else {
      await lolUserService.addLolUser(lolUser);
      const userInfo = await lolUserService.getLolUser(lolUser);
      logger.info("db에 lol_user 생성후 조회 성공");
      res.status(201).json(userInfo);
    }
  } catch (error) {
    logger.error("롤 유저 조회 실패(riot api or 닉네임 없음");
    res.status(500).json("존재하지 않는 LOL 계정입니다.");
  }
});

lolUserController.get("/lolUser/update/:lolId", async (req, res) => {
  try {
    const lolUser = new LolUser(req.params.lolId);
    await lolUserService.setLolUser(lolUser);
    logger.info("lol_User db 갱신 성공");
    res.status(201).json("LOL 계정 정보 갱신 성공");
  } catch (error) {
    logger.error("lol_user db 갱신 실패");
    res.status(500).json({ error });
  }
});

lolUserController.put(
  "/lolUser/report/:lolId",
  loginRequired,
  async (req, res) => {
    try {
      const lolId = req.params.lolId;
      const reportCount = req.body.report_count;
      const mannerGrade = req.body.manner_grade;
      const lolUser = await lolUserService.getLolUser({ lolId });
      if (!lolUser) {
        res.status(400).json("존재하지 않는 LOL 계정입니다.");
      }

      const updatedLolUser = new LolUser(
        lolUser.lol_id,
        reportCount,
        mannerGrade
      );

      logger.info("lol_user 신고 정보 갱신 성공");
      await lolUserService.reportLolUser(updatedLolUser);
      res.status(201).json("신고가 등록되었습니다.");
    } catch (error) {
      logger.error("lol_user 신고 정보 갱신 실패");
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
