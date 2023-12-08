import express, { Router } from "express"
import userRouter from "./router/user";
import mountainRouter from "./router/mountain";

const router: Router = express.Router();

router.use(userRouter);
router.use(mountainRouter);

export default router;