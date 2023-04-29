import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { TAdminId, TCreateAdmin } from "./admin.model";
import ShortUniqueId from "short-unique-id";
import { BadRequestError } from "../../../errors/bad-request-error";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const CreateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = <TCreateAdmin>req.body;
    const uid = new ShortUniqueId();

    const eAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (eAdmin) {
      throw new BadRequestError("Email already used");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const result = await prisma.admin.create({
      data: {
        id: `admin_${uid.stamp(15)}`,
        username,
        email,
        password: hash,
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const EditAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = <TCreateAdmin>req.body;
    const { admin_id } = <TAdminId>req.params;

    // const eAdmin = await prisma.admin.findUnique({
    //   where: { email },
    // });

    // if (eAdmin && eAdmin.email !== email) {
    //   throw new BadRequestError("Email already used");
    // }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const result = await prisma.admin.update({
      where: { id: admin_id },
      data: {
        username,
        email,
        password: hash,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetAdminAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await prisma.admin.findMany();

    res.json(results);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { admin_id } = <TAdminId>req.params;
    const result = await prisma.admin.findUnique({ where: { id: admin_id } });
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const RemoveAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { admin_id } = <TAdminId>req.params;
    const result = await prisma.admin.delete({ where: { id: admin_id } });
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
 