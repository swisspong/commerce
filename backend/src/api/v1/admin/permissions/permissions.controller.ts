import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import {
  TCreatePermission,
  TPermissionId,
  TUpdatePermission,
} from "./permissions.model";
import { BadRequestError } from "../../../../errors/bad-request-error";
const prisma = new PrismaClient();

export const CreatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = <TCreatePermission>req.body;

    const permission = await prisma.permission.findUnique({
      where: { name },
    });

    if (permission) {
      throw new BadRequestError("This title already exists.");
    }

    const result = await prisma.permission.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const EditPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = <TUpdatePermission>req.body;
    const { permission_id } = <TPermissionId>req.params;
    if (isNaN(parseInt(permission_id))) {
      throw new BadRequestError("Data is non a number.");
    }
    const id: number = parseInt(permission_id);
    
    const result = await prisma.permission.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetPermissionAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await prisma.permission.findMany();

    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetPermissionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { permission_id } = <TPermissionId>req.params;
    if (isNaN(parseInt(permission_id))) {
      throw new BadRequestError("Data is non a number.");
    }
    const id: number = parseInt(permission_id);
    const result = await prisma.permission.findUnique({ where: { id } });
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const RemovePermissionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { permission_id } = <TPermissionId>req.params;
    if (isNaN(parseInt(permission_id))) {
      throw new BadRequestError("Data is non a number.");
    }
    const id: number = parseInt(permission_id);
    const result = await prisma.permission.delete({ where: { id } });
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
