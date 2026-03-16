# 🎧 Gandharvika — Emotion Based Music Recommendation Platform

Gandharvika is a MERN stack application that recommends music based on the user's **facial expression (mood detection)** and listening behavior. The system combines computer vision, recommendation logic, and a modular frontend architecture to create a personalized music experience.

The project is built with a strong focus on **clean architecture, modular code structure, and scalable frontend design patterns**.

# 🚀 Core Idea

Instead of manually choosing music, Gandharvika detects the user's **facial expression using the camera**, determines the user's **mood**, and then **recommends songs that match that mood**.

It also keeps track of **liked songs and listening history**, allowing the system to improve recommendations over time.

# ✨ Current Features

## 🔐 Authentication System

Complete authentication flow built with backend session handling.

**Features implemented:**

* User Registration
* User Login
* Redis based Logout (token/session invalidation)

**Status**

| Feature              | Status                 |
| -------------------- | ---------------------- |
| Register             | ✅ Implemented          |
| Login                | ✅ Implemented          |
| Logout (Redis based) | ⚙️ Backend Implemented |

# 🎵 Song System

The song system manages song discovery, engagement, and listening activity.

## ❤️ Liked Songs

Users can like songs and maintain a personal collection.

**Features**

* Like a song
* Fetch liked songs
* Display liked songs page

## 📜 Listening History

Tracks what songs the user plays.

**Features**

* Song play logging
* Fetch listening history

**Status:** Backend implemented

## 🎯 Song Recommendations

Songs are recommended based on:

* Detected mood
* User listening behavior

The recommendation system returns songs suited to the current mood.

## ⬆️ Song Upload

Admins (or future creators) can upload songs.

**Status:** Backend implemented

Includes:

* Song metadata
* Thumbnail
* Audio storage

# 😄 Face Expression Mood Detection

One of the core features of Gandharvika.

The application detects the user's facial expression through the webcam and predicts the user's **emotional state**.

Possible detected moods include:

* Happy
* Sad
* Neutral
* Angry
* Surprised

The detected mood is then used to **fetch mood-based music recommendations**.

# ☁️ Cloud Storage

All media assets are stored using **ImageKit Cloud Storage**.

Used for:

* Song thumbnails
* Song audio files

Benefits:

* CDN delivery
* Optimized media serving
* Secure uploads

# 🧩 Frontend Architecture

The frontend follows a **4‑Layer Architecture pattern** to maintain scalability and separation of concerns.

## Layers

```
UI Layer
Context Layer
Hooks Layer
Services Layer
```

### 1️⃣ UI Layer

Contains only presentation components.

Responsibilities:

* Rendering UI
* Handling user interactions

Examples:

* MusicCard
* MusicPlayer
* Sidebar

---

### 2️⃣ Context Layer

Handles **global application state**.

Examples:

* SongContext
* AuthContext

---

### 3️⃣ Hooks Layer

Custom hooks that contain application logic.

Examples:

* useSong
* useAuth

Responsibilities:

* Connect UI with business logic
* Manage async actions
* Call service APIs

---

### 4️⃣ Services Layer

Responsible for **API communication**.

Examples:

* song.api.js
* auth.api.js

Responsibilities:

* HTTP requests
* API abstraction

# 🧱 Tech Stack

## Frontend

* React
* Context API
* Custom Hooks
* SCSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB

## Cache / Session

* Redis

## Cloud

* ImageKit

## Computer Vision

* Face Expression Detection (camera based mood detection)

# 🗂 Project Structure

```
GANDHARVIKA

backend/
 └── src/
     ├── config
     ├── controller
     ├── middlewares
     ├── models
     │   ├── songs
     │   ├── listeningHistory.model.js
     │   ├── moodLog.model.js
     │   └── user.model.js
     ├── services
     ├── utils
     ├── app.js
     └── server.js

frontend/
 └── src/
     ├── app/
     │   ├── App.jsx
     │   │
     │   ├── app.route.jsx # react router - create browser router
     │   │
     │   └── Protected.jsx # auth middleware
     │
     ├── features/
     │   ├── auth/
     │   │   ├── services /
     │   │   │   └── auth.api.js
     │   │   │
     │   │   ├── hooks/
     │   │   │   └── useAuth.js
     │   │   │
     │   │   ├── components/
     │   │   │   └── Form.jsx
     │   │   │
     │   │   ├── pages/
     │   │   │   ├── RegisterPage.jsx
     │   │   │   └── LoginPage.jsx
     │   │   │
     │   │   ├── styles /
     │   │   │   └── form.scss
     │   │   │
     │   │   └── context /
     │   │       ├── auth.provider.jsx
     │   │       └── auth.context.js
     │   │
     │   └── home /
     │       ├── services /
     │       │   ├── history.api.js
     │       │   ├── mood.api.js
     │       │   └── song.api.js
     │       │
     │       ├── hooks/
     │       │   ├── useSongs.js
     │       │   ├── useSong.js # Import every hooks and then export them in a single hook
     │       │   ├── useLikes.js
     │       │   └── usePlayer.js
     │       │
     │       ├── components/
     │       │   ├── music/ # music components
     │       │   │   ├── MusicCard.jsx
     │       │   │   └── MusicPlayer.jsx
     │       │   ├── FaceExpression.jsx
     │       │   └── Sidebar.jsx
     │       │
     │       ├── pages/ # Outlet
     │       │   ├── LikedSongs.jsx
     │       │   ├── History.jsx
     │       │   └── Home.jsx
     │       │
     │       ├── styles /
     │       │   └── sidebar.scss
     │       │
     │       ├── context /
     │       │   ├── song.provider.jsx
     │       │   └── song.context.js
     │       │
     │       └── layout /
     │           └── AppLayout.jsx # Layout for every page
     │
     ├── shared/
     │   └── styles/
     │       └── globals.scss
     └── main.jsx
```

# ⚙️ Backend Architecture

Backend follows a **modular layered architecture**.

```
Controller → Service → Model → Database
```

Responsibilities:

* Controllers → request handling
* Services → business logic
* Models → database schema
* Utils → helper functions

# 📦 Installation

## Clone Repository

```
git clone https://github.com/your-username/gandharvika.git
```

```
cd gandharvika
```


## Backend Setup

```
cd backend
pnpm install
pnpm dev
```

## Frontend Setup

```
cd frontend
pnpm install
pnpm dev
```

# 🧠 Learning Goals of the Project

This project explores several real‑world engineering concepts:

* Full MERN stack application development
* Modular scalable project structure
* Mood detection with computer vision
* Recommendation based user experience
* Clean frontend architecture patterns
* State management using Context + Hooks

# 📌 Project Status

Current development stage:

| Feature              | Status           |
| -------------------- | ---------------- |
| Authentication       | ✅ Implemented    |
| Mood Detection       | ✅ Implemented    |
| Song Recommendations | ✅ Implemented    |
| Liked Songs          | ✅ Implemented    |
| Listening History    | ⚙️ Backend Ready |
| Song Upload          | ⚙️ Backend Ready |
| Redis Logout         | ⚙️ Backend Ready |

---

# 🤝 Contributing

Contributions, improvements, and suggestions are welcome.

Feel free to open an issue or submit a pull request.

# 📄 License

MIT License — free to use, modify, and distribute.