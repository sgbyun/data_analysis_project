import { connection } from "../../index.js";
import userModel from "../users/userModel.js";
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
      throw new Error(error.message);
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
}

export { userService };
