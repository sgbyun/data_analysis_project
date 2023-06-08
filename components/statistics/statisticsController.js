import "dotenv/config";
import { Router } from "express";
import { statisticsService } from "./statisticsService.js";

const statsController = Router();

statsController.get("/stats/genderRatio", async (req, res) => {
  try {
    const genderRatio = await statisticsService.getGenderRatio();
    res.status(200).json(genderRatio);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { statsController };
