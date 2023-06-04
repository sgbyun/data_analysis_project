import {connection} from "../../index.js";

class userModel {
    static async addUser({emailId, password, nickname, name, personalInfoAgree, grant, isMale, lolId}){
        try {
                const query = `INSERT INTO users VALUES ('${emailId}','${password}','${nickname}','${name}','${personalInfoAgree}','${grant}','${isMale}','${lolId}',null,now(),now())`;
                await connection.promise().query(query);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getUsers(){
        try {
            const query = `SELECT * FROM users`;
            const result = await connection.promise().query(query);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async setUser({emailId, password, nickname, name, isMale, lolId}){
        try {
            const query = `UPDATE users SET password = '${password}', nickname = '${nickname}', name = '${name}', is_male=${isMale} ,lol_id = '${lolId}', updated_at = now() WHERE email_id = '${emailId}'`;
            await connection.promise().query(query);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteUser({emailId}){
        try {
            const query = `UPDATE users SET deleted_at = now(), updated_at = now() WHERE email_id = '${emailId}'`;
            await connection.promise().query(query);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
}

export {userModel};