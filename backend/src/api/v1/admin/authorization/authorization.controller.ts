import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import {
  TCreateAdminRole,
  TDeleteAdminRole,
  TUpdateAdminRole,
} from "./authorization.model";
import { TAdminId } from "../admin.model";
import { BadRequestError } from "../../../../errors/bad-request-error";

const prisma = new PrismaClient();

export const AuthorizationAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = <TCreateAdminRole>req.body;
    const { admin_id } = <TAdminId>req.params;
    const IAdmin = await prisma.adminRole.findMany({
      where: { adminId: admin_id },
    });

    if (IAdmin.length !== 0) {
      throw new BadRequestError("This admin added roles.");
    }
    const AdminRole = data.rolesId.map((item) => ({
      adminId: admin_id,
      roleId: item,
    }));
    const results = await prisma.adminRole.createMany({
      data: AdminRole,
    });
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const EditAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = <TUpdateAdminRole>req.body;
    const { admin_id } = <TAdminId>req.params;
    const AdminRole = await prisma.adminRole.findMany({
      where: { adminId: admin_id },
    });

    const dataToAdd = data.rolesId.filter(
      (item) => !AdminRole.find((i) => i.roleId === item)
    );
    const dataToDelete = AdminRole.filter(
      (item) => !data.rolesId.find((i) => i === item.roleId)
    );

    const resultToAdd = await prisma.adminRole.createMany({
      data: dataToAdd.map((item) => ({
        adminId: admin_id,
        roleId: item,
      })),
    });

    const resultToDelete = await prisma.adminRole.deleteMany({
      where: {
        roleId: { in: dataToDelete.map((item) => item.roleId) },
      },
    });
    const results = JSON.stringify({ resultToAdd, resultToDelete })
    res.json(results);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const RemoveAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = <TDeleteAdminRole>req.body;
    const { admin_id } = <TAdminId>req.params;
    const results = await prisma.adminRole.deleteMany({
      where: {
        roleId: { in: data.rolesId },
        adminId: { in: admin_id}
      },
    });
    res.json(results);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetAdminRoleAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { admin_id } = <TAdminId>req.params;
    const results = await prisma.adminRole.findMany({
      where: { adminId: admin_id },
      include: {
        role: true,
      },
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
