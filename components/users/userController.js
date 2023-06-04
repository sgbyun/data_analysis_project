import {Router} from 'express';
import {userModel} from "./userModel.js";
// import {User} from './User.js

const userController = Router();

userController.post("/user/register", async (req, res) => {
    console.log(req.body);
    try {
        const {emailId, password, nickname, name, personalInfoAgree, isMale, lolId} = req.body;
        const grant = 'user';

        await userModel.addUser({emailId, password, nickname, name, personalInfoAgree, grant, isMale, lolId});
        res.status(201).json("계정 생성 성공");
    } catch (error) {
        res.status(500).json({error});
    }
});

userController.get("/userlist", async (req, res) => {
    try{
        const result = await userModel.getUsers();
        res.status(200).json(result);     
    } catch {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

userController.put("/user/:emailId", async (req, res) => {
    try {
        const emailId = req.params.emailId;
        const { password, nickname, name, isMale, lolId } = req.body;
        await userModel.setUser({emailId, password, nickname, name, isMale, lolId});
        res.status(201).json("정보 수정 성공");
    } catch (error) {
        res.status(500).json({ error });
    }
});

// 코치님 피드백
userController.delete("/user/:emailId", async (req,res) => {
    try{
        const emailId = req.params.emailId;
        await userModel.deleteUser({emailId});
        res.status(200).json("계정이 삭제되었습니다.");
    } catch (error) {
        res.status(500).json({error});
    }
});


export {userController};