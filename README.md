# 🔗 LinkHub - One Link for Everything

A modern, feature-rich link-in-bio application built with the MERN stack. Share all your important links in one beautiful, customizable page.

![LinkHub](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

## ✨ Features

### 🎨 User Experience
- **Beautiful UI/UX** - Modern glassmorphism design with purple gradient theme
- **Light/Dark Mode** - Toggle between themes with persistent preference
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Animated Particles** - Dynamic background effects
- **Profile Customization** - Avatar upload, bio, and emoji badges

### 🔗 Link Management
- **Unlimited Links** - Add as many links as you need
- **Social Icons** - Auto-detect and display icons for popular platforms
- **Drag & Drop** - Reorder links with intuitive drag-and-drop
- **Three-Dot Menu** - Copy, share, or open links in new tabs
- **Click Tracking** - Monitor engagement on each link

### 📊 Analytics Dashboard
- **Click Analytics** - Track total clicks and per-link performance
- **7-Day Trends** - Visual bar chart showing click history
- **Most Clicked** - Highlight your top-performing link
- **Real-time Stats** - Live updates on link performance

### 🎯 Customization
- **8 Color Themes** - Choose from beautiful gradient themes
- **Profile Emoji** - Add personality with 36+ emoji options
- **Custom Bio** - Share your story (150 characters)
- **Avatar Upload** - Personalize with your photo

### 🔐 Security
- **JWT Authentication** - Secure login and signup
- **Password Hashing** - bcrypt encryption
- **Protected Routes** - Secure API endpoints

## 🚀 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- React Icons
- React Beautiful DnD
- React Spinners

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- Multer (file uploads)

### Styling
- Custom CSS with CSS Variables
- Glassmorphism effects
- Gradient backgrounds
- Smooth animations

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/linkhub.git
cd linkhub
```

2. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
ATLAS_URI=your_mongodb_connection_string
jwtSecret=your_secret_key_here
PORT=5000
```

4. **Run the application**

Development mode (both servers):
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

Or use concurrently (if installed):
```bash
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Render (Recommended)
- Railway
- Vercel
- Heroku

Quick deploy to Render:
1. Push code to GitHub
2. Connect to Render
3. Add environment variables
4. Deploy!

## 📱 Usage

### For Users
1. **Sign Up** - Create your account
2. **Add Links** - Add your social media, portfolio, etc.
3. **Customize** - Choose theme, add bio, upload avatar
4. **Share** - Share your unique URL: `yourapp.com/username`

### For Visitors
1. Visit any user's profile: `yourapp.com/username`
2. Click links to visit their content
3. Toggle light/dark mode for comfortable viewing

## 🎯 Key Features Showcase

### Analytics Dashboard
```
📊 Total Clicks: 1,234
📈 7-Day Trend Chart
🏆 Most Clicked Link
📋 Per-Link Performance
```

### Link Management
```
🔗 Add unlimited links
🎨 Auto-detect social icons
↕️ Drag to reorder
⋮ Three-dot menu (copy/share/open)
📊 Click counter on each link
```

### Customization Options
```
🎨 8 beautiful themes
😊 36+ profile emojis
📝 Custom bio (150 chars)
🖼️ Avatar upload
🌓 Light/Dark mode toggle
```

## 🛠️ Project Structure

```
linkhub/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── imgs/          # Images
│   │   ├── index.css      # Main styles
│   │   └── themes.css     # Theme styles
│   └── package.json
├── models/                # MongoDB models
│   ├── User.js
│   └── Link.js
├── routes/                # Express routes
│   └── user.js
├── uploads/               # User avatars
├── server.js              # Express server
├── .env                   # Environment variables
├── .gitignore
├── package.json
├── DEPLOYMENT.md          # Deployment guide
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /users/signup` - Create new user
- `POST /users/login` - User login

### User Management
- `GET /users/:username` - Get user profile
- `GET /users/admin` - Get admin data
- `PATCH /users/:username/bio` - Update bio
- `PATCH /users/:username/emoji` - Update emoji
- `PATCH /users/:username/theme` - Update theme
- `PATCH /users/:username/avatar` - Upload avatar

### Link Management
- `POST /users/:username/link` - Add new link
- `DELETE /users/:username/link/:linkId` - Delete link
- `PATCH /users/:username/link/:linkId` - Update link
- `POST /users/:username/reorder` - Reorder links
- `POST /users/:username/click/:linkId` - Track click

### Analytics
- `GET /users/:username/analytics` - Get analytics data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Linktree
- Built with MERN stack
- Icons from React Icons
- Animations and effects with CSS

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🎉 Show Your Support

Give a ⭐️ if you like this project!

---

**Made with ❤️ for developers and creators**
