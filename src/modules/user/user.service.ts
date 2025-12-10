import bcrypt from "bcryptjs";
import { pool } from "../../config/database";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const hashedPass = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, hashedPass, phone, role]
  );
  return result;
};
const getUser = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [id]
  );
  return result;
};

const updateUser = async (payload: Record<string, unknown>, userId: string) => {
  console.log(payload);
  console.log(userId);
  const { role } = payload;
  const result = await pool.query(
    ` UPDATE users SET role=$1 WHERE id=$2 RETURNING *`,
    [role, userId]
  );
  console.log(result.rows);
  return result;
};
const deleteUser = async (userId: string) => {
  const result = await pool.query(` DELETE FROM users WHERE id =$1`, [userId]);
  return result;
};

export const userServices = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
