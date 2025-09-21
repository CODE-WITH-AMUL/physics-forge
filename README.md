# Physics Forge

**Physics Forge** is a modern, interactive platform designed for students to **learn physics concepts faster and smarter**. It combines **3D visualizations**, **formula simulations**, **study tracking**, and **exam reminders** into a single web application. The project is built with **React** for the frontend and **Django** for backend APIs, creating a seamless **SPA experience** with dynamic content.

---

## 🏆 Features

### Core Features
- **Interactive 3D Visualizations:** Render formulas and physics concepts in 3D for better understanding.
- **Custom Simulations:** Input formulas and observe results dynamically in 2D/3D or theory mode.
- **Organized Learning:** Track subjects, notes, and references in one centralized platform.
- **Smart Reminders:** Receive notifications for exams, deadlines, and study schedules using AI reminders.
- **Progress Tracking:** Charts and analytics to measure your growth and performance over time.

### Authentication & User Management
- **Login / Register:** Secure authentication system with Django backend.
- **Dynamic UI based on Authentication:** Conditional rendering of UI components similar to Django’s `user.is_authenticated`.
- **Dashboard:** Personalized dashboard for logged-in users.

### SPA Routing
- Fully SPA-based routing using **React Router**.
- Pages include:
  - `/` → GetStarted (home landing page)
  - `/login` → Login page
  - `/register` → Register page
  - `/dashboard` → User dashboard (protected)

### Frontend
- Built with **React + Vanilla JS modules** (Three.js animations embedded).
- Dynamic background with **Three.js particles and orbit controls**.
- Responsive design optimized for desktops and mobile.

### Backend
- **Django REST API** for:
  - Authentication status (`/api/auth-status/`)
  - User management (login, register)
  - Optional: Storing simulation data, progress, and analytics.

### 3D Simulation Engine
- Uses **Three.js** for advanced 3D rendering.
- Custom particle systems and animations.
- Supports interaction like **rotation, zoom, and drag**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn
- Python 3.12+
- Django 4.x
- PostgreSQL / SQLite

### Frontend Setup
```bash
cd frontend
npm install
npm start ```


### Frontend Setup
```bash
cd frontend
npm install
npm start
```