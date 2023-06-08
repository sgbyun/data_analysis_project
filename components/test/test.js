import "dotenv/config";
import axios from "axios";
import { Router } from "express";
import { connection } from "../../index.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const client = new ImageAnnotatorClient({
  keyFilename: "./google_api_key.json",
});

const testController = Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 업로드 폴더 생성
    if (!fs.existsSync("upload/")) {
      fs.mkdirSync("upload/");
    }
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().replace(/:/g, "-");
    const filename = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, `${date}-${filename}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }); // 업로드된 파일을 저장할 폴더 경로를 지정합니다.

// 신고 등록
testController.post(
  "/test/googleapi",
  upload.single("testImage"),
  async (req, res) => {
    try {
      const testImage = req.file; // 사진 정보가 담겨있음
      const { mimetype, originalname, path } = testImage;
      const [result] = await client.textDetection(path);
      const annotations = result.textAnnotations;
      const textArray = annotations.map((annotation) => annotation.description);
      res.status(201).json(textArray[0]);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

testController.post("/send", (req, res) => {
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

export { testController };
