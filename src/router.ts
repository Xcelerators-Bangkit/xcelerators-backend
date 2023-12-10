import express, { Router } from "express"
import userRouter from "./router/user";
import mountainRouter from "./router/mountain";
import articleRouter from "./router/article";

const router: Router = express.Router();

router.use(userRouter);
router.use(mountainRouter);
router.use(articleRouter);

export default router;