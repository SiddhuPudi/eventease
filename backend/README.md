# EventEase Backend

FastAPI backend for EventEase event management system.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file:
```
MONGO_URI=your-mongodb-connection-string
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

3. Run locally:
```bash
uvicorn server:app --reload --port 8000
```

## Deployment

### Railway
- Root Directory: `backend`
- Build Command: (leave empty)
- Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- Environment Variables: `MONGO_URI`, `ALLOWED_ORIGINS`

### Render
- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- Environment Variables: `MONGO_URI`, `ALLOWED_ORIGINS`

## API Endpoints

- `GET /` - Health check
- `GET /events` - Get all events
- `POST /events` - Create event
- `GET /events/{id}` - Get event by ID
- `PUT /events/{id}` - Update event
- `DELETE /events/{id}` - Delete event
- `POST /events/{id}/register` - Register for event
- `GET /events/{id}/registrations` - Get event registrations
- `GET /dashboard-stats` - Get dashboard statistics

