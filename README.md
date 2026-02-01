# MERN Image Search

A full-stack image search application built with MongoDB, Express, React, and Node.js. Features OAuth authentication (Google, GitHub, Facebook), Unsplash API integration for image searches, search history tracking, and a modern UI with multi-select functionality.

## 🚀 Features

- **OAuth Authentication**: Login with Google, GitHub, or Facebook
- **Image Search**: Powered by Unsplash API
- **Search History**: Per-user search history tracking
- **Top Searches**: Aggregated statistics of most popular searches
- **Multi-Select**: Select multiple images with visual feedback
- **Responsive UI**: Modern, dark-themed interface built with Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and **npm** 9+ installed
- **MongoDB Atlas** account (or local MongoDB instance)
- **OAuth App Credentials** for at least one provider:
  - Google Cloud Console account
  - GitHub Developer account
  - Facebook Developer account
- **Unsplash Developer Account** and Access Key

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mern-image-search
```

### 2. Server Setup

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
cd server
cp env.example.txt .env
```

Edit `.env` with your actual credentials:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mern-image-search?retryWrites=true&w=majority
# OR for local MongoDB:
# MONGO_URI=mongodb://localhost:27017/mern-image-search

# Session Secret (generate a random string)
SESSION_SECRET=your_super_secret_random_string_here_min_32_chars

# Google OAuth (Optional - only if using Google login)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# GitHub OAuth (Optional - only if using GitHub login)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback

# Facebook OAuth (Optional - only if using Facebook login)
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
FACEBOOK_CALLBACK_URL=http://localhost:5000/auth/facebook/callback

# Unsplash API (Required)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
UNSPLASH_BASE_URL=https://api.unsplash.com
```

**⚠️ Important:** Never commit your `.env` file to version control!

### 4. Client Setup

```bash
cd ../client
npm install
```

### 5. OAuth Provider Configuration

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Set Application type: "Web application"
6. Add Authorized redirect URI: `http://localhost:5000/auth/google/callback`
7. Copy Client ID and Client Secret to `.env`

#### GitHub OAuth Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Application name, Homepage URL, and Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and generate Client Secret
5. Add to `.env`

#### Facebook OAuth Setup
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new App
3. Add "Facebook Login" product
4. Set Valid OAuth Redirect URIs: `http://localhost:5000/auth/facebook/callback`
5. Copy App ID and App Secret to `.env`

### 6. Unsplash API Setup
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy the Access Key
4. Add to `.env` as `UNSPLASH_ACCESS_KEY`

## ▶️ Running the Application

### Development Mode

Open two terminal windows:

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Client:**
```bash
cd client
npm start
```
Client will run on `http://localhost:3000` and automatically open in your browser.

## 📁 Folder Structure

```
mern-image-search/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   │   ├── app-icon-1024.svg
│   │   ├── favicon.ico
│   │   └── index.html
│   └── src/               # Source code
│       ├── api/          # API configuration
│       │   └── axiosConfig.js
│       ├── components/   # React components
│       │   ├── AccountSettings.js
│       │   ├── HistorySidebar.js
│       │   └── ImageGrid.js
│       ├── pages/        # Page components
│       │   ├── LoginPage.js
│       │   └── SearchPage.js
│       ├── App.js        # Main app component
│       └── index.js      # Entry point
│
├── server/               # Express backend application
│   ├── models/          # MongoDB models
│   │   ├── Search.js    # Search history model
│   │   └── User.js      # User model
│   ├── routes/          # API routes
│   │   ├── api.js       # Main API endpoints
│   │   ├── auth.js      # OAuth authentication routes
│   │   ├── privacy.js   # Privacy policy pages
│   │   └── terms.js     # Terms of service pages
│   ├── services/        # Services
│   │   └── passport.js  # Passport.js OAuth configuration
│   ├── tests/           # Test files
│   ├── index.js         # Server entry point
│   ├── package.json     # Server dependencies
│   └── .env             # Environment variables (not committed)
│
├── visuals/             # Screenshots/GIFs for documentation
│   └── README.txt
│
├── README.md            # This file
├── FACEBOOK_SUBMISSION_GUIDE.md
└── FACEBOOK_REQUIREMENTS_SUMMARY.md
```

### Key Files Explained

- **`server/index.js`**: Main Express server setup, middleware configuration, route mounting
- **`server/routes/api.js`**: Image search, history, and user data endpoints
- **`server/routes/auth.js`**: OAuth login/logout routes (Google, GitHub, Facebook)
- **`server/services/passport.js`**: Passport.js strategies for OAuth providers
- **`server/models/User.js`**: MongoDB schema for user accounts
- **`server/models/Search.js`**: MongoDB schema for search history
- **`client/src/App.js`**: Root React component, handles routing
- **`client/src/pages/SearchPage.js`**: Main search interface
- **`client/src/components/ImageGrid.js`**: Image display with multi-select

## 📬 Postman Collection

A complete Postman collection is available: `Postman_Collection.json`

**To import:**
1. Open Postman
2. Click "Import"
3. Select `Postman_Collection.json`
4. All endpoints will be available with example requests

## 🔌 API Endpoints

### Authentication Endpoints

#### Check OAuth Configuration Status
```bash
curl http://localhost:5000/auth/status
```
**Response:**
```json
{
  "google": {
    "id": true,
    "secret": true,
    "callback": "http://localhost:5000/auth/google/callback"
  },
  "github": {
    "id": true,
    "secret": true,
    "callback": "http://localhost:5000/auth/github/callback"
  },
  "facebook": {
    "id": true,
    "secret": true,
    "callback": "http://localhost:5000/auth/facebook/callback"
  }
}
```

#### Google OAuth Login
```bash
# Redirects to Google login
curl -L http://localhost:5000/auth/google
```

#### GitHub OAuth Login
```bash
# Redirects to GitHub login
curl -L http://localhost:5000/auth/github
```

#### Facebook OAuth Login
```bash
# Redirects to Facebook login
curl -L http://localhost:5000/auth/facebook
```

#### Logout
```bash
curl -L http://localhost:5000/auth/logout
```

### API Endpoints

#### Get Current User
```bash
curl http://localhost:5000/api/current_user \
  --cookie "connect.sid=<session_cookie>"
```
**Response (when logged in):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "displayName": "John Doe",
    "provider": "google"
  }
}
```
**Response (when not logged in):**
```json
{
  "user": null
}
```

#### Get Top Searches
```bash
curl http://localhost:5000/api/top-searches
```
**Response:**
```json
[
  { "term": "nature", "count": 45 },
  { "term": "mountains", "count": 32 },
  { "term": "ocean", "count": 28 }
]
```

#### Search Images (Requires Authentication)
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  --cookie "connect.sid=<session_cookie>" \
  -d '{"term":"sunset"}'
```
**Response:**
```json
{
  "total": 15000,
  "results": [
    {
      "id": "abc123",
      "urls": {
        "regular": "https://images.unsplash.com/photo-1234567890"
      },
      "alt_description": "Beautiful sunset",
      "user": {
        "name": "Photographer Name"
      }
    }
  ]
}
```

#### Get User Search History (Requires Authentication)
```bash
curl http://localhost:5000/api/history \
  --cookie "connect.sid=<session_cookie>"
```
**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "term": "sunset",
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439012",
    "term": "mountains",
    "timestamp": "2024-01-14T15:20:00.000Z"
  }
]
```

#### Delete User Data (Requires Authentication)
```bash
curl -X DELETE http://localhost:5000/api/user-data \
  --cookie "connect.sid=<session_cookie>"
```
**Response:**
```json
{
  "success": true,
  "message": "All user data has been permanently deleted"
}
```

### Legal/Information Pages

#### Privacy Policy
```bash
curl http://localhost:5000/privacy
```
Returns HTML page with privacy policy.

#### Terms of Service
```bash
curl http://localhost:5000/terms
```
Returns HTML page with terms of service.

#### Data Deletion Instructions
```bash
curl http://localhost:5000/privacy/data-deletion
```
Returns HTML page with step-by-step data deletion instructions.

## 🧪 Testing with cURL

### Complete Authentication Flow Example

```bash
# 1. Visit OAuth login (opens in browser)
# Or get redirect URL:
OAUTH_URL=$(curl -s -L -o /dev/null -w '%{url_effective}' http://localhost:5000/auth/google)

# 2. After login, you'll have a session cookie
# 3. Use the cookie for authenticated requests:

# Check current user
curl http://localhost:5000/api/current_user \
  --cookie "connect.sid=<your_session_cookie>"

# Search for images
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  --cookie "connect.sid=<your_session_cookie>" \
  -d '{"term":"cookies"}'

# Get search history
curl http://localhost:5000/api/history \
  --cookie "connect.sid=<your_session_cookie>"
```

### Getting Session Cookie from Browser

1. Log in via browser at `http://localhost:3000`
2. Open Developer Tools (F12)
3. Go to Application/Storage → Cookies → `http://localhost:5000`
4. Copy the value of `connect.sid`
5. Use it in cURL requests as shown above

## 🔐 OAuth + Unsplash Integration Details

### OAuth Integration

The application uses **Passport.js** with three OAuth strategies:

1. **Google OAuth 2.0** (`passport-google-oauth20`)
   - Scopes: `profile`, `email`
   - Strategy file: `server/services/passport.js` (lines 18-45)

2. **GitHub OAuth 2.0** (`passport-github2`)
   - Scopes: `user:email`
   - Strategy file: `server/services/passport.js` (lines 47-74)

3. **Facebook OAuth 2.0** (`passport-facebook`)
   - Scopes: `email`
   - Strategy file: `server/services/passport.js` (lines 76-104)

All strategies:
- Automatically register users on first login
- Store user info in MongoDB
- Use session-based authentication
- Redirect to `http://localhost:3000` on success

### Unsplash Integration

The Unsplash API integration is in `server/routes/api.js`:

- **Endpoint**: `POST /api/search`
- **Implementation**: Lines 27-57
- **Features**:
  - Searches Unsplash photos via `/search/photos`
  - Uses `UNSPLASH_ACCESS_KEY` from environment
  - Returns 20 results per search
  - Tracks search terms in MongoDB
  - Requires user authentication

**API Call Structure:**
```javascript
axios.get('https://api.unsplash.com/search/photos', {
  params: { query: term, per_page: 20 },
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    'Accept-Version': 'v1'
  }
})
```

## 🎨 Client UI Features

- **Login Page**: OAuth provider buttons (Google, GitHub, Facebook)
- **Search Page**: 
  - Top searches banner with clickable buttons
  - Search bar with Unsplash integration
  - 4-column responsive image grid
  - Multi-select with overlay checkboxes
  - Selection counter
  - Search history sidebar
  - Account settings with data deletion

## 🚀 Deployment

### Server Deployment
- Deploy to **Render**, **Heroku**, or **Vercel**
- Set all environment variables in hosting platform
- Update OAuth callback URLs for production domain
- Use MongoDB Atlas for database

### Client Deployment
- Build: `cd client && npm run build`
- Deploy to **Netlify**, **Vercel**, or serve static files
- Update API base URL if needed

### Production Considerations
- Use HTTPS
- Set `cookie.secure: true` for sessions
- Update CORS origins
- Use environment-specific URLs

## 📝 Notes

- The app works even if MongoDB is not configured (graceful degradation)
- OAuth providers are optional - configure only what you need
- Unsplash API key is **required** for image search to work
- All endpoints return JSON except legal pages (`/privacy`, `/terms`)

## 📸 Visual Proof

Add screenshots/GIFs to `visuals/` directory:
- `visuals/login.png` - OAuth login screen
- `visuals/top-searches.png` - Top searches banner
- `visuals/search-select.gif` - Search with multi-select
- `visuals/history.png` - Search history sidebar

## 📄 License

[Your License Here]

## 👤 Author

Rohit Kumar

--

**Built using MERN Stack**
