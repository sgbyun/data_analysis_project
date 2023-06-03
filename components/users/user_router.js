import {Router} from "express";
import {user_controller} from "./user_controller.js";

const user_router = Router();

user_router.post("/user/register", async (req, res) => {
    console.log(req.body);
    try {
        const { email_id, password, nickname, name, personal_info_agree, is_male, lol_id } = req.body;

        await user_controller.add_user({email_id, password, nickname, name, personal_info_agree, is_male, lol_id});
        res.status(201).json("계정 생성 성공");
    } catch (error) {
        res.status(500).json({error});
    }
});

user_router.get("/userlist", async (req, res) => {
    try{
        const result = await user_controller.get_users();
        res.status(200).json(result);     
    } catch {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

user_router.put("/user/:email_id", async (req, res) => {
    try {
        const email_id = req.params.email_id;
        const { password, nickname, name, lol_id } = req.body;
        await user_controller.set_user({email_id, password, nickname, name, lol_id});
        res.status(201).json("정보 수정 성공");
    } catch (error) {
        res.status(500).json({ error });
    }
});

user_router.put("/userdelete/:email_id", async (req,res) => {
    try{
        const email_id = req.params.email_id;
        await user_controller.delete_user({email_id});
        res.status(200).json("계정이 삭제되었습니다.");
    } catch (error) {
        res.status(500).json({error});
    }
});

export { user_router };