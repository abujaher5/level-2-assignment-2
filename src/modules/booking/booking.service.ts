// import bcrypt from "bcryptjs";
import { pool } from "../../config/database";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  console.log("payload", payload);

  const result = await pool.query(
    `
WITH inserted AS (
  INSERT INTO bookings (
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status
  )
  SELECT 
      $1,
      $2,
      $3::DATE,
      $4::DATE,
      (($4::DATE - $3::DATE) * v.daily_rent_price) AS total_price,
      'active'
  FROM vehicles v
  WHERE v.id = $2
  RETURNING *
)
SELECT 
  i.id,
  i.customer_id,
  i.vehicle_id,
  i.rent_start_date,
  i.rent_end_date,
  i.total_price,
  i.status,
  json_build_object(
      'vehicle_name', v.vehicle_name,
      'daily_rent_price', v.daily_rent_price
  ) AS vehicle
FROM inserted i
JOIN vehicles v ON v.id = i.vehicle_id;
`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date]
  );
  //   console.log(result.rows[0]);
  return result.rows;
};

const getBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};

const updateBooking = async (
  payload: Record<string, unknown>,
  bookingId: string
) => {
  const { status } = payload;

  const result = await pool.query(
    ` UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  return result;
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
