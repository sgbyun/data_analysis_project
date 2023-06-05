import { connection } from "../../index.js";
import userModel from '../users/userModel.js';

class userService {
  static async addUser({ emailId, password, nickname, name, personalInfoAgree, grant, isMale, lolId }) {
    try {
      const query = userModel.insertUser;
      await connection.promise().query(query, [emailId, password, nickname, name, personalInfoAgree, grant, isMale, lolId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUsers() {
    try {
      const query = userModel.selectUser;
      const result = await connection.promise().query(query);
      return result[0][0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async setUser({ emailId, password, nickname, name, isMale, lolId }) {
    try {
      const query = userModel.updateUser;
      await connection.promise().query(query, [password, nickname, name, isMale, lolId, emailId]);
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