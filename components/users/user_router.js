import {Router} from "express";
import {connection} from "../../index.js";

const user_router = Router();

user_router.post("/test", (req, res) => {
    console.log(req.body);
    try {
        const email_id = req.body.email_id;
        const password = req.body.password;
        const nickname = req.body.nickname;
        const name = req.body.name;
        const personal_info_agree = req.body.personal_info_agree;
        const is_male = req.body.is_male;
        const lol_id = req.body.lol_id; // controller

        const query = `INSERT INTO users VALUES ('${email_id}','${password}','${nickname}','${name}','${personal_info_agree}','user','${is_male}','${lol_id}',null,now(),now())`;
        connection.query(query, (error, result) => {
            if (error) {
                throw new Error(error.message);
            }
            res.status(201).json("계정 생성 성공");
        });
    } catch (error) {
        res.status(500).json({error});
    }
});

user_router.get("/test", (req, res) => {
    try{
        const query = "SELECT * FROM users";
        connection.query(query, (error, result) => {
            if (error) {
            throw new Error(error.message);
            }
        res.status(200).json(result);
        });
    } catch {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export { user_router };