# 📋 Pre-Deployment Checklist

Use this checklist before deploying your LinkHub application.

## ✅ Code Preparation

- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] Backend server runs without errors
- [ ] Frontend builds successfully (`cd client && npm run build`)
- [ ] All dependencies installed
- [ ] `.env` file configured (but NOT committed)
- [ ] `.gitignore` updated

## ✅ Database Setup

- [ ] MongoDB Atlas account created
- [ ] Database cluster created
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0 for production)
- [ ] Connection string tested
- [ ] Database name included in connection string

## ✅ Environment Variables

Create these in your hosting platform:

- [ ] `ATLAS_URI` - MongoDB connection string
- [ ] `jwtSecret` - Random secure string (min 32 characters)
- [ ] `NODE_ENV` - Set to "production"
- [ ] `PORT` - Usually auto-set by platform

## ✅ Git Repository

- [ ] Code pushed to GitHub/GitLab
- [ ] Repository is public or hosting platform has access
- [ ] `.env` file NOT in repository
- [ ] `node_modules` NOT in repository
- [ ] README.md updated

## ✅ Build Configuration

Verify these commands work locally:

```bash
# Backend
npm install
node server.js

# Frontend
cd client
npm install
npm run build
```

## ✅ Hosting Platform Setup

### For Render:
- [ ] Account created at render.com
- [ ] New Web Service created
- [ ] GitHub repo connected
- [ ] Build command: `npm install && cd client && npm install && npm run build`
- [ ] Start command: `node server.js`
- [ ] Environment variables added
- [ ] Free plan selected

### For Railway:
- [ ] Account created at railway.app
- [ ] Project created from GitHub
- [ ] Environment variables added
- [ ] Domain generated

## ✅ Post-Deployment Testing

After deployment, test these:

- [ ] Homepage loads correctly
- [ ] Signup works
- [ ] Login works
- [ ] Can add links
- [ ] Can edit links
- [ ] Can delete links
- [ ] Drag-and-drop reordering works
- [ ] Analytics page loads
- [ ] Click tracking works
- [ ] Theme toggle works
- [ ] Light/Dark mode works
- [ ] Avatar upload works
- [ ] Emoji picker works
- [ ] Public profile page works (`/username`)
- [ ] Footer links display correctly
- [ ] Mobile responsive design works
- [ ] Three-dot menu on links works

## ✅ Performance & Security

- [ ] HTTPS enabled (auto on most platforms)
- [ ] MongoDB connection secure
- [ ] No sensitive data in client-side code
- [ ] CORS configured properly
- [ ] API rate limiting considered (optional)
- [ ] Error handling in place

## ✅ Optional Enhancements

- [ ] Custom domain configured
- [ ] Google Analytics added
- [ ] Error monitoring (Sentry)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] CDN configured (Cloudflare)
- [ ] Backup strategy for MongoDB
- [ ] CI/CD pipeline setup

## 🚨 Common Issues & Quick Fixes

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json
npm install
cd client && npm install
```

### MongoDB Connection Error
- Check IP whitelist (add 0.0.0.0/0)
- Verify connection string format
- Ensure database name is in connection string
- Check username/password are correct

### 404 on Routes
- Verify `NODE_ENV=production` is set
- Check server.js has correct static file serving
- Ensure build folder exists

### Environment Variables Not Working
- Restart the service after adding variables
- Check variable names match exactly
- No quotes needed in most platforms

## 📝 Deployment Commands

### Initial Deployment
```bash
# 1. Commit all changes
git add .
git commit -m "Ready for deployment"

# 2. Push to GitHub
git push origin main

# 3. Platform will auto-deploy
```

### Update Deployment
```bash
# Make changes, then:
git add .
git commit -m "Update: description of changes"
git push origin main
```

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Application loads at your deployment URL
- ✅ Users can sign up and log in
- ✅ All CRUD operations work
- ✅ Analytics display correctly
- ✅ Mobile version works properly
- ✅ No console errors
- ✅ Database operations succeed

## 📞 Need Help?

If you encounter issues:
1. Check platform logs
2. Review error messages
3. Verify environment variables
4. Test MongoDB connection
5. Check GitHub issues
6. Contact platform support

---

**Good luck with your deployment! 🚀**
