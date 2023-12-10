import express, { Router } from "express";
import { createArticleHandler, deleteArticleHandler, getAllArticleHandler, getArticleHandler, getRandomArticleHandler } from "../controller/article";

const articleRouter: Router = express.Router();

articleRouter.post("/article", createArticleHandler);
articleRouter.get("/article/:id", getArticleHandler);
articleRouter.delete("/article/:id", deleteArticleHandler);
articleRouter.get("/all/article", getAllArticleHandler);
articleRouter.get("/random/article", getRandomArticleHandler);

export default articleRouter;