import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { TCreateAdminRole, TDeleteAdminRole } from "./authorization.model";
import { TAdminId } from "../admin.model";

const prisma = new PrismaClient();

export const AuthorizationAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = <TCreateAdminRole>req.body;
    const { admin_id } = <TAdminId>req.params;
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
    const data = <TDeleteAdminRole>req.body
    const results = await prisma.adminRole.deleteMany({
        where:{
            roleId: {in : data.rolesId}
        }
    })
    res.json(results)
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
    const {admin_id} = <TAdminId>req.params
    const results = await prisma.adminRole.findMany({
        where: {adminId: admin_id},
        include: {
            role: true,
        }
    })
   
      res.json(results)
  } catch (error) {
    console.log(error);
    next(error);
  }
};

