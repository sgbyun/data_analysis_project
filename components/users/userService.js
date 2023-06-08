import { connection } from "../../index.js";
import userModel from "../users/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./User.js";
class userService {
  static async addUser(user) {
    try {
      const query = userModel.insertUser;
      await connection
        .promise()
        .query(query, [
          user.emailId,
          user.password,
          user.nickname,
          user.name,
          user.personalInfoAgree,
          user.grant,
          user.isMale,
          user.lolId,
        ]);
    } catch (error) {
      if (
        error.sqlState === "23000" &&
        error.sqlMessage.includes("Duplicate entry")
      ) {
        throw new Error(
          "이미 등록된 이메일입니다. 다른 이메일을 사용해주세요."
        );
      } else {
        throw error; // 오류를 그대로 던져서 처리합니다.
      }
    }
  }

  static async getUsers() {
    try {
      const query = userModel.selectUser;
      const result = await connection.promise().query(query);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserOne({ emailId }) {
    try {
      const query = userModel.selectUserOne;
      const result = await connection.promise().query(query, [emailId]);
      return result[0][0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async setUser(user) {
    try {
      console.log("Service user", user);
      const query = userModel.updateUser;
      await connection
        .promise()
        .query(query, [
          user.password,
          user.nickname,
          user.name,
          user.isMale,
          user.lolId,
          user.emailId,
        ]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async removeUser({ emailId }) {
    try {
      const query = userModel.deleteUser;
      await connection.promise().query(query, [emailId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async loginUser({ emailId, password }) {
    try {
      const user = await userService.getUserOne({ emailId });

      if (!user) {
        const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
        throw new Error(errorMessage);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const secretKey = process.env.JWT_SECRET_KEY || "secret_key";
        const token = jwt.sign({ emailId: user.email_id }, secretKey);
        return token;
      } else {
        throw new Error(
          "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
        );
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { userService };
