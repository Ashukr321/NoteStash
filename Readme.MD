# NoteStash

NoteStash is a full-stack note-taking web application that enables users to create, organize, and manage notes in a secure and intuitive environment. Built with the MERN stack, the app offers user authentication, profile management, note categorization (tags, pinned, archived), and a responsive UI for productivity on the go.

## Getting Started (Backend)

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** database
- **Cloudinary** account (for image uploads)

### Tech Stack & Dependencies

#### 🚀 **Core Technologies**
- **Express.js** (v5.1.0) - Web framework
- **MongoDB** (v8.16.2) - Database with Mongoose ODM
- **Node.js** - Runtime environment

#### 🔐 **Authentication & Security**
- **bcrypt** (v6.0.0) - Password hashing
- **jsonwebtoken** (v9.0.2) - JWT authentication
- **cors** (v2.8.5) - Cross-origin resource sharing

#### ☁️ **File Upload & Storage**
- **Cloudinary** (v2.7.0) - Cloud image storage
- **multer** (v2.0.1) - File upload middleware

#### 🛠️ **Development Tools**
- **nodemon** (v3.1.10) - Auto-restart server
- **dotenv** (v17.2.0) - Environment variables

### Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/notestash
DB_NAME=notestash

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE_TIME=7d

# Cloudinary Configuration (for profile picture uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Installation & Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:8080` (or the port specified in your .env file).

### Production URLs
- **Backend API**: [https://notestash.onrender.com/](https://notestash.onrender.com/)
- **Frontend App**: [https://notestash-nine.vercel.app/](https://notestash-nine.vercel.app/)

### 🚀 Deployment Platforms

| Platform | Service | Description |
|----------|---------|-------------|
| **Frontend** | [Vercel](https://vercel.com/) | Next.js app deployment with automatic CI/CD |
| **Backend** | [Render](https://render.com/) | Node.js API deployment with auto-scaling |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud-hosted MongoDB database |

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/users/register` | ❌ No | Register a new user |
| POST | `/api/users/login` | ❌ No | Log in a user and return JWT token |
| DELETE | `/api/users/delete` | ✅ Yes | Delete the authenticated user account |
| GET | `/api/users/logout` | ❌ (Client-side) | Logout handled on frontend (clear token) |
| PUT | `/api/users/change-password` | ✅ Yes | Change the password of the authenticated user |
| PUT | `/api/users/change-username` | ✅ Yes | Change the username of the authenticated user |

### Profile Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/profiles` | ✅ Yes | Create a profile for the authenticated user (if not already exists) |
| GET | `/api/profiles/me` | ✅ Yes | Get the profile of the authenticated user |
| PUT | `/api/profiles/update` | ✅ Yes | Update authenticated user's profile details (bio, profilePic, dob, location) |
| PATCH | `/api/profiles/profile-pic` | ✅ Yes | Update only the profile picture |

## Data Models

### User Model

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| _id | ObjectId | Yes | Auto-generated unique identifier |
| name | String | Yes | Full name of the user |
| email | String | Yes | Unique email address of the user |
| password | String | Yes | Hashed password |
| createdAt | Date | Yes | Timestamp of user creation (auto) |
| updatedAt | Date | Yes | Timestamp of last update (auto) |

### Profile Model

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| _id | ObjectId | Yes | Profile ID |
| user | ObjectId | Yes | Ref to User |
| profilePic | String | No | URL/path to profile picture |
| bio | String | No | Short biography |
| dob | Date | No | Date of birth |
| location | String | No | (optional) Location info |
| address | String | No | User's address |
| pin_code | String | No | Postal/ZIP code |
| createdAt | Date | Yes | Auto-generated |
| updatedAt | Date | Yes | Auto-generated |

## Backend Folder Structure

```text
backend/
  ├── app.js
  ├── package.json
  ├── package-lock.json
  └── src/
      ├── config/
      │   ├── connectDb.js
      │   └── envConfig.js
      ├── index.js
      ├── middlewares/
      │   ├── authMiddleware.js
      │   └── globalErrorHandler.js
      └── modules/
          ├── note/
          │   ├── note.controller.js
          │   ├── note.model.js
          │   └── note.routes.js
          ├── profile/
          │   ├── profile.controller.js
          │   ├── profile.model.js
          │   └── profile.routes.js
          └── user/
              ├── user.controller.js
              ├── user.model.js
              └── user.routes.js
```

## Contributors

- **Ashutosh Kumar**
  - [GitHub](https://github.com/ashukr321)
  - [LinkedIn](https://www.linkedin.com/in/ashukr321/)
  - [Instagram](https://www.instagram.com/ashukr321/)




