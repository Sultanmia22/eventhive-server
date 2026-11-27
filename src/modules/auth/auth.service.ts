import bcrypt, { hash } from "bcryptjs";
import { pool } from "../../db";
import type { ICreateUserPayload, ILoginUserPayload } from "./auth.interface";
import { AppError } from "../../errors/AppError";
import jwt, { type SignOptions } from "jsonwebtoken";
import config from "../../config";

// create user
const createUserIntoDB = async (payload: ICreateUserPayload) => {
  const { name, email, password, role } = payload;

  // Hash Password
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
         INSERT INTO users (name, email, password, role)
         VALUES($1, $2, $3, COALESCE($4,'attendee')) 
         RETURNING *
        `,
    [name, email, hashPassword, role],
  );

  //delete password from response
  delete result.rows[0].password;

  return result;
};

// login user
const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const result = await pool.query(
    `
            SELECT * FROM users 
            WHERE email=$1
        `,
    [email],
  );

  const user = result.rows[0];

  // check user are existing
  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  // check password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid email or password");
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: config.jwt_expires_in,
  } as SignOptions);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const authService = {
  createUserIntoDB,
  loginUser,
};
