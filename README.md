# Gandharvika

A music player application that detects your mood through facial expression analysis and recommends music accordingly.

## 📋 Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run Locally](#how-to-run-locally)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [How to Contribute](#how-to-contribute)
- [License](#license)

## 📝 Description

Gandharvika is an intelligent music player application that leverages facial expression analysis to understand your current mood and recommend music tailored to your emotional state. By analyzing facial features in real-time, the application creates a personalized music experience that evolves with your mood.

## ✨ Features

- **Mood Detection**: Real-time facial expression analysis to detect your current mood using face-api.js
- **Smart Recommendations**: Recommendations based on detected emotions using MongoDB Aggregation
- **Music Player**: Full-featured music player with play, pause, shuffle, next, and previous controls
- **User Authentication**: Secure user login and registration using access and refresh token.
- **Mood History**: Track your mood patterns over time
- **Personalized Experience**: Customizable preferences and listening history

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: SCSS
- **Language**: JavaScript
- **Build Tool**: Vite
- **Package Manager**: pnpm

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: MongoDb
- **Package Manager**: pnpm

### Additional Technologies
- **Facial Recognition**: face-api.js
- **Authentication**: JWT

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **pnpm** (v6 or higher) - [Install pnpm](https://pnpm.io/installation)
- **Git**

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raunak-dubey/Gandharvika.git
   cd Gandharvika
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   - Copy the example files to create your own configuration
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.local frontend/.env.local
   ```

4. **Configure your environment variables** (see [Environment Variables](#environment-variables) section)

## 🚀 How to Run Locally

### Running Both Frontend and Backend

```bash
# From the root directory
pnpm dev
```

### Running Backend Only

```bash
cd backend
pnpm dev
```

The backend server will start on `http://localhost:3000` (or your configured port).

### Running Frontend Only

```bash
cd frontend
pnpm dev
```

The frontend development server will start on `http://localhost:5173` (Vite default).

### Building for Production

```bash
# Build both frontend and backend
pnpm build

# Or individually
cd frontend && pnpm build
cd backend && pnpm build
```

## 🌍 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=your_port
NODE_ENV=your_env

# Database and JWT Configuration
MONGO_URI=mongodb_connection_string
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET=YOUR_REFRESH_TOKEN_SECRET

# Redis Configuration
REDIS_HOST=redis_host
REDIS_PORT=redis_port
REDIS_PASSWORD=redis_password

# ImageKit Configuration
IMAGEKIT_PRIVATE_KEY=imagekit_private_key

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

Refer to `.env.example` for a complete template.

### Frontend (.env.local)

Create a `.env.local` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📜 Scripts

### Backend Scripts

```bash
# Start development server with hot reload
pnpm dev

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Frontend Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint
```

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh` | Refresh authentication token |

### Mood Detection Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/mood/log` | Log Detected Mood |
| GET | `/api/mood/log` | Get all mood log |

### Music Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/song/recommend` | Get mood-based recommendations |
| GET | `/api/song` | Get all songs |
| POST | `/api/song/` | Upload a song |
| POST | `/api/song/like/:songId` | like a song |
| Get | `/api/music/liked` | Get Liked Song |

### History Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/history` | Get listening History |
| POST | `/api/history/play/:songId` | Log play event |

## 📁 Folder Structure

```
Gandharvika/
├── backend/
│   ├── src/
│   │   ├── config/              # Configuration files (database, JWT, etc.)
│   │   ├── controller/          # Route controllers and business logic
│   │   ├── middlewares/         # Express middlewares (auth, error, logging)
│   │   ├── models/              # Database models and schemas
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # Business logic and external service integrations
│   │   ├── utils/               # Utility functions and helpers
│   │   └── app.js               # Express app setup
│   ├── .env                     # Environment variables (DO NOT commit)
│   ├── .env.example             # Example environment variables
│   ├── package.json             # Backend dependencies
│   ├── pnpm-lock.yaml          # Lock file for reproducible installs
│   ├── pnpm-workspace.yaml     # Workspace configuration
│   └── server.js                # Server entry point
│
├── frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── app/                 # Main app component and layout
│   │   ├── features/            # Feature-specific components and logic
│   │   ├── shared/              # Shared components, hooks, and utilities
│   │   └── main.jsx             # React entry point
│   ├── .env.local               # Environment variables (DO NOT commit)
│   ├── .gitignore              # Git ignore rules
│   ├── eslint.config.js        # ESLint configuration
│   ├── index.html              # HTML template
│   ├── jsconfig.json           # JavaScript configuration
│   ├── package.json            # Frontend dependencies
│   ├── pnpm-lock.yaml          # Lock file for reproducible installs
│   └── pnpm-workspace.yaml     # Workspace configuration
│
├── shared/                      # Shared code between backend and frontend
├── README.md                    # This file
└── .gitignore                  # Root gitignore

```

## 🤝 How to Contribute

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
   ```bash
   Click the "Fork" button on GitHub
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Add tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes clearly
   - Link any related issues

### Contribution Guidelines

- Follow the existing code structure and naming conventions
- Write clean, readable code with comments where necessary
- Test your changes locally before pushing
- Keep pull requests focused on a single feature or bug fix
- Update documentation as needed
- Be respectful and constructive in code reviews

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [Raunak Dubey](https://github.com/raunak-dubey)**

For questions, suggestions, or issues, please open an issue on GitHub or contact the maintainer.