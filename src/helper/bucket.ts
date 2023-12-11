import { Storage } from "@google-cloud/storage";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentFileURL = import.meta.url;
const currentDir = dirname(fileURLToPath(currentFileURL));
const projectRoot = join(currentDir, '../..');

export const storage = new Storage({
  keyFilename: join(projectRoot, 'xcelerators-capstone-7e35d7e878ed.json')
});

export const bucketName = "xcelerators-bucket";
