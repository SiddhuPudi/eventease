"""
EventEase Backend API
FastAPI server for event management system
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from dotenv import load_dotenv
import os
from datetime import datetime
from typing import List, Dict, Any

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="EventEase API",
    description="Backend API for EventEase event management system",
    version="1.0.0"
)

# CORS Configuration
allowed_origins = [
    "https://eventease-pn73.vercel.app",   # your frontend URL
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["event_ease"]

# Health Check
@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Backend is running successfully!", "status": "ok"}

# Get all events
@app.get("/events")
async def get_events():
    """Get all events sorted by date (newest first)"""
    try:
        events = await db.events.find().sort("date", -1).to_list(100)
        for event in events:
            event["_id"] = str(event["_id"])
        return events
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching events: {str(e)}")

# Create new event
@app.post("/events")
async def create_event(event: Dict[Any, Any]):
    """Create a new event"""
    try:
        # Ensure registrations array exists
        if "registrations" not in event:
            event["registrations"] = []
        
        result = await db.events.insert_one(event)
        new_event = await db.events.find_one({"_id": result.inserted_id})
        new_event["_id"] = str(new_event["_id"])
        return new_event
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating event: {str(e)}")

# Get single event
@app.get("/events/{event_id}")
async def get_event(event_id: str):
    """Get a single event by ID"""
    try:
        event = await db.events.find_one({"_id": ObjectId(event_id)})
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        event["_id"] = str(event["_id"])
        return event
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid event ID format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching event: {str(e)}")

# Update event
@app.put("/events/{event_id}")
async def update_event(event_id: str, updated_data: Dict[Any, Any]):
    """Update an existing event"""
    try:
        # Remove _id from update data if present
        updated_data.pop("_id", None)
        
        result = await db.events.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": updated_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Event not found")
        
        updated_event = await db.events.find_one({"_id": ObjectId(event_id)})
        updated_event["_id"] = str(updated_event["_id"])
        return updated_event
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid event ID format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating event: {str(e)}")

# Delete event
@app.delete("/events/{event_id}")
async def delete_event(event_id: str):
    """Delete an event"""
    try:
        result = await db.events.delete_one({"_id": ObjectId(event_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Event not found")
        return {"message": "Event deleted successfully"}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid event ID format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting event: {str(e)}")

# Register for event
@app.post("/events/{event_id}/register")
async def register_for_event(event_id: str, registration: Dict[Any, Any]):
    """Register a student for an event"""
    try:
        event = await db.events.find_one({"_id": ObjectId(event_id)})
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Add timestamp if not present
        if "timestamp" not in registration:
            registration["timestamp"] = datetime.utcnow().isoformat()
        
        await db.events.update_one(
            {"_id": ObjectId(event_id)},
            {"$push": {"registrations": registration}}
        )
        return {"message": "Registration successful"}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid event ID format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error registering: {str(e)}")

# Get event registrations
@app.get("/events/{event_id}/registrations")
async def get_event_registrations(event_id: str):
    """Get all registrations for a specific event"""
    try:
        event = await db.events.find_one(
            {"_id": ObjectId(event_id)},
            {"registrations": 1}
        )
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        
        registrations = event.get("registrations", [])
        # Ensure JSON-safe output
        safe_registrations = []
        for reg in registrations:
            clean_reg = {}
            for key, value in reg.items():
                if isinstance(value, (str, int, float, bool, type(None))):
                    clean_reg[key] = value
                else:
                    clean_reg[key] = str(value)
            safe_registrations.append(clean_reg)
        
        return safe_registrations
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid event ID format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching registrations: {str(e)}")

# Dashboard statistics
@app.get("/dashboard-stats")
async def dashboard_stats():
    """Get dashboard statistics for organizer"""
    try:
        events = await db.events.find().to_list(100)
        total_events = len(events)
        total_registrations = sum(len(e.get("registrations", [])) for e in events)
        
        event_summary = [
            {
                "id": str(e["_id"]),
                "title": e.get("title") or e.get("name", "Untitled Event"),
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

# Alias for organizer summary
@app.get("/organizer/summary")
async def organizer_summary():
    """Alias for dashboard-stats endpoint"""
    return await dashboard_stats()
