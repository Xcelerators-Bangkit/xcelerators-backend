import { Request, Response } from "express";
import * as msg from "../helper/responseMessage.js";
import prisma from "../model.js";
import { randomPick } from "../helper/randomPick.js";

export const createMountainHandler = async (req: Request, res: Response) => {
  try {
    const { name, about, elevation, location, image_url, price, open_status } = req.body;

    if (!name || !about || !elevation || !location || !image_url || !price || !open_status) {
      return res.status(400).json({ ...msg.brq });
    }

    if (isNaN(elevation) || isNaN(price)) {
      return res.status(400).json({ "message": "Bad data for 'price' or 'elevation'" });
    }
    if (typeof open_status !== 'boolean') {
      return res.status(400).json({ "message": "Bad data for 'open_status" });
    }

    const job = await prisma.mountain.create({
      data: { name, about, elevation, location, image_url, price, open_status }
    })

    return res.status(201).json({ ...msg.suc, data: { id: job.id } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getMountainDetailHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).json({ ...msg.brq });
    }

    const job = await prisma.mountain.findUnique({
      where: { id: parsedId },
    })
    if (!job) {
      return res.status(404).json({ ...msg.nof });
    }

    return res.status(200).json({ ...msg.suc, data: job })
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getAllMountainHandler = async (req: Request, res: Response) => {
  try {
    const job = await prisma.mountain.findMany({
      select: {
        id: true,
        name: true,
        elevation: true,
        location: true,
        image_url: true,
        price: true,
        open_status: true,
        about: true,
      }
    })

    return res.status(200).json({ ...msg.suc, data: job })
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getRandomMountainHandler = async (req: Request, res: Response) => {
  try {
    const itemCount = await prisma.mountain.count();
    const skip = Math.max(0, Math.floor(Math.random() * itemCount) - 5);

    const orderBy = randomPick(['id', 'name', 'elevation', 'location',
      'image_url', 'price', 'open_status'
    ]) || 'id';
    const orderDir = randomPick(["asc", "desc"]);

    const job = prisma.mountain.findMany({
      take: 5,
      skip: skip,
      orderBy: { [orderBy]: orderDir },
      select: {
        id: true,
        name: true,
        elevation: true,
        location: true,
        image_url: true,
        price: true,
        open_status: true,
      },
    });

    return res.status(200).json({ ...msg.suc, data: job })
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const updateMountainHandler = async (req: Request, res: Response) => {
  try {
    const { id, name, about, elevation, location, image_url, price, open_status } = req.body;

    if (!id || !name || !about || !elevation || !location || !image_url || !price || !open_status) {
      return res.status(400).json({ ...msg.brq });
    }

    if (isNaN(id) || isNaN(elevation) || isNaN(price)) {
      return res.status(400).json({ "message": "Bad data for 'id' or 'price' or 'elevation'" });
    }
    if (typeof open_status !== 'boolean') {
      return res.status(400).json({ "message": "Bad data for 'open_status" });
    }

    const checkId = await prisma.mountain.findUnique({
      where: { id },
    })
    if (!checkId) {
      return res.status(404).json({ "message": "Mountain not found" });
    }

    const job = await prisma.mountain.update({
      where: { id },
      data: { name, about, elevation, location, image_url, price, open_status },
    })

    return res.status(200).json({ ...msg.suc, data: { id } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}