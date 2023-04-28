import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { TCrateRole, TRoleId, TUpdateRole } from "./roles.model";
import { BadRequestError } from "../../../../errors/bad-request-error";
const prisma = new PrismaClient();

export const CreateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = <TCrateRole>req.body;
    const role = await prisma.role.create({
      data: {
        name: data.name,
      },
    });

    const RolePermission = data.permissions.map((item) => ({
      role_id: role.id,
      permission_id: item,
    }));

    const result = await prisma.rolePermission.createMany({
      data: RolePermission,
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const EditRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = <TUpdateRole>req.body;
    const { role_id } = <TRoleId>req.params;
    if (isNaN(parseInt(role_id))) {
      throw new BadRequestError("Data is non a number.");
    }
    const id: number = parseInt(role_id);

    const RolePermission = await prisma.rolePermission.findMany({
      where: { role_id: id },
    });

    const dataToAdd = data.permissions.filter(
      (item) => !RolePermission.find((i) => i.permission_id === item)
    );
    const dataToDelete = RolePermission.filter(
      (item) => !data.permissions.find((i) => i === item.permission_id)
    );

    const role = await prisma.role.update({
      where: { id },
      data: {
        name: data.name,
      },
    });

    const resultToAdd = await prisma.rolePermission.createMany({
      data: dataToAdd.map((item) => ({
        role_id: id,
        permission_id: item,
      })),
    });

    const resultToDelete = await prisma.rolePermission.deleteMany({
      where: {
        permission_id: { in: dataToDelete.map((item) => item.permission_id) },
      },
    });

    res.json(role);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const RemoveRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role_id } = <TRoleId>req.params;
    if (isNaN(parseInt(role_id))) {
      throw new BadRequestError("Data is non a number.");
    }
    const id: number = parseInt(role_id);
    const RolePermission = await prisma.rolePermission.deleteMany({
      where: { role_id: id },
    });
    const result = await prisma.role.delete({ where: { id } });
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetRoleAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const RolePermissions = await prisma.rolePermission.findMany({
      include: {
        permission: true,
        role: true,
      },
    });

    const results: any = RolePermissions.reduce((acc: any, item) => {
      if (!acc[item.role_id]) {
        acc[item.role_id] = {
          roles: item.role,
          permissions: [],
        };
      }

      acc[item.role_id].permissions.push(item.permission);

      return acc;
    }, {});

    const result = Object.values(results);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role_id } = <TRoleId>req.params;
    if (isNaN(parseInt(role_id))) {
      throw new BadRequestError("Data is non a number.");
    }
    const id: number = parseInt(role_id);
    const RolePermissions = await prisma.rolePermission.findMany({
      where: { role_id: id },
      include: {
        permission: true,
        role: true,
      },
    });

    const results: any = RolePermissions.reduce((acc: any, item) => {
      if (!acc[item.role_id]) {
        acc[item.role_id] = {
          roles: item.role,
          permissions: [],
        };
      }

      acc[item.role_id].permissions.push(item.permission);

      return acc;
    }, {});

    const result = Object.values(results);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
