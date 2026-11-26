import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    console.log("Database Connected!!");
  } catch (er) {
    if (er instanceof Error) {
      console.log("Database Error : ", er.message);
    } else {
      console.log("This is Database Errror");
    }
  }
};
