import { pool } from "../../config/database";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const result = await pool.query(
    `
WITH inserted_booking AS (
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
),
updated_vehicle AS(
UPDATE vehicles SET availability_status='booked' WHERE id=(SELECT vehicle_id FROM inserted_booking) RETURNING vehicle_name,daily_rent_price,availability_status
)
SELECT 
  ib.id,
  ib.customer_id,
  ib.vehicle_id,
  ib.rent_start_date,
  ib.rent_end_date,
  ib.total_price,
  ib.status,
  json_build_object(
      'vehicle_name', uv.vehicle_name,
      'daily_rent_price', uv.daily_rent_price,
      'availability_status',uv.availability_status
  ) AS vehicle
FROM inserted_booking ib
JOIN updated_vehicle uv ON TRUE;
`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date]
  );

  result.rows[0].total_price = Number(result.rows[0].total_price);
  return result.rows;
};

const getBookings = async () => {
  const result = await pool.query(`

    SELECT b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status,
    json_build_object(
    'name',u.name,
    'email',u.email
    ) AS customer,
     json_build_object (
     'vehicle_name', v.vehicle_name,
     'registration_number', v.registration_number)  AS vehicle
  
 FROM bookings b 
  JOIN users u ON b.customer_id =u.id
  JOIN vehicles v ON b.vehicle_id=v.id
 `);

  result.rows = result.rows.map((b) => ({
    ...b,
    total_price: Number(b.total_price),
  }));

  return result;
};
const getBookingsByCustomerId = async (customerId: number) => {
  const result = await pool.query(
    `
    SELECT b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status,
   
     json_build_object (
     'vehicle_name', v.vehicle_name,
     'registration_number', v.registration_number  , 'type',v.type 
     )  AS vehicle
  
 FROM bookings b 
  JOIN vehicles v ON b.vehicle_id=v.id WHERE b.customer_id=$1
 `,
    [customerId]
  );

  result.rows = result.rows.map((b) => ({
    ...b,
    total_price: Number(b.total_price),
  }));

  return result;
};

const markBookingAsReturned = async (bookingId: string) => {
  const result = await pool.query(
    `
    WITH updated_booking AS (
      UPDATE bookings
      SET status = 'returned'
      WHERE id = $1 
        AND status = 'cancelled'
      RETURNING *
    ),
    updated_vehicle AS (
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id = (SELECT vehicle_id FROM updated_booking)
      RETURNING availability_status
    )
    SELECT
      ub.id,
      ub.customer_id,
      ub.vehicle_id,
      ub.rent_start_date,
      ub.rent_end_date,
      ub.total_price,
      ub.status,
      json_build_object(
        'availability_status',
        uv.availability_status
      ) AS vehicle
    FROM updated_booking ub
    JOIN updated_vehicle uv ON TRUE;
    `,
    [bookingId]
  );
  result.rows = result.rows.map((b) => ({
    ...b,
    total_price: Number(b.total_price),
  }));

  return result;
};

const cancelOwnBooking = async (bookingId: string, customer_id: string) => {
  const result = await pool.query(
    `
    WITH updated_booking AS (
      UPDATE bookings
      SET status = 'cancelled'
      WHERE id = $1 AND customer_id=$2
        AND status = 'active'
      RETURNING *
    ),
    updated_vehicle AS (
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id = (SELECT vehicle_id FROM updated_booking)
   
    )
    SELECT
      id,
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status
    FROM updated_booking
    `,
    [bookingId, customer_id]
  );
  result.rows = result.rows.map((b) => ({
    ...b,
    total_price: Number(b.total_price),
  }));

  return result;
};

export const bookingServices = {
  createBooking,
  getBookings,
  getBookingsByCustomerId,
  cancelOwnBooking,
  markBookingAsReturned,
};
