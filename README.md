# Gandharvika

An intelligent mood-based music player that detects facial expressions in real time and recommends music accordingly.

This project is built using the MERN stack with a focus on clean architecture, structured validation, authentication security, caching, logging, and production-oriented practices.

---

# 📌 Overview

Gandharvika analyzes facial expressions using face-api.js to detect emotional states and recommend music accordingly. The goal of this project was not only to build features, but to design and implement the system with production-level thinking — including security, validation, performance optimization, and maintainability.

---

# ✨ Features

* 🎭 Real-time Mood Detection using face-api.js
* 🎵 Mood-based music recommendation (MongoDB aggregation)
* 🔐 Secure authentication (Access + Refresh tokens)
* 📊 Mood & listening history tracking
* 💻 Multi-device session management
* 🖼 Secure avatar upload with image optimization
* 🎧 Song upload with metadata extraction
* ⚡ Redis caching layer
* ⌨ Keyboard shortcuts for player control

---

# ⌨ Keyboard Shortcuts

* ↑ Arrow → Increase volume
* ↓ Arrow → Decrease volume
* Space → Play / Pause
* → Arrow → Next track
* ← Arrow → Previous track
* R → Toggle repeat
* S → Toggle shuffle

---

# 🏗 Architecture

## Backend Architecture

* MVC pattern
* Clear separation of:

  * Controllers
  * Services
  * Middlewares
  * Models
  * Utilities
* Global async handler wrapper
* Centralized error handling middleware

## Frontend Architecture

* Feature-based folder structure
* Shared utilities and constants
* Global Axios instance
* Centralized SCSS variables & mixins

---

# 🔐 Security & Production-Oriented Measures

While this is not enterprise-hardened infrastructure, significant effort was made to implement production-level best practices.

## Authentication & Authorization

* JWT-based authentication
* Access & Refresh token rotation strategy
* Session-based device tracking
* Logout current session
* Logout all sessions
* Secure password hashing using bcrypt

## Input Validation

### Backend

* express-validator for strict request validation
* Sanitization before hitting business logic

### Frontend

* Zod schema validation
* React Hook Form integration
* Shared regex/constants across frontend & backend

No request reaches business logic without validation.

## Security Middlewares

* Helmet for secure HTTP headers
* CORS with restricted origin configuration
* Custom rate limiter to prevent brute-force attacks
* Global error handler to avoid stack trace leaks
* Async wrapper to prevent unhandled promise rejections

## File & Media Security

* Multer for controlled file uploads
* Image validation (size & mimetype checks)
* ImageKit for optimized and secure image storage
* music-metadata & node-id3 for safe audio metadata parsing

## Session Management

* ua-parser-js for device detection
* Session tracking per device
* Selective session revocation
* Redis caching for session-related performance

## Performance Optimizations

* Redis caching
* Lean MongoDB queries
* Aggregation pipelines for recommendations
* TanStack Query caching on frontend

## Logging & Monitoring

* Pino logger for structured logging
* Environment-based logging behavior

## Code Quality & Testing

* mongodb-memory-server for isolated backend testing
* ESLint for linting
* Prettier for formatting
* pnpm workspace for consistent dependency management

---

# 🛠 Tech Stack

## Frontend

* React (Vite)
* SCSS
* TanStack Query
* Zustand
* React Router
* React Hook Form
* Zod

## Backend

* Node.js
* Express
* MongoDB
* Redis
* JWT
* bcrypt
* Multer
* ImageKit
* Pino

---

# 📡 API Endpoints

## 🔐 Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |
| POST   | /api/auth/refresh  | Refresh token |

---

## 👤 User Routes

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| GET    | /api/user/get-me          | Get logged in user     |
| PUT    | /api/user/update          | Update profile         |
| PUT    | /api/user/update-password | Change password        |
| Delete | /api/user/delete          | Delete account         |
| POST   | /api/user/logout          | Logout current session |
| POST   | /api/user/logout-all      | Logout all sessions    |

---

## 💻 Session Routes

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| GET    | /api/session/get-sessions   | Get active sessions     |
| POST   | /api/session/logout-session | Logout specific session |

---

## 🎭 Mood Routes

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| POST   | /api/mood/log | Log mood         |
| GET    | /api/mood/log | Get mood history |

---

## 🎵 Music Routes

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | /api/song/recommend    | Mood-based recommendation |
| GET    | /api/song              | Get all songs             |
| POST   | /api/song              | Upload song               |
| POST   | /api/song/like/:songId | Like song                 |
| GET    | /api/music/liked       | Get liked songs           |

---

## 📊 History Routes

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| GET    | /api/history              | Get listening history |
| POST   | /api/history/play/:songId | Log play event        |

---

# 🌍 Environment Variables

## Backend (.env)
```
PORT=
NODE_ENV=
MONGO_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
IMAGEKIT_PRIVATE_KEY=
CORS_ORIGIN=
```

## Frontend (.env.local)

VITE_API_URL=[http://localhost:3000/api](http://localhost:3000/api)

---

# 📁 Folder Structure
```
Gandharvika/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── shared/
│   │   ├── layout/
│   │   ├── app/
│   │   └── main.jsx
│   └── index.html
├── shared/
└── README.md
```

# 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

Made by Raunak Dubey