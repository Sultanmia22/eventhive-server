import type { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../../modules/auth/auth.interface";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: number;
        role: TUserRole;
      };
    }
  }
}