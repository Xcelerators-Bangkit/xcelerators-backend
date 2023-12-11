import { Request, Response } from "express"
import * as msg from "../helper/responseMessage.js";
import shortUID from "../helper/shortUID.js";
import { storage, bucketName } from "../helper/bucket.js";
import imageType from "image-type";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) { return res.status(400).json({ message: "No file uploaded" }) }

    const fileExtension = req.file.originalname.split('.').pop();

    if (!fileExtension) {
      return res.status(400).json({
        message: 'Bad Request - File extension not supported'
      })
    }

    const allowedExtensions = ['jpg', 'jpeg', 'jpe', 'png', 'webp', 'gif']

    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
      return res.status(400).json({
        message: `${msg.brq.message} - File extension not supported`
      });
    }
    // const fileName = Date.now() + '-' + req.file.originalname;
    const fileName = Date.now() + '-' + shortUID(5) + '.' + fileExtension;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: { contentType: req.file.mimetype, },
    });

    stream.on('error', (err) => {
      console.error(err);
      return res.status(500).json({ message: 'Error uploading file' });
    });

    stream.on('finish', () => {
      return res.status(201).json({
        message: 'File uploaded to bucket successfully',
        data: { fileName },
      });
    });

    stream.end(req.file.buffer);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getImage = async (req: Request, res: Response) => {
  const fileName = req.params.fileName;

  const file = storage.bucket(bucketName).file(fileName);

  file.exists((err: any, exists: any) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error checking file existence' });
      return;
    }

    if (!exists) {
      res.status(404).json({ ...msg.nof });
      return;
    }

    // Check the image type
    const readStream = file.createReadStream();
    const chunks: any[] = [];

    readStream
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', async () => {
        const buffer = Buffer.concat(chunks);

        // Use image-type to get image type
        const contentType = await imageType(buffer);

        if (!contentType) {
          res.status(500).json({ message: 'Unable to determine image type' });
          return;
        }

        res.setHeader('Content-Type', contentType.mime);

        file.createReadStream().pipe(res);
      })
      .on('error', (err) => {
        console.error(err);
        res.status(500).json({ message: 'Error downloading file' });
      });
  });
};