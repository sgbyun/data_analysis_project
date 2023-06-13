import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_KEY,
  },
});

// 인증 테이블 생성, email_id(외래키), 인증번호, created_at으로 구성
export function sendEmail(email_id, authKey) {
  return transporter.sendMail({
    from: process.env.EMAIL,
    to: email_id,
    subject: "[PECO] 비밀번호 변경을 위한 인증번호 발송 안내",
    html: `<h1>인증번호 : ${authKey}</h1>`,
  });
}
