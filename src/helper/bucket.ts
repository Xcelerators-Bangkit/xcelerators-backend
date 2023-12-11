import { Storage } from "@google-cloud/storage";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentFileURL = import.meta.url;
const currentDir = dirname(fileURLToPath(currentFileURL));
const projectRoot = join(currentDir, '../..');

export const storage = new Storage({
  keyFilename: join(projectRoot, 'service-account-storage.json')
});

export const bucketName = "xcelerators-bucket";
