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
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};
const getSingleVehicle = async (vehicleId: string) => {
  console.log("single", vehicleId);
  const result = await pool.query(
    `
    SELECT * FROM vehicles WHERE id = $1
    `,
    [vehicleId]
  );
  return result;
};

const updateVehicle = async (
  payload: Record<string, unknown>,
  vehicleId: string
) => {
  const { daily_rent_price, availability_status } = payload;

  const result = await pool.query(
    ` UPDATE vehicles SET daily_rent_price=$1 , availability_status=$2 WHERE id=$3 RETURNING *`,
    [daily_rent_price, availability_status, vehicleId]
  );

  return result;
};
const deleteVehicle = async (vehicleId: string) => {
  console.log("delete", vehicleId);
  const result = await pool.query(` DELETE FROM vehicles WHERE id =$1`, [
    vehicleId,
  ]);
  return result;
};

export const vehicleServices = {
  entryVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
