import { Router } from "express";


const router  = Router();


router.use((req, res) => {res.status(404).json({error: true, msgUser: "Rota não encontrada.", msgOriginal: "Rota não encontrada." })});

export default router 