import express, { Router } from "express";
import { createMountainHandler, getAllMountainHandler, getMountainDetailHandler, getRandomMountainHandler, updateMountainHandler } from "../controller/mountain";

const mountainRouter: Router = express.Router();

mountainRouter.post("/mountain", createMountainHandler);
mountainRouter.put("/mountain", updateMountainHandler);
mountainRouter.get("/mountain/:id", getMountainDetailHandler);
mountainRouter.get("/all/mountain", getAllMountainHandler);
mountainRouter.get("/random/mountain", getRandomMountainHandler);

export default mountainRouter;