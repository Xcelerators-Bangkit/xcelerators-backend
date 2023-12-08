import express, { Router } from "express";
import { createMountainHandler, updateMountainHandler } from "../controller/mountain";

const mountainRouter: Router = express.Router();

mountainRouter.post("/mountain", createMountainHandler);
mountainRouter.put("/mountain", updateMountainHandler);

export default mountainRouter;