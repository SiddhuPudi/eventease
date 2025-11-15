# 🚀 Push to GitHub & Deploy Guide

## ✅ Code Status: READY FOR DEPLOYMENT

Your code has been updated with:
- ✅ Environment variable configuration for API URLs
- ✅ Updated CORS settings for production
- ✅ Deployment configuration files (Dockerfile, Procfile, vercel.json, netlify.toml)
- ✅ Comprehensive deployment documentation

---

## 📤 Step 1: Push to GitHub

### If you already have a GitHub repository:

```bash
# Navigate to your project directory
cd C:\Users\Dell\Desktop\eventease

# Check current status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Prepare for deployment: Add environment configs and deployment files"

# Push to GitHub
git push origin main
```

### If you need to create a new GitHub repository:

1. **Create Repository on GitHub**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it `eventease` (or your preferred name)
   - Don't initialize with README (you already have one)
   - Click "Create repository"

2. **Push Your Code**
   ```bash
   # Navigate to your project
   cd C:\Users\Dell\Desktop\eventease
   
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Make initial commit
   git commit -m "Initial commit: EventEase application"
   
   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/eventease.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

---

## 🚀 Step 2: Deploy Backend (Railway - Recommended)

### Option A: Railway (Easiest & Free Tier Available)

1. **Sign Up**
   - Go to [railway.app](https://railway.app)
   - Click "Start a New Project"
   - Sign in with GitHub

2. **Deploy from GitHub**
   - Click "Deploy from GitHub repo"
   - Select your `eventease` repository
   - Railway will detect it's a Python project

3. **Configure Service**
   - Click on the service that was created
   - Go to "Settings" tab
   - Set **Root Directory** to: `backend`
   - Go to "Variables" tab and add:
     ```
     MONGO_URI=your-mongodb-atlas-connection-string
     ```
     (Get this from MongoDB Atlas - see Step 3)
   - Go to "Settings" → "Deploy" and add **Start Command**:
     ```
     uvicorn server:app --host 0.0.0.0 --port $PORT
     ```

4. **Get Your Backend URL**
   - Once deployed, Railway will give you a URL like: `https://your-app.railway.app`
   - **Copy this URL** - you'll need it for the frontend!

5. **Update CORS (Important!)**
   - In Railway, go to "Variables" tab
   - Add a new variable:
     ```
     ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-url.vercel.app
     ```
   - (You'll update this after deploying frontend)

### Option B: Render (Alternative)

1. Go to [render.com](https://render.com) → Sign in with GitHub
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `eventease-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `MONGO_URI=your-mongodb-connection-string`
6. Click "Create Web Service"

---

## 🗄️ Step 3: Set Up MongoDB Atlas (If Not Done)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose **FREE** tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Atlas Admin"
   - Click "Add User"

4. **Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for now)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `event_ease`
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/event_ease`

6. **Add to Railway/Render**
   - Use this connection string as the `MONGO_URI` value

---

## 🎨 Step 4: Deploy Frontend (Vercel - Recommended)

### Option A: Vercel (Easiest)

1. **Sign Up**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" → Sign in with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Select your `eventease` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Create React App (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (or `yarn build`)
   - **Output Directory**: `build`
   - **Install Command**: `npm install` (or `yarn install`)

4. **Add Environment Variable**
   - Before deploying, click "Environment Variables"
   - Add:
     ```
     Name: REACT_APP_API_URL
     Value: https://your-backend-url.railway.app
     ```
   - Replace with your actual Railway backend URL from Step 2

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://your-project.vercel.app`

6. **Update Backend CORS**
   - Go back to Railway
   - Add/Update `ALLOWED_ORIGINS` variable:
     ```
     ALLOWED_ORIGINS=http://localhost:3000,https://your-project.vercel.app
     ```
   - Railway will automatically redeploy

### Option B: Netlify (Alternative)

1. Go to [netlify.com](https://netlify.com) → Sign in with GitHub
2. Click "Add New Site" → "Import an existing project"
3. Select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app`
6. Click "Deploy site"

---

## ✅ Step 5: Verify Deployment

1. **Test Backend**
   - Visit: `https://your-backend.railway.app/`
   - Should see: `{"message": "Backend is running successfully!"}`

2. **Test Frontend**
   - Visit your Vercel/Netlify URL
   - Try creating an event
   - Try registering for an event
   - Check if data persists (MongoDB working)

3. **Check Console for Errors**
   - Open browser DevTools (F12)
   - Check Console tab for any API errors
   - Check Network tab to see if API calls are working

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: CORS errors in browser console
- **Solution**: Make sure your frontend URL is in `ALLOWED_ORIGINS` in Railway

**Problem**: MongoDB connection failed
- **Solution**: 
  - Check `MONGO_URI` is correct in Railway
  - Verify MongoDB Atlas network access allows all IPs
  - Check Railway logs for specific error

**Problem**: Backend not starting
- **Solution**: Check Railway logs, ensure `uvicorn` is in requirements.txt

### Frontend Issues

**Problem**: API calls failing (404 or CORS)
- **Solution**: 
  - Verify `REACT_APP_API_URL` is set correctly in Vercel
  - Make sure backend URL doesn't have trailing slash
  - Redeploy frontend after updating environment variable

**Problem**: Blank page after deployment
- **Solution**: 
  - Check browser console for errors
  - Verify build completed successfully
  - Check Vercel deployment logs

---

## 📝 Quick Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string ready

Backend deployment:
- [ ] Railway/Render account created
- [ ] Backend service deployed
- [ ] `MONGO_URI` environment variable set
- [ ] Backend URL copied

Frontend deployment:
- [ ] Vercel/Netlify account created
- [ ] Frontend deployed
- [ ] `REACT_APP_API_URL` set to backend URL
- [ ] Backend `ALLOWED_ORIGINS` updated with frontend URL

After deployment:
- [ ] Backend health check works
- [ ] Frontend loads correctly
- [ ] Can create events
- [ ] Can register for events
- [ ] Data persists in MongoDB

---

## 🎉 You're Done!

Your EventEase application is now live on the internet! 🚀

**Your URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-app.railway.app`
- MongoDB: Managed by MongoDB Atlas

**Next Steps:**
- Share your frontend URL with users
- Set up a custom domain (optional)
- Monitor usage and errors
- Consider adding authentication for production

---

## 📚 Need More Help?

- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for condensed version
- Check platform documentation:
  - [Railway Docs](https://docs.railway.app)
  - [Vercel Docs](https://vercel.com/docs)
  - [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

