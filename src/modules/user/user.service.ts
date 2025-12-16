import { pool } from "../../config/database";

const getUser = async () => {
  const result = await pool.query(`
    SELECT id,name,email,phone,role FROM users
    `);

  return result;
};

const adminUpdateUser = async (
  payload: Record<string, unknown>,
  userId: string
) => {
  const { name, email, phone, role } = payload;
  const result = await pool.query(
    ` UPDATE users SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, userId]
  );
  delete result.rows[0].password;

  return result;
};

const userUpdateOwnProfile = async (
  payload: Record<string, unknown>,
  userId: string
) => {
  const { name, email, phone } = payload;
  const result = await pool.query(
    ` UPDATE users SET name=$1,email=$2,phone=$3 WHERE id=$4 RETURNING *`,
    [name, email, phone, userId]
  );
  delete result.rows[0].password;
  return result;
};

const deleteUser = async (userId: string) => {
  const result = await pool.query(
    `
    DELETE FROM users u
    WHERE u.id = $1
      AND NOT EXISTS (
        SELECT 1 
        FROM bookings b
        WHERE b.customer_id = u.id
          AND b.status = 'active'
      )
    RETURNING u.id, u.name, u.email
    `,
    [userId]
  );

  return result;
};

export const userServices = {
  getUser,
  adminUpdateUser,
  userUpdateOwnProfile,
  deleteUser,
};
