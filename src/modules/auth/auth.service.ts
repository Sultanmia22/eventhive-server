import bcrypt, { hash } from "bcryptjs";
import { pool } from "../../db";
import type { ICreateUserPayload } from "./auth.interface";

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

export const authService = {
    createUserIntoDB
}