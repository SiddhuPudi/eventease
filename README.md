# Event Ease - Full Stack Application

A full-stack event management application with React frontend and FastAPI backend.

## Prerequisites

- **Python 3.9+** (with virtual environment support)
- **Node.js** (v14 or higher) and **npm** or **yarn**
- **MongoDB** (running locally or MongoDB Atlas connection string)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Activate the virtual environment:
   ```bash
   # On macOS/Linux:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. Install dependencies (if not already installed):
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` directory:
   ```bash
   # For local MongoDB:
   MONGO_URI=mongodb://localhost:27017
   
   # OR for MongoDB Atlas (cloud):
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```

5. Make sure MongoDB is running:
   - **Local MongoDB**: Start MongoDB service on your machine
   - **MongoDB Atlas**: Ensure your connection string is correct and network access is configured

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   # Using npm:
   npm install
   
   # OR using yarn:
   yarn install
   ```

## Running the Application

### Start the Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Activate the virtual environment (if not already activated):
   ```bash
   source venv/bin/activate  # macOS/Linux
   # OR
   venv\Scripts\activate  # Windows
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn server:app --reload --port 8000
   ```

   The backend will be available at: `http://localhost:8000`

### Start the Frontend Development Server

1. Open a **new terminal window/tab**

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Start the React development server:
   ```bash
   # Using npm:
   npm start
   
   # OR using yarn:
   yarn start
   ```

   The frontend will be available at: `http://localhost:3000`

## Quick Start (All Commands)

### Terminal 1 - Backend:
```bash
cd backend
source venv/bin/activate  # macOS/Linux
uvicorn server:app --reload --port 8000
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install  # if not already installed
npm start
```

## Verify Installation

1. **Backend Health Check**: Visit `http://localhost:8000` - You should see:
   ```json
   {"message": "Backend is running successfully!"}
   ```

2. **Frontend**: Visit `http://localhost:3000` - The React app should load

## Troubleshooting

### Backend Issues:
- **MongoDB Connection Error**: Ensure MongoDB is running and the `MONGO_URI` in `.env` is correct
- **Port 8000 already in use**: Change the port: `uvicorn server:app --reload --port 8001`
- **Module not found**: Activate the virtual environment and run `pip install -r requirements.txt`

### Frontend Issues:
- **Port 3000 already in use**: The app will prompt to use a different port
- **Dependencies not found**: Run `npm install` or `yarn install` in the frontend directory
- **CORS errors**: Ensure the backend is running on port 8000

## Project Structure

```
FSD-EventEase/
├── backend/
│   ├── server.py          # FastAPI server
│   ├── requirements.txt   # Python dependencies
│   └── venv/             # Python virtual environment
├── frontend/
│   ├── src/              # React source code
│   ├── package.json      # Node.js dependencies
│   └── public/           # Static files
└── README.md            # This file
```

## API Endpoints

- `GET /` - Health check
- `GET /events` - Get all events
- `POST /events` - Create new event
- `GET /events/{event_id}` - Get single event
- `PUT /events/{event_id}` - Update event
- `DELETE /events/{event_id}` - Delete event
- `POST /events/{event_id}/register` - Register for event
- `GET /events/{event_id}/registrations` - Get event registrations
- `GET /dashboard-stats` - Get dashboard statistics
