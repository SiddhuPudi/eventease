# ⚡ Quick Deployment Guide

## 🚀 Fastest Way to Deploy (5 Steps)

### 1. Set Up MongoDB Atlas (5 minutes)
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/`)

### 2. Deploy Backend to Railway (2 minutes)
1. Go to [railway.app](https://railway.app) → Sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set **Root Directory** to `backend`
5. Add environment variable:
   - `MONGO_URI` = your MongoDB connection string
6. Add **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
7. Copy your backend URL (e.g., `https://your-app.railway.app`)

### 3. Deploy Frontend to Vercel (2 minutes)
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click "Add New Project" → Import your repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `REACT_APP_API_URL` = your Railway backend URL
5. Click "Deploy"

### 4. Update Backend CORS
Edit `backend/server.py` and add your Vercel frontend URL to the `origins` list, then push to GitHub (Railway auto-deploys).

### 5. Update Frontend Environment Variable
In Vercel, update `REACT_APP_API_URL` with your Railway backend URL and redeploy.

## ✅ Done!

Your app is now live! 🎉

**Need more details?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive instructions.

