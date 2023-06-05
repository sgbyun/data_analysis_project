import axios from "axios";
import { Router } from "express";
import "dotenv/config";

const reportController = Router();

reportController.post("/send", (req, res) => {
  const dataToSend = req.body.message;

  axios
    .post(process.env.FLASK_ADDRESS, { dataToSend })
    .then((response) => {
      console.log("Received response:", response.data);
      // 받은 응답을 처리하는 로직을 추가
      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("An error occurred");
    });
});

export { reportController };
