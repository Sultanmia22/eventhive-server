import type { NextFunction, Request, Response } from "express";
import type { TUserRole } from "../constants/role";
import { AppError } from "../errors/AppError";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config";

export const auth =  (...allowedRoles: TUserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(401, "Unauthorized: Missing token");
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      throw new AppError(401, "Unauthorized: Invalid token format");
    }

    let decoded: JwtPayload & { id: number; role: TUserRole };

    try {
      decoded = jwt.verify(token, config.jwt_secret) as JwtPayload & {
        id: number;
        role: TUserRole;
      };
    } catch {
      throw new AppError(401, "Unauthorized: Invalid or expired token");
    }

    if (!decoded?.id || !decoded?.role) {
      throw new AppError(401, "Unauthorized: Invalid token payload");
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      throw new AppError(
        403,
        "Forbidden: You do not have permission to perform this action",
      );
    };

    next();
  };
};
