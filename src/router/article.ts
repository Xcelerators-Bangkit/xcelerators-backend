import express, { Router } from "express";
import { createArticleHandler, deleteArticleHandler, getArticleHandler } from "../controller/article";

const articleRouter: Router = express.Router();

articleRouter.post("/article", createArticleHandler);
articleRouter.get("/article/:id", getArticleHandler);
articleRouter.delete("/article/:id", deleteArticleHandler);

export default articleRouter;