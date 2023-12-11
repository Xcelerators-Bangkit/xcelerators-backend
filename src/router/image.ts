import express, { Router } from "express";
import { getImage, uploadImage } from "../controller/image.js";
import upload from "../helper/upload.js";

const imageRouter: Router = express.Router();

imageRouter.get("/asset/image/:fileName", getImage);
imageRouter.post("/asset/image", upload.single('file'), uploadImage);

export default imageRouter;