import express, { Router } from "express"
import userRouter from "./router/user.js";
import mountainRouter from "./router/mountain.js";
import articleRouter from "./router/article.js";
import transactionRouter from "./router/transaction.js";
import imageRouter from "./router/image.js";

const router: Router = express.Router();

router.use(userRouter);
router.use(mountainRouter);
router.use(articleRouter);
router.use(transactionRouter);
router.use(imageRouter);

export default router;