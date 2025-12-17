# 🚗 Vehicle Rental Management System API

## 🌐 Live URL

```
https://your-live-api-url.com](https://vehicle-rental-system-five-gilt.vercel.app
```

---

## 📌 Project Description

A **Vehicle Rental Management System** built with **Node.js, Express, TypeScript, and PostgreSQL**. The system supports **role-based access control** where admins manage vehicles and bookings, and customers can book vehicles and manage their own bookings.

---

## ✨ Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control (`admin`, `customer`)

### 👤 Users

* User registration & login
* Admin can update/delete any user
* Customers can update their own profile

### 🚘 Vehicles

* Admin can create, update, delete vehicles
* Vehicles cannot be deleted if active bookings exist
* Automatic availability management

### 📅 Bookings

* Customers can create and cancel bookings
* Admin can update booking status (returned)
* Auto-return logic when rent period ends

---

## 🧰 Technology Stack

**Backend**

* Node.js
* Express.js
* TypeScript

**Database**

* PostgreSQL

**Security**

* JSON Web Token (JWT)
* bcrypt

**Tools**

* node-cron (auto-return logic)
* pg (PostgreSQL client)
* dotenv

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/vehicle-rental-api.git
cd vehicle-rental-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5000/vehicle_rental
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run Database Migrations / Tables

Ensure PostgreSQL is running and tables are created automatically or via SQL scripts.

### 5️⃣ Start the Server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

## ▶️ Usage Instructions

### 🔑 Authentication

* Login to receive JWT token
* Use token in request headers:

```
Authorization: Bearer <your_token>
```

### 📌 Example API Endpoints

| Method | Endpoint              | Access           |
| ------ | --------------------- | ---------------- |
| POST   | /api/v1/auth/signup   | Public           |
| POST   | /api/v1/auth/signin   | Public           |
| POST   | /api/v1/vehicles      | Admin            |
| GET    | /api/v1/bookings      | Admin            |
| GET    | /api/v1/bookings/:id  | Customer         |
| PUT    | /api/v1/bookings/:id  | Admin / Customer |

---

## 🧪 Testing

* Use **Postman** for API testing
* Import API collection if available

---

## 📂 Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middlewares/
 ├── utils/
 ├── config/
 └── server.ts
```

---

## 🚀 Future Improvements

* Payment integration
* Email notifications
* Admin dashboard
* Vehicle images upload

---

## 👨‍💻 Author

**Abu Jaher**
MERN Developer

---

