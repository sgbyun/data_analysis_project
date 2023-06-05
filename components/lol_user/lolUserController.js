import 'dotenv/config'
import {Router} from 'express';
import { lolUserService } from './lolUserService.js';

const lolUserController = Router();

lolUserController.post("/loluser", async (req, res) => {
    console.log(req.body);
    try{
        const lolId = req.body.lolId;
        await lolUserService.addLolUser({lolId})
        res.status(200).json("LOL 계정 정보 생성 성공");

    } catch (error) {
        res.status(500).json({error});
    }
})

export {lolUserController};