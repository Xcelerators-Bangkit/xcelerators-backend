import express, { Router } from "express";
import { createTransactionHandler, getTransactionByUserHandler, getTransactionDetailHandler } from "../controller/transaction.js";

const transactionRouter: Router = express.Router();

transactionRouter.post("/transaction", createTransactionHandler);
transactionRouter.get("/transaction/:email/:id", getTransactionDetailHandler);
transactionRouter.get("/transaction/:email", getTransactionByUserHandler);

export default transactionRouter