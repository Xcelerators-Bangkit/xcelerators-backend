import { Request, Response } from "express";
import * as msg from "../helper/responseMessage";
import prisma from "../model";
import checkImageUrl from "../helper/checkImageUrl";
import { randomPick } from "../helper/randomPick";

export const createArticleHandler = async (req: Request, res: Response) => {
  try {
    const { source_url, content, image_url } = req.body;
    if (!source_url || !content || !image_url) {
      return res.status(400).json({ ...msg.brq });
    }

    const imageExists = await checkImageUrl(image_url);
    if (!imageExists) {
      return res.status(400).json({ message: "Invalid image url!" });
    }

    const date = new Date;

    const job = await prisma.article.create({
      data: { source_url, content, image_url, date }
    })

    return res.status(201).json({ ...msg.suc, data: { id: job.id } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getArticleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ ...msg.brq });
    }

    const job = await prisma.article.findUnique({
      where: { id: parsedId },
    })
    if (!job) {
      return res.status(400).json({ ...msg.nof });
    }

    return res.status(200).json({ ...msg.suc, data: job });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getAllArticleHandler = async (req: Request, res: Response) => {
  try {
    const job = await prisma.article.findMany()

    return res.status(200).json({ ...msg.suc, data: job })
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getRandomArticleHandler = async (req: Request, res: Response) => {
  try {
    const itemCount = await prisma.article.count();
    const skip = Math.max(0, Math.floor(Math.random() * itemCount) - 5);

    const orderBy = randomPick(['id',
      "date",
      "source_url",
      "content",
      "image_url"
    ]) || 'id';
    const orderDir = randomPick(["asc", "desc"]);

    const job = prisma.article.findMany({
      take: 5,
      skip: skip,
      orderBy: { [orderBy]: orderDir },
    });

    return res.status(200).json({ ...msg.suc, data: job })
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const deleteArticleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ ...msg.brq });
    }

    const job = await prisma.article.findUnique({
      where: { id: parsedId },
    })
    if (!job) {
      return res.status(400).json({ ...msg.nof });
    }

    const deleteJob = await prisma.article.delete({
      where: { id: parsedId }
    })

    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}