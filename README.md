# 🏨 StayPrime
A full-stack Node.js/Express web application for discovering and listing premium stay properties. 
Built using the MVC architecture, StayPrime supports authentication, property listings, image uploads, reviews, and secure session management.

⚡ Overview

**Tech Stack:**  
Node.js · Express · MongoDB (Mongoose) · EJS · Passport · Cloudinary · Bootstrap · Mongo Session Store

⭐ Key Features

- User authentication (Signup/Login/Logout)
- CRUD operations for property listings
- Image upload and storage using Cloudinary
- Review and rating system
- Authorization (Only owner can edit/delete listings)
- Flash messages for user feedback
- Secure session management using MongoDB
- Responsive UI using Bootstrap
- Server-side validation and error handling

🧩 Project Structure (MVC Pattern)

  📦 Model → `/models/`
  Contains Mongoose schemas for:
   - Users
   - Listings
   - Reviews

  🎨 View → `/views/`
  Contains EJS templates including:
   - Layouts
   - Listings pages
   - Authentication pages
   - Partial components (Navbar, Flash messages)

  ⚙️ Controller → `/controllers/`
  Handles application logic such as:
   - Listing operations
   - User authentication
   - Review handling

---

📁 Other Important Folders
/routes       → Express route handlers  
/middleware   → Authentication & authorization middleware  
/utils        → Helper functions & Cloudinary configuration  
/public       → Static files (CSS, JS, images)  
/init         → Database seeding scripts  
app.js        → Main application entry point  

---

🚀 Getting Started (Local Setup)

✅ Prerequisites
- Node.js (v16 or above)
- npm
- MongoDB (Local or Atlas)
- Cloudinary Account (For image uploads)

📥 Installation

bash
git clone <your-repository-link>
cd stayprime
npm install


Environment Setup
Create a .env file in the root directory and add:

## 🗺️ Routes Summary

### 🏠 Listings Routes

| Method | Route | Description | Auth |
|---------|------------|-----------------|----------|
| GET | `/listings` | View all listings | No |
| GET | `/listings/new` | Create listing form | Yes |
| POST | `/listings` | Add new listing | Yes |
| GET | `/listings/:id` | View single listing | No |
| GET | `/listings/:id/edit` | Edit listing form | Owner |
| PUT | `/listings/:id` | Update listing | Owner |
| DELETE | `/listings/:id` | Delete listing | Owner |

---

### ⭐ Review Routes

| Method | Route | Description | Auth |
|---------|------------|-----------------|----------|
| POST | `/listings/:id/reviews` | Add review | Yes |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review | Author |

---

### 👤 User Routes

| Method | Route | Description | Auth |
|---------|------------|-----------------|----------|
| GET | `/register` | Registration page | No |
| POST | `/register` | Create account | No |
| GET | `/login` | Login page | No |
| POST | `/login` | Authenticate user | No |
| GET | `/logout` | Logout user | Yes |
