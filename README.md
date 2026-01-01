# 🌍 Local Guide Platform – Backend API

A scalable backend API for a **Local Guide Platform** that connects travelers with local guides for personalized tours.  
Built using **Node.js, Express, TypeScript, MongoDB (Mongoose)** with **JWT authentication**, **Stripe payments**, and **Admin moderation**.

---

## 🚀 Features Overview

### 🔐 Authentication & Authorization
- Email & Password registration/login
- JWT-based authentication
- Role-based access control:
  - **Tourist**
  - **Guide**
  - **Admin**
- Secure password hashing using **bcrypt**

---

### 👤 User Profile Management
- CRUD operations on user profiles
- Common fields:
  - Name
  - Profile picture
  - Bio
  - Languages spoken
- **Guide-specific**
  - Expertise (History, Food, Adventure, etc.)
  - Daily rate
- **Tourist-specific**
  - Travel preferences

---

### 🗺️ Tour Listing Management
- Guides can:
  - Create tour listings
  - Edit / deactivate tours
- Tour details:
  - Title
  - Description & itinerary
  - City / destination
  - Category
  - Price
  - Duration
  - Meeting point
  - Max group size
  - Images (Cloudinary / ImgBB)

---

### 🔍 Search & Matching
- Search tours by:
  - City
  - Category
  - Language
  - Price range

---

### 📅 Booking System
- Tourists can request bookings
- Guides can accept or decline
- Booking status lifecycle:
  - `pending`
  - `confirmed`
  - `completed`
  - `cancelled`

---

### ⭐ Reviews & Ratings
- Tourists can rate & review guides **after completed tours**
- Automatic guide rating calculation

---

### 💳 Payment System (Stripe)
- Secure Stripe payment integration
- Payment Intent creation
- Stripe webhook verification
- Guide receives payment after tour completion

---

### 🛡️ Admin Module
- Admin dashboard APIs
- Manage users, guides, tours & bookings
- Approve / block guides
- Admin seeding script included

---

## 🧱 Tech Stack

| Technology | Usage |
|-----------|------|
| Node.js | Runtime |
| Express.js | API framework |
| TypeScript | Type safety |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Stripe | Payments |
| bcrypt | Password hashing |
| dotenv | Environment config |

---

## 📁 Project Structure

src/
│
├── app.ts
├── server.ts
│
├── config/
│ ├── db.ts
│ └── stripe.ts
│
├── modules/
│ ├── auth/
│ ├── user/
│ ├── tour/
│ ├── booking/
│ ├── review/
│ ├── payment/
│ └── admin/
│
├── middlewares/
│ ├── auth.middleware.ts
│ ├── role.middleware.ts
│ └── paymentVerify.middleware.ts
│
├── utils/
│ ├── jwt.ts
│ └── errorHandler.ts
│
├── seed/
│ └── admin.seed.ts
│
└── routes.ts