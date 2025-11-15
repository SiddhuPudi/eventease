# 🔧 Complete Railway Fix - "pip: not found" Error

## The Problem
Railway is trying to run `pip install -r requirements.txt` but Python/pip isn't installed yet. This happens when Railway has a **custom build command** set in the dashboard.

## ✅ Complete Solution

### Step 1: Remove ALL Custom Build Commands in Railway

**CRITICAL - Do this first:**

1. Go to Railway Dashboard → Your Service
2. Click **Settings**
3. Go to **Build** section
4. **DELETE or CLEAR** the **Build Command** field (make it completely empty)
5. **DELETE or CLEAR** any Dockerfile path
6. Set **Builder** to **Auto** or **Nixpacks** (NOT Docker)
7. **Save** the settings

### Step 2: Verify Root Directory

1. In **Settings** → **General**
2. **Root Directory** should be: `backend`
3. If it's wrong, change it and save

### Step 3: Verify Start Command

1. In **Settings** → **Deploy**
2. **Start Command** should be: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - OR leave it empty (Procfile will handle it)
3. Make sure it uses `$PORT` not a fixed number

### Step 4: Environment Variables

Go to **Variables** tab and ensure you have:
```
MONGO_URI=your-mongodb-atlas-connection-string
```

### Step 5: Delete and Recreate Service (If Still Failing)

If the above doesn't work:

1. **Delete the current service** in Railway
2. **Create a new service** from your GitHub repo
3. **Set Root Directory** to `backend` immediately
4. **DO NOT** set any build command
5. **DO NOT** set any Dockerfile path
6. Let Railway auto-detect everything
7. Add `MONGO_URI` environment variable
8. Deploy

## 📁 Files Railway Needs (Already in your repo)

Your `backend/` folder has:
- ✅ `Procfile` - Start command
- ✅ `runtime.txt` - Python version (3.11)
- ✅ `requirements.txt` - Dependencies
- ✅ `server.py` - Your FastAPI app

Railway will:
1. Detect Python from `requirements.txt`
2. Use Python version from `runtime.txt`
3. Install dependencies automatically
4. Use start command from `Procfile`

## 🚨 Common Mistakes to Avoid

❌ **DON'T** set a Build Command in Railway
❌ **DON'T** set Dockerfile path if not using Docker
❌ **DON'T** use fixed port numbers (use `$PORT`)
❌ **DON'T** set Root Directory to root (should be `backend`)

✅ **DO** let Railway auto-detect
✅ **DO** use `$PORT` environment variable
✅ **DO** set Root Directory to `backend`
✅ **DO** use Procfile for start command

## 🔄 After Fixing Settings

1. Click **"Redeploy"** in Railway
2. Wait 2-3 minutes
3. Check the logs - you should see:
   - Python being detected
   - Dependencies installing
   - Server starting

## 🆘 If Still Not Working - Use Render.com

Railway can be finicky. Render.com is more reliable for FastAPI:

### Render.com Setup (5 minutes)

1. Go to [render.com](https://render.com) → Sign in with GitHub
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `eventease-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add environment variable:
   - **Key**: `MONGO_URI`
   - **Value**: Your MongoDB Atlas connection string
6. Click **"Create Web Service"**
7. Wait 3-5 minutes
8. Done! ✅

Render.com is more straightforward and reliable for Python apps.

## 📝 Summary

The error happens because Railway has a **custom build command** that runs before Python is installed. 

**Solution**: Remove the build command and let Railway auto-detect Python from your files.

