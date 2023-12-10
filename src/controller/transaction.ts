import { Request, Response } from "express";
import * as msg from "../helper/responseMessage";
import prisma from "../model";

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
        mountain_id, user_email, total_price, date
      }
    })

    return res.status(201).json({ ...msg.suc, data: { id: job.id } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}
