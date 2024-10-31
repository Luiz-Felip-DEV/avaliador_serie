import { Router } from "express";

import userController from "./app/Controller/userController.js";
import userRequest from "./app/Request/userRequest.js";

const router  = Router();

//POST
router.post('/user', userRequest.insertUser, userController.insertUser);
router.post('/login', userRequest.postLogin, userController.postLogin);


router.use((req, res) => {res.status(404).json({error: true, msgUser: "Rota não encontrada.", msgOriginal: "Rota não encontrada." })});

export default router 