# server.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from dotenv import load_dotenv
import os
from datetime import datetime

# -------------------------------
#  Load environment variables
# -------------------------------
load_dotenv()

app = FastAPI()

# -------------------------------
#  Allow frontend (React) access
# -------------------------------
# Get allowed origins from environment variable or use defaults
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000"
).split(",")

# Add your production frontend URL to ALLOWED_ORIGINS environment variable
# Example: ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
#  Connect to MongoDB
# -------------------------------
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["event_ease"]

# -------------------------------
#  Health check
# -------------------------------
@app.get("/")
async def home():
    return {"message": "Backend is running successfully!"}

# -----------------------------------------------------------
# ✅ GET all events (sorted by newest first)
# -----------------------------------------------------------
@app.get("/events")
async def get_events():
    events = await db.events.find().sort("date", -1).to_list(100)
    for e in events:
        e["_id"] = str(e["_id"])
    return events

# -----------------------------------------------------------
# ✅ ADD new event
# -----------------------------------------------------------
@app.post("/events")
async def add_event(event: dict):
    # Ensure registrations array exists
    event.setdefault("registrations", [])
    result = await db.events.insert_one(event)
    new_event = await db.events.find_one({"_id": result.inserted_id})
    new_event["_id"] = str(new_event["_id"])
    return new_event

# -----------------------------------------------------------
# ✅ GET single event
# -----------------------------------------------------------
@app.get("/events/{event_id}")
async def get_event(event_id: str):
    try:
        event = await db.events.find_one({"_id": ObjectId(event_id)})
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        event["_id"] = str(event["_id"])
        return event
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid event ID")

# -----------------------------------------------------------
# ✅ UPDATE event (prevent _id overwrite)
# -----------------------------------------------------------
@app.put("/events/{event_id}")
async def update_event(event_id: str, updated_data: dict):
    try:
        updated_data.pop("_id", None)  # don't allow changing _id
        result = await db.events.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": updated_data}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Event not found")

        updated_event = await db.events.find_one({"_id": ObjectId(event_id)})
        updated_event["_id"] = str(updated_event["_id"])
        return updated_event
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error updating event: {str(e)}")

# -----------------------------------------------------------
# ✅ DELETE event
# -----------------------------------------------------------
@app.delete("/events/{event_id}")
async def delete_event(event_id: str):
    try:
        result = await db.events.delete_one({"_id": ObjectId(event_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Event not found")
        return {"message": "Event deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error deleting event: {str(e)}")

# -----------------------------------------------------------
# ✅ REGISTER a student for an event
# -----------------------------------------------------------
@app.post("/events/{event_id}/register")
async def register_for_event(event_id: str, registration: dict):
    try:
        event = await db.events.find_one({"_id": ObjectId(event_id)})
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")

        # Ensure a timestamp exists (ISO 8601)
        registration["timestamp"] = registration.get("timestamp") or datetime.utcnow().isoformat()

        await db.events.update_one(
            {"_id": ObjectId(event_id)},
            {"$push": {"registrations": registration}}
        )
        return {"message": "Registration successful"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error registering: {str(e)}")

# -----------------------------------------------------------
# ✅ ORGANIZER dashboard summary
# -----------------------------------------------------------
@app.get("/organizer/summary")
async def organizer_summary():
    events = await db.events.find().to_list(100)
    total_events = len(events)
    total_registrations = sum(len(e.get("registrations", [])) for e in events)

    # Sort events by registration count
    event_summary = [
        {
            "id": str(e["_id"]),
            "title": e.get("title") or e.get("name"),
            "count": len(e.get("registrations", [])),
        }
        for e in events
    ]
    event_summary.sort(key=lambda x: x["count"], reverse=True)

    return {
        "total_events": total_events,
        "total_registrations": total_registrations,
        "event_summary": event_summary,
    }

# -----------------------------------------------------------
# ✅ ALIAS for /dashboard-stats (frontend compatibility)
# -----------------------------------------------------------
@app.get("/dashboard-stats")
async def dashboard_stats():
    events = await db.events.find().to_list(100)
    total_events = len(events)
    total_registrations = sum(len(e.get("registrations", [])) for e in events)

    event_summary = [
        {
            "id": str(e["_id"]),
            "title": e.get("title") or e.get("name"),
            "count": len(e.get("registrations", [])),
        }
        for e in events
    ]
    event_summary.sort(key=lambda x: x["count"], reverse=True)

    return {
        "total_events": total_events,
        "total_registrations": total_registrations,
        "event_summary": event_summary,
    }

# -----------------------------------------------------------
# ✅ GET all registrations for a specific event
# -----------------------------------------------------------
@app.get("/events/{event_id}/registrations")
async def get_event_registrations(event_id: str):
    try:
        event = await db.events.find_one({"_id": ObjectId(event_id)}, {"registrations": 1})
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")

        regs = event.get("registrations", [])
        # Ensure JSON-safe output
        safe_regs = []
        for r in regs:
            clean = {}
            for k, v in r.items():
                clean[k] = v if isinstance(v, (str, int, float, bool, type(None))) else str(v)
            safe_regs.append(clean)
        return safe_regs
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading registrations: {str(e)}")
