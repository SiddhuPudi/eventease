# 🚂 Railway Deployment Guide - EventEase Backend

## Common Railway Deployment Issues & Solutions

### Issue: "Deployment failed due to build process"

This usually happens due to:
1. Missing Python version specification
2. Incorrect start command
3. Missing build configuration
4. Port configuration issues

---

## ✅ Step-by-Step Railway Deployment

### 1. Create New Project on Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `eventease` repository

### 2. Configure the Service

**Important Settings:**

1. **Root Directory**: Set to `backend`
   - Click on the service → Settings → Root Directory
   - Enter: `backend`

2. **Build Command** (if needed):
   - Settings → Build → Build Command
   - Enter: `pip install -r requirements.txt`
   - Or leave empty (Railway auto-detects)

3. **Start Command** (CRITICAL):
   - Settings → Deploy → Start Command
   - Enter: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Make sure to use `$PORT` not a fixed port number!**

### 3. Add Environment Variables

Go to **Variables** tab and add:

```
MONGO_URI=your-mongodb-atlas-connection-string
```

**Example:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/event_ease
```

**Optional (for CORS):**
```
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

### 4. Deploy

- Railway will automatically detect changes and redeploy
- Or click "Deploy" button
- Wait for deployment to complete (2-3 minutes)

---

## 🔧 Troubleshooting

### Error: "Module not found" or "Import error"

**Solution:**
- Check that `requirements.txt` is in the `backend` folder
- Verify all dependencies are listed in `requirements.txt`
- Check Railway logs for specific missing module

### Error: "Port already in use" or "Address already in use"

**Solution:**
- Make sure start command uses `$PORT` environment variable
- Don't use fixed port like `8000` or `5000`
- Use: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### Error: "Build failed" or "Installation failed"

**Solution:**
- Check Railway logs for specific error
- Verify `requirements.txt` has correct syntax
- Try updating Python version in `runtime.txt` (if exists)
- Check if all package versions are compatible

### Error: "MongoDB connection failed"

**Solution:**
- Verify `MONGO_URI` environment variable is set
- Check MongoDB Atlas network access allows all IPs (0.0.0.0/0)
- Verify connection string format is correct
- Check Railway logs for connection errors

### Error: "Application failed to start"

**Solution:**
- Check start command is correct
- Verify `server.py` file exists in backend folder
- Check Railway logs for Python errors
- Ensure FastAPI app is named `app` in `server.py`

---

## 📋 Railway Configuration Checklist

Before deploying, verify:

- [ ] **Root Directory** is set to `backend`
- [ ] **Start Command** is: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] **MONGO_URI** environment variable is set
- [ ] `requirements.txt` exists in `backend` folder
- [ ] `server.py` exists in `backend` folder
- [ ] All dependencies are in `requirements.txt`

---

## 🎯 Quick Fix Commands

If deployment fails, check Railway logs and:

1. **Verify Python version:**
   - Railway auto-detects, but you can specify in `runtime.txt`
   - Current: `python-3.11.0`

2. **Check build logs:**
   - Go to Railway dashboard → Your service → Deployments
   - Click on failed deployment → View logs
   - Look for specific error messages

3. **Test locally first:**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn server:app --host 0.0.0.0 --port 8000
   ```

---

## 📝 Railway-Specific Files Created

I've created these files to help Railway deployment:

1. **`backend/runtime.txt`** - Specifies Python version
2. **`backend/railway.json`** - Railway configuration
3. **`backend/nixpacks.toml`** - Nixpacks build configuration
4. **`backend/Procfile`** - Process file (updated)

---

## ✅ After Successful Deployment

1. **Get your backend URL:**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this URL

2. **Test the backend:**
   - Visit: `https://your-app.railway.app/`
   - Should see: `{"message": "Backend is running successfully!"}`

3. **Update frontend:**
   - Set `REACT_APP_API_URL` in Vercel/Netlify to your Railway URL

4. **Update CORS:**
   - Add your frontend URL to `ALLOWED_ORIGINS` in Railway

---

## 🆘 Still Having Issues?

1. **Check Railway Logs:**
   - Railway dashboard → Service → Logs
   - Look for error messages

2. **Common Issues:**
   - Wrong root directory
   - Missing environment variables
   - Incorrect start command
   - Port configuration

3. **Get Help:**
   - Railway Discord: [discord.gg/railway](https://discord.gg/railway)
   - Railway Docs: [docs.railway.app](https://docs.railway.app)

---

## 🎉 Success!

Once deployed, your backend will be live and ready to serve your frontend!

