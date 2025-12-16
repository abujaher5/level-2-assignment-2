import { pool } from "../../config/database";

const entryVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
        INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      Number(daily_rent_price),
      availability_status,
    ]
  );
  result.rows[0].daily_rent_price = Number(result.rows[0].daily_rent_price);
  console.log(result.rows[0]);
  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);

  result.rows = result.rows.map((v) => ({
    ...v,

    daily_rent_price: Number(v.daily_rent_price),
  }));

  return result;
};
const getSingleVehicle = async (vehicleId: string) => {
  const result = await pool.query(
    `
    SELECT * FROM vehicles WHERE id = $1
    `,
    [vehicleId]
  );
  result.rows[0].daily_rent_price = Number(result.rows[0].daily_rent_price);
  return result;
};

const updateVehicle = async (
  payload: Record<string, unknown>,
  vehicleId: string
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    ` UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4 , availability_status=$5 WHERE id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId,
    ]
  );
  result.rows[0].daily_rent_price = Number(result.rows[0].daily_rent_price);

  return result;
};
const deleteVehicle = async (vehicleId: string) => {
  const result = await pool.query(
    ` DELETE FROM vehicles v WHERE v.id =$1 AND NOT EXISTS( SELECT 1 FROM bookings b WHERE b.vehicle_id=v.id AND b.status='active') RETURNING *`,
    [vehicleId]
  );
  return result;
};

export const vehicleServices = {
  entryVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
