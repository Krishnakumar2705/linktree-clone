# 🚀 Deployment Guide - LinkHub

This guide will help you deploy your LinkHub application to production.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ MongoDB Atlas account with connection string
- ✅ Git repository (GitHub recommended)
- ✅ All environment variables ready

---

## 🌐 Option 1: Deploy to Render (Recommended - FREE)

Render offers free hosting for full-stack applications.

### Step 1: Prepare Your Code

1. Make sure your `.gitignore` includes:
```
node_modules/
.env
client/node_modules/
client/build/
uploads/*.png
!uploads/default.png
```

2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: linkhub (or your choice)
   - **Environment**: Node
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. Add Environment Variables:
   - `ATLAS_URI` = your MongoDB connection string
   - `jwtSecret` = your JWT secret key
   - `NODE_ENV` = production

6. Click "Create Web Service"

### Step 3: Wait for Deployment
- First deployment takes 5-10 minutes
- You'll get a URL like: `https://linkhub.onrender.com`

---

## ⚡ Option 2: Deploy to Railway (Alternative - FREE)

Railway is another excellent free hosting platform.

### Step 1: Deploy

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js

### Step 2: Add Environment Variables

1. Go to your project → Variables
2. Add:
   - `ATLAS_URI` = your MongoDB connection string
   - `jwtSecret` = your JWT secret key
   - `NODE_ENV` = production

### Step 3: Configure Build

Railway should auto-detect, but if needed:
- Build Command: `npm install && cd client && npm install && npm run build`
- Start Command: `node server.js`

### Step 4: Get Your URL
- Click "Settings" → "Generate Domain"
- You'll get: `https://your-app.up.railway.app`

---

## 🔧 Option 3: Deploy to Vercel + MongoDB Atlas

Split deployment: Frontend on Vercel, Backend elsewhere.

### Backend (Render/Railway)
Follow Option 1 or 2 above for backend.

### Frontend (Vercel)

1. Update `client/package.json` to add proxy:
```json
"proxy": "https://your-backend-url.onrender.com"
```

2. Deploy to Vercel:
```bash
cd client
npm install -g vercel
vercel
```

3. Follow prompts and deploy

---

## 🔐 Important: Update server.js for Production

Your `server.js` is already configured, but verify this section:

```javascript
if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
```

---

## 📝 Environment Variables Checklist

Make sure these are set in your hosting platform:

- ✅ `ATLAS_URI` - MongoDB connection string
- ✅ `jwtSecret` - JWT secret for authentication
- ✅ `NODE_ENV` - Set to "production"
- ✅ `PORT` - Usually auto-set by hosting platform

---

## 🧪 Testing Your Deployment

After deployment:

1. ✅ Visit your deployed URL
2. ✅ Test signup/login
3. ✅ Add links and test functionality
4. ✅ Check analytics
5. ✅ Test theme toggle
6. ✅ Test on mobile devices

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution**: Check your MongoDB Atlas:
- IP Whitelist: Add `0.0.0.0/0` to allow all IPs
- Database user credentials are correct
- Connection string includes database name

### Issue: "Application Error" or 500 errors
**Solution**: 
- Check environment variables are set correctly
- View logs in your hosting platform
- Ensure `NODE_ENV=production` is set

### Issue: Frontend shows but API calls fail
**Solution**:
- Check CORS settings in server.js
- Verify API endpoints are correct
- Check network tab in browser DevTools

### Issue: Build fails
**Solution**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node version compatibility

---

## 🎯 Post-Deployment Checklist

- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (auto on Render/Railway)
- [ ] MongoDB backups enabled
- [ ] Error monitoring setup (optional: Sentry)
- [ ] Analytics tracking (optional: Google Analytics)
- [ ] Performance testing completed
- [ ] Mobile responsiveness verified

---

## 🔄 Updating Your Deployment

To update your live site:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Most platforms auto-deploy on push to main branch.

---

## 💡 Pro Tips

1. **Custom Domain**: Most platforms allow free custom domains
2. **Monitoring**: Set up uptime monitoring (UptimeRobot is free)
3. **Backups**: Enable MongoDB Atlas automated backups
4. **CDN**: Consider Cloudflare for better performance
5. **Environment**: Keep separate staging and production environments

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

## 🎉 Congratulations!

Your LinkHub application is now live and accessible worldwide! 🌍

Share your link: `https://your-app-url.com/yourusername`
