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
  ├── env.example
  ├── uploads/
  └── src/
      ├── config/
      │   ├── connectDb.js
      │   └── envConfig.js
      ├── index.js
      ├── middlewares/
      │   ├── authMiddleware.js
      │   └── globalErrorHandler.js
      ├── utils/
      │   └── cloudinary.js
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

## Frontend Folder Structure

### Tech Stack & Dependencies

#### 🚀 **Core Technologies**
- **Next.js** (v15.3.5) - React framework with App Router
- **React** (v19.0.0) - UI library
- **TypeScript** (v5) - Type safety

#### 🎨 **Styling & UI**
- **Tailwind CSS** (v4) - Utility-first CSS framework
- **React Icons** (v5.5.0) - Icon library
- **React Hot Toast** (v2.5.2) - Toast notifications

#### 🔧 **Development Tools**
- **ESLint** (v9) - Code linting
- **PostCSS** (v4) - CSS processing

#### 🍪 **Utilities**
- **js-cookie** (v3.0.5) - Cookie management

### Project Structure

```text
frontend/
  ├── .next/                    # Next.js build output
  ├── node_modules/             # Dependencies
  ├── public/                   # Static assets
  │   ├── file.svg
  │   ├── globe.svg
  │   ├── next.svg
  │   ├── vercel.svg
  │   └── window.svg
  ├── src/                      # Source code
  │   ├── app/                  # Next.js App Router
  │   │   ├── (auth)/           # Authentication routes (grouped)
  │   │   │   ├── login/        # Login page
  │   │   │   └── register/     # Registration page
  │   │   ├── dashboard/        # Main dashboard
  │   │   │   ├── allnotes/     # All notes view
  │   │   │   ├── favnotes/     # Favorite notes view
  │   │   │   ├── pinnednotes/  # Pinned notes view
  │   │   │   ├── setting/      # User settings
  │   │   │   ├── trashnotes/   # Trash/archived notes
  │   │   │   ├── layout.tsx    # Dashboard layout
  │   │   │   └── page.tsx      # Dashboard main page
  │   │   ├── favicon.ico       # App icon
  │   │   ├── globals.css       # Global styles
  │   │   ├── layout.tsx        # Root layout
  │   │   └── page.tsx          # Landing page
  │   ├── components/           # Reusable components
  │   │   ├── common/           # Shared components
  │   │   ├── dashboard/        # Dashboard-specific components
  │   │   │   ├── Header.tsx    # Dashboard header
  │   │   │   └── Sidebar.tsx   # Navigation sidebar
  │   │   └── landingPage/      # Landing page components
  │   │       ├── Features.tsx  # Features section
  │   │       ├── Fnq.tsx       # FAQ section
  │   │       ├── Footer.tsx    # Footer component
  │   │       ├── Hero.tsx      # Hero section
  │   │       └── Navbar.tsx    # Navigation bar
  │   ├── context/              # React Context
  │   │   └── UserContext.tsx   # User authentication context
  │   ├── pages/                # Pages directory (legacy)
  │   │   ├── _app.tsx          # App wrapper
  │   │   └── mainpage/         # Main page components
  │   │       └── Main.tsx      # Main page component
  │   ├── services/             # API service layer
  │   │   ├── notes/            # Notes API services
  │   │   │   └── notes.services.ts
  │   │   ├── profiles/         # Profile API services
  │   │   │   └── profiles.services.js
  │   │   └── users/            # User API services
  │   │       └── users.services.js
  │   ├── utils/                # Utility functions
  │   └── middleware.ts         # Next.js middleware
  ├── envConfig.ts              # Environment configuration
  ├── eslint.config.mjs         # ESLint configuration
  ├── next-env.d.ts             # Next.js TypeScript definitions
  ├── next.config.ts            # Next.js configuration
  ├── package.json              # Dependencies and scripts
  ├── package-lock.json         # Locked dependencies
  ├── postcss.config.mjs        # PostCSS configuration
  └── tsconfig.json             # TypeScript configuration
```

### Key Features

#### 🎯 **Routing Structure**
- **App Router**: Modern Next.js 13+ routing with file-based routing
- **Route Groups**: Organized authentication routes in `(auth)` group
- **Nested Layouts**: Dashboard with dedicated layout and nested routes

#### 🧩 **Component Architecture**
- **Modular Design**: Separated by feature (dashboard, landing page, common)
- **Reusable Components**: Shared components in common directory
- **Feature-specific**: Components organized by page/feature

#### 🔌 **Service Layer**
- **API Integration**: Organized service files for different API endpoints
- **Type Safety**: Mix of TypeScript and JavaScript services
- **Separation of Concerns**: Clean separation between UI and data layer

#### 🎨 **Styling Approach**
- **Tailwind CSS**: Utility-first styling with custom configurations
- **Responsive Design**: Mobile-first approach with responsive utilities
- **Component Styling**: Scoped styles within components

## Contributors

- **Ashutosh Kumar**
  - [GitHub](https://github.com/ashukr321)
  - [LinkedIn](https://www.linkedin.com/in/ashukr321/)
  - [Instagram](https://www.instagram.com/ashukr321/)

# Frontend (React/Next.js)

## Getting Started (Frontend)

### Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** (v8 or higher) or **yarn**

### Installation & Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env.local` file in the `frontend/` directory and set the following (example):
   ```env
   NEXT_PUBLIC_PUBLIC_API=https://notestash.onrender.com
   ```
   - Set this to your backend API URL.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will run on [http://localhost:3000](http://localhost:3000) by default.


### Main Features
- **Modern Next.js 13+ App Router**
- **TypeScript** for type safety
- **Tailwind CSS** for styling and responsive design
- **React Hot Toast** for notifications
- **React Icons** for UI icons
- **API Service Layer** for clean data fetching
- **Authentication** and protected routes
- **Notes Management**: create, edit, pin, star, archive, delete, and restore notes
- **Dashboard**: stats, recent notes, and quick actions
- **Mobile Responsive**: fully responsive UI

### Screenshots

Below are screenshots of the NoteStash application UI and features:

#### Screenshot 1
![Screenshot 1](project%20assets/1.png)

#### Screenshot 2
![Screenshot 2](project%20assets/2.png)

#### Screenshot 3
![Screenshot 3](project%20assets/3.png)

#### Screenshot 4
![Screenshot 4](project%20assets/4.png)

#### Screenshot 5
![Screenshot 5](project%20assets/5.png)

#### Screenshot 6
![Screenshot 6](project%20assets/6.png)

#### Screenshot 7
![Screenshot 7](project%20assets/7.png)

#### Screenshot 8
![Screenshot 8](project%20assets/8.png)

#### Screenshot 9
![Screenshot 9](project%20assets/9.png)

#### Screenshot 10
![Screenshot 10](project%20assets/10.png)

#### Screenshot 11
![Screenshot 11](project%20assets/11.png)

#### Screenshot 12
![Screenshot 12](project%20assets/12.png)

#### Screenshot 13
![Screenshot 13](project%20assets/13.png)

#### Screenshot 14
![Screenshot 14](project%20assets/14.png)

#### Screenshot 15
![Screenshot 15](project%20assets/15.png)

### Running in Production
Build and start the production server:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Useful Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

---




