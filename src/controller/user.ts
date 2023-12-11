import { Request, Response } from "express";
import * as msg from "../helper/responseMessage.js";
import prisma from "../model.js";

export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, name, password, identity_type, identity_number,
      gender, birthdate, address } = req.body;

    if (!email || !name || !password || !identity_type ||
      !identity_number || !gender || !birthdate || !address
    ) {
      return res.status(400).json({ ...msg.brq });
    }

    const emailPattern: RegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z]{1,10}$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ "message": "Invalid email" })
    }

    // Use ISO 8601 Format!!
    const dateParsed = new Date(birthdate)
    if (isNaN(dateParsed.getTime())) {
      return res.status(400).json({ "message": "Invalid birthdate" });
    }

    const checkEmail = await prisma.user.findUnique({
      where: { email },
    })
    if (checkEmail) {
      return res.status(400).json({ "message": "Email exist!" });
    }

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

export const getUserDetailHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const decodedEmail = decodeURIComponent(email);

    if (!decodedEmail) {
      return res.status(400).json({ ...msg.brq });
    }

    const job = await prisma.user.findUnique({
      where: { email: decodedEmail },
      select: {
        email: true,
        name: true,
        identity_type: true,
        identity_number: true,
        gender: true,
        birthdate: true,
        address: true,
      }
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

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ...msg.brq });
    }

    const job = await prisma.user.findUnique({
      where: { email },
    })
    if (!job) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (password !== job.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(204).send();
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
      return res.status(404).json({ "message": "User not found" });
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