import express, { Application } from "express";
import cors from "cors";
import handleJsonError from "./middleware/handleJsonError";
import prisma from "./model";
import router from "./router";

const app: Application = express();

async function main() {
  // app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(handleJsonError);

  app.use(router);

  const port = 8080;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });