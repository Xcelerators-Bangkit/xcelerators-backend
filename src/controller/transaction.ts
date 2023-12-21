import { Request, Response } from "express";
import * as msg from "../helper/responseMessage.js";
import prisma from "../model.js";

export const createTransactionHandler = async (req: Request, res: Response) => {
  try {
    const { mountain_id, user_email, date } = req.body;

    if (!mountain_id || !user_email || !date) {
      return res.status(400).json({ ...msg.brq });
    }

    // Use ISO 8601 Format!!
    const dateParsed = new Date(date)
    if (isNaN(dateParsed.getTime())) {
      return res.status(400).json({ "message": "Invalid date" });
    }

    const checkmountainID = await prisma.mountain.findUnique({
      where: { id: mountain_id },
    })
    if (!checkmountainID) {
      return res.status(400).json({ "message": "Mountain id not exist!" });
    }

    const checkEmail = await prisma.user.findUnique({
      where: { email: user_email },
    })
    if (!checkEmail) {
      return res.status(400).json({ "message": "Email not exist!" });
    }

    const total_price = checkmountainID.price;

    const job = await prisma.transaction.create({
      data: {
        mountain_id, user_email, total_price, date: dateParsed
      }
    })

    return res.status(201).json({ ...msg.suc, data: { id: job.id } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getTransactionDetailHandler = async (req: Request, res: Response) => {
  try {
    const { email, id } = req.params;
    const decodedEmail = decodeURIComponent(email);
    const decodedId = decodeURIComponent(id);

    if (!decodedId || !decodedEmail) {
      return res.status(400).json({ ...msg.brq });
    }

    const job = await prisma.transaction.findUnique({
      where: { id: decodedId },
      include: {
        mountain: { select: { name: true } },
        user: { select: { name: true } },
      }
    })
    if (!job) {
      return res.status(404).json({ ...msg.nof });
    }
    if (decodedEmail !== job.user_email) {
      return res.status(404).json({ ...msg.nof })
    }

    // Extract the mountain name from the nested structure
    const { mountain, user, ...rest } = job;

    return res.status(200).json({
      ...msg.suc,
      data: { ...rest, mountain_name: mountain.name, user_name: user.name }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const getTransactionByUserHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const decodedEmail = decodeURIComponent(email);

    if (!decodedEmail) {
      return res.status(400).json({ ...msg.brq });
    }

    const job1 = await prisma.user.findUnique({ where: { email } })
    if (!job1) { return res.status(404).json({ "message": "User not found" }) }

    const job2 = await prisma.transaction.findMany({
      where: { user_email: decodedEmail },
      include: {
        mountain: { select: { name: true } },
        user: { select: { name: true } },
      },
      orderBy: { t_time: "desc" }
    })

    const formattedTransactions = job2.map((transaction) => {
      const { mountain, user, ...rest } = transaction;
      return {
        ...msg.suc,
        data: { ...rest, mountain_name: mountain.name, user_name: user.name },
      };
    });

    return res.status(200).json(formattedTransactions);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}