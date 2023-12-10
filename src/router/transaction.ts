import express, { Router } from "express";
import { createTransactionHandler } from "../controller/transaction";

const transactionRouter: Router = express.Router();

transactionRouter.post("/transaction", createTransactionHandler);

export default transactionRouter