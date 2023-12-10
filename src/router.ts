import express, { Router } from "express"
import userRouter from "./router/user";
import mountainRouter from "./router/mountain";
import articleRouter from "./router/article";
import transactionRouter from "./router/transaction";

const router: Router = express.Router();

router.use(userRouter);
router.use(mountainRouter);
router.use(articleRouter);
router.use(transactionRouter)

export default router;