import { Request, Response } from "express";
import * as msg from "../helper/responseMessage";
import prisma from "../model";

export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, name, password, identity_type, identity_number, gender, birthdate, address } = req.body;
    if (!email || !name || !password || !identity_type || !identity_number || !gender || !birthdate || !address) {
      return res.status(400).json({ ...msg.brq });
    }

    const dateParsed = new Date(birthdate)

    const job = await prisma.user.create({
      data: {
        email, name, password, identity_number, identity_type, gender, birthdate: dateParsed, address
      }
    })

    return res.status(201).json({ ...msg.suc, data: { email: job.email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, name, password, identity_type, identity_number, gender, birthdate, address } = req.body;
    if (!email || !name || !password || !identity_type || !identity_number || !gender || !birthdate || !address) {
      return res.status(400).json({ ...msg.brq });
    }

    const checkEmail = await prisma.user.findUnique({
      where: { email },
    })
    if (!checkEmail) {
      return res.status(404).json({ message: "User not found" });
    }

    const dateParsed = new Date(birthdate)

    const job = await prisma.user.update({
      where: { email },
      data: {
        name, password, identity_number, identity_type, gender, birthdate: dateParsed, address
      }
    })

    return res.status(200).json({ ...msg.suc, data: { email: job.email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ...msg.ise });
  }
}