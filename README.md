# Future CRM - Lead Management System

## 1. About the Project
**Future CRM** is a streamlined Customer Relationship Management application designed to bridge the gap between website inquiries and administrative follow-ups. The application allows businesses to capture leads automatically from a public-facing contact form and manage them through a secure, high-performance admin dashboard.

Key features include:
- **Lead Capture**: Automatic collection of client names, emails, and specific queries.
- **Admin Dashboard**: Real-time analytics and statistics on lead conversion progress.
- **Status Tracking**: Workflow management to move leads from "New" to "Contacted" and finally "Converted".
- **Interaction History**: Ability for admins to add internal notes and track the history of client interactions.
- **AI-Powered Suggestions**: Contextual follow-up message templates based on lead status.
- **Premium Design**: A modern, glassmorphic dark-themed UI for a professional administrative experience.

## 2. Tech Stack
The project leverages the **MERN** stack (MongoDB, Express, React, Node.js) for a high-performance, full-stack solution:

- **Frontend**:
  - **React (Vite)**: For a fast, component-based user interface.
  - **Vanilla CSS**: Custom styling with glassmorphism and CSS variables.
  - **Lucide-React**: For a modern and consistent icon system.
  - **Axios**: For structured API communication and interceptor-based auth handling.
- **Backend**:
  - **Node.js & Express**: Handling RESTful API logic and routing.
  - **MongoDB & Mongoose**: Document-based storage with schema validation.
  - **JWT (JSON Web Tokens)**: Secure, stateless authentication for admin access.
  - **Bcrypt.js**: Industry-standard password hashing.

## 3. How to Run the Project

### Prerequisites
- Node.js installed on your machine.
- A running MongoDB instance (Local or Atlas).

### Step 1: Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your configuration (see `.env.example` or the instructions provided).
4. Seed the initial admin account:
   ```bash
   node scripts/seedAdmin.js
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Step 2: Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Step 3: Accessing the App
- **Contact Form (Public)**: `http://localhost:5173`
- **Admin Portal (Login)**: `http://localhost:5173/login`
- **Default Credentials**: `admin@example.com` / `password123`

## 4. Contributions
We welcome contributions to improve Future CRM! If you'd like to contribute, please follow these steps:

1. **Fork** the repository.
2. **Create a branch** for your feature or bug fix (`git checkout -b feature/NewFeature`).
3. **Commit** your changes with descriptive messages.
4. **Push** to the branch (`git push origin feature/NewFeature`).
5. **Open a Pull Request** explaining your changes.

Whether it's reporting a bug, suggesting a feature, or writing code, all contributions are appreciated.

---
*Developed as part of the Future_FS_02 project.*
