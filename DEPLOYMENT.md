# 🚀 EventEase Deployment Guide

This guide will help you deploy your EventEase application to production. The application consists of:
- **Frontend**: React application (deploy to Vercel/Netlify)
- **Backend**: FastAPI application (deploy to Railway/Render/Heroku)
- **Database**: MongoDB Atlas (cloud database)

---

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **MongoDB Atlas Account**: [Sign up here](https://www.mongodb.com/cloud/atlas)
3. **Deployment Platform Accounts**:
   - **Frontend**: [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
   - **Backend**: [Railway](https://railway.app), [Render](https://render.com), or [Heroku](https://heroku.com)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Create a username and password (save these!)
   - Set privileges to "Atlas Admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add specific IPs
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `event_ease` (or your preferred database name)

**Save this connection string** - you'll need it for backend deployment!

---

## 🎨 Step 2: Deploy Frontend (Vercel - Recommended)

### Option A: Deploy to Vercel

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Create React App
     - **Build Command**: `npm run build` (or `yarn build`)
     - **Output Directory**: `build`
   
3. **Add Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app
     ```
   - Replace with your actual backend URL (you'll get this after deploying backend)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be live at `https://your-project.vercel.app`

### Option B: Deploy to Netlify

1. **Push Code to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com) and sign in with GitHub
   - Click "Add New Site" → "Import an existing project"
   - Select your GitHub repository
   - Configure:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build` (or `yarn build`)
     - **Publish directory**: `frontend/build`

3. **Add Environment Variables**
   - Go to "Site settings" → "Environment variables"
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app
     ```

4. **Deploy**
   - Click "Deploy site"
   - Your frontend will be live at `https://your-project.netlify.app`

---

## ⚙️ Step 3: Deploy Backend

### Option A: Deploy to Railway (Recommended - Easiest)

1. **Sign Up**
   - Go to [Railway](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Railway will auto-detect it's a Python project
   - Set **Root Directory** to `backend`
   - Add a **Start Command**:
     ```
     uvicorn server:app --host 0.0.0.0 --port $PORT
     ```

4. **Add Environment Variables**
   - Go to "Variables" tab
   - Add:
     ```
     MONGO_URI=your-mongodb-atlas-connection-string
     ```
   - Replace with your MongoDB Atlas connection string from Step 1

5. **Deploy**
   - Railway will automatically deploy
   - Once deployed, you'll get a URL like: `https://your-app.railway.app`
   - **Copy this URL** - you'll need it for frontend environment variables

6. **Update CORS in Backend**
   - Go to your GitHub repository
   - Edit `backend/server.py`
   - Update the `origins` list to include your frontend URL:
     ```python
     origins = [
         "http://localhost:3000",
         "http://127.0.0.1:3000",
         "https://your-frontend.vercel.app",  # Add your frontend URL
         "https://your-frontend.netlify.app",  # Or Netlify URL
     ]
     ```
   - Commit and push the changes
   - Railway will automatically redeploy

### Option B: Deploy to Render

1. **Sign Up**
   - Go to [Render](https://render.com)
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `eventease-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

3. **Add Environment Variables**
   - In the service settings, go to "Environment"
   - Add:
     ```
     MONGO_URI=your-mongodb-atlas-connection-string
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will deploy your backend
   - You'll get a URL like: `https://your-app.onrender.com`

5. **Update CORS** (same as Railway step 6)

### Option C: Deploy to Heroku

1. **Install Heroku CLI**
   - Download from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

2. **Create Heroku App**
   ```bash
   cd backend
   heroku login
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI=your-mongodb-atlas-connection-string
   ```

4. **Create Procfile**
   - Create a file `backend/Procfile` with:
     ```
     web: uvicorn server:app --host 0.0.0.0 --port $PORT
     ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

---

## 🔄 Step 4: Update Frontend with Backend URL

After deploying your backend, update your frontend environment variables:

1. **Vercel**:
   - Go to your Vercel project → Settings → Environment Variables
   - Update `REACT_APP_API_URL` with your backend URL
   - Redeploy the frontend

2. **Netlify**:
   - Go to Site settings → Environment variables
   - Update `REACT_APP_API_URL` with your backend URL
   - Trigger a new deployment

---

## ✅ Step 5: Verify Deployment

1. **Test Backend**
   - Visit `https://your-backend-url.railway.app/`
   - You should see: `{"message": "Backend is running successfully!"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Try creating an event
   - Try registering for an event
   - Check if data persists (MongoDB connection working)

---

## 🐳 Alternative: Docker Deployment (Advanced)

If you prefer Docker, you can containerize both services:

### Create Dockerfile for Backend

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Create Dockerfile for Frontend

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Then deploy to platforms that support Docker (Railway, Render, Fly.io, etc.)

---

## 🔧 Troubleshooting

### Backend Issues

- **CORS Errors**: Make sure your frontend URL is in the `origins` list in `backend/server.py`
- **MongoDB Connection Failed**: Check your `MONGO_URI` environment variable and network access in MongoDB Atlas
- **Port Issues**: Make sure you're using `$PORT` environment variable in production

### Frontend Issues

- **API Calls Failing**: Check that `REACT_APP_API_URL` is set correctly
- **Build Errors**: Make sure all dependencies are in `package.json`
- **404 on Refresh**: Configure redirects (Vercel/Netlify handle this automatically)

### Common Solutions

1. **Check Logs**: Most platforms provide logs in their dashboard
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Database**: Ensure MongoDB Atlas allows connections from your deployment platform's IPs

---

## 📝 Quick Reference

### Environment Variables Needed

**Backend:**
- `MONGO_URI`: MongoDB Atlas connection string

**Frontend:**
- `REACT_APP_API_URL`: Your backend deployment URL

### Important URLs to Update

1. **Backend CORS** (`backend/server.py`): Add frontend URL
2. **Frontend API Config** (`frontend/src/config/api.js`): Uses `REACT_APP_API_URL` automatically

---

## 🎉 You're Done!

Your EventEase application should now be live! Share your frontend URL with users and start managing events.

**Next Steps:**
- Set up a custom domain (optional)
- Configure SSL certificates (usually automatic)
- Set up monitoring and error tracking
- Consider adding authentication for production use

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

