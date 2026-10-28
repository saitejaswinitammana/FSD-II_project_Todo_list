# Full-Stack To-Do App (React + Node.js + Express)

A complete full-stack To-Do application built with a React (Vite) frontend and Express.js REST API backend.

## Project Structure

```
todo-app/
├── package.json               # Root scripts to run both client and server
├── server/                    # Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/       # Controller logic
│   │   ├── routes/            # Route definitions
│   │   ├── middleware/        # Error handlers & middleware
│   │   └── app.js             # Express app setup
│   ├── server.js              # Server entry point (port 5000)
│   └── package.json
└── client/                    # React + Vite frontend
    ├── src/
    │   ├── components/        # TodoForm, TodoItem, TodoList, FilterBar
    │   ├── hooks/             # useTodos custom hook for REST sync
    │   ├── App.jsx            # Main app component
    │   └── index.css          # Modern clean styling
    ├── vite.config.js         # API proxy configured to port 5000
    └── package.json
```

## Getting Started

### 1. Install dependencies
Run this from the root `todo-app` directory:
```bash
npm run install:all
```
*(Or install separately with `npm install` inside both `/server` and `/client` directories)*

### 2. Run the application
Run both frontend and backend concurrently with one command:
```bash
npm run dev
```

Or run them individually in separate terminals:
- **Backend:** `cd server && npm run dev` (Runs on `http://localhost:5000`)
- **Frontend:** `cd client && npm run dev` (Runs on `http://localhost:5173`)

Open [http://localhost:5173](http://localhost:5173) in your browser!
