import {connection} from "../../index.js";

class user_controller {
    static async add_user({email_id, password, nickname, name, personal_info_agree, is_male, lol_id}){
        try {
                const query = `INSERT INTO users VALUES ('${email_id}','${password}','${nickname}','${name}','${personal_info_agree}','user','${is_male}','${lol_id}',null,now(),now())`;
                await connection.promise().query(query);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async get_users(){
        try {
            const query = `SELECT * FROM users`;
            const result = await connection.promise().query(query);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async set_user({email_id, password, nickname, name, lol_id}){
        try {
            const query = `UPDATE users SET password = '${password}', nickname = '${nickname}', name = '${name}', lol_id = '${lol_id}', updated_at = now() WHERE email_id = '${email_id}'`;
            await connection.promise().query(query);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async delete_user({email_id}){
        try {
            const query = `UPDATE users SET deleted_at = now(), updated_at = now() WHERE email_id = '${email_id}'`;
            await connection.promise().query(query);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
}

export {user_controller};