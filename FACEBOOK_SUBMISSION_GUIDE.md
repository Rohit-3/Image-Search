# Facebook App Submission Requirements - Complete Guide

This document outlines all the requirements for submitting your MERN Image Search app to Facebook and provides instructions on how to fulfill each requirement.

## ✅ Completed Requirements

### 1. App Icon (1024 x 1024)

**Status:** ✅ SVG icon created  
**Location:** `client/public/app-icon-1024.svg`

**Next Steps:**
1. Convert the SVG to PNG format at exactly 1024x1024 pixels
2. You can use one of these methods:
   - **Online tools:** Use [CloudConvert](https://cloudconvert.com/svg-to-png) or [Convertio](https://convertio.co/svg-png/)
   - **Image editors:** GIMP, Photoshop, or Figma can export SVG to PNG at specific dimensions
   - **Command line:** If you have ImageMagick installed: `convert -background none -size 1024x1024 app-icon-1024.svg app-icon-1024.png`
   - **Inkscape:** `inkscape app-icon-1024.svg --export-filename=app-icon-1024.png --export-width=1024 --export-height=1024`

3. Save the PNG file as `app-icon-1024.png` in `client/public/` directory
4. Upload this file to Facebook App Dashboard under Settings → Basic → App Icon

### 2. Privacy Policy URL

**Status:** ✅ Implemented  
**URL:** `http://localhost:5000/privacy` (or your production domain + `/privacy`)

**What's Included:**
- Comprehensive privacy policy covering all data collection practices
- Information about OAuth providers (Google, GitHub, Facebook)
- Details about Unsplash API usage
- User rights and data deletion information
- GDPR and CCPA compliance information

**For Production:**
- Update the contact email and website URL in `server/routes/privacy.js` (lines with `[Your Contact Email]` and `[Your Website URL]`)
- Ensure the privacy policy URL is publicly accessible (no authentication required)
- Add the URL to Facebook App Dashboard under Settings → Basic → Privacy Policy URL

### 3. User Data Deletion

**Status:** ✅ Fully Implemented

**Backend Endpoint:**
- **URL:** `DELETE /api/user-data`
- **Location:** `server/routes/api.js`
- **Functionality:**
  - Deletes all user search history
  - Deletes user account
  - Logs out the user session
  - Returns confirmation

**Frontend UI:**
- **Component:** `client/src/components/AccountSettings.js`
- **Access:** Click "Settings" button in the header (next to user name)
- **Features:**
  - Two-step confirmation for data deletion
  - Clear warning about permanent deletion
  - Visual feedback during deletion process
  - Automatic logout after deletion

**For Facebook:**
1. In Facebook App Dashboard, go to Settings → Basic
2. Scroll to "User Data Deletion" section
3. Add the data deletion callback URL:
   - Format: `https://yourdomain.com/api/user-data-deletion-callback`
   - OR provide instructions URL that directs users to your settings page

**Facebook Callback Endpoint (Optional but Recommended):**

You can create a callback endpoint for Facebook to notify you when a user requests deletion through Facebook's interface. Add this to `server/routes/api.js`:

```javascript
// Facebook data deletion callback
router.post('/user-data-deletion-callback', async (req, res) => {
  const { signed_request } = req.body;
  // Verify signed_request from Facebook (see Facebook docs)
  // Extract user_id from signed_request
  // Delete user data
  // Return confirmation URL
  res.json({ url: 'https://yourdomain.com/privacy' });
});
```

However, the current implementation with the UI and API endpoint should be sufficient for most cases.

### 4. Category

**Status:** ⚠️ Must be set in Facebook Dashboard

**Recommended Category:** 
- **Primary Category:** "Entertainment" or "Photo & Video"
- **Secondary Category:** "Search & Discovery" (if available)

**How to Set:**
1. Go to Facebook App Dashboard → Settings → Basic
2. Find "Category" section
3. Select the most appropriate category from the dropdown:
   - **Entertainment** - Best fit for image search/discovery apps
   - **Photo & Video** - Alternative if focusing on photo features
4. If available, add a secondary category

**Alternative Categories:**
- **Utilities** - If positioning as a utility tool
- **Business** - If targeting business users
- **Education** - If educational use case

## 📋 Facebook App Dashboard Checklist

Before submitting, ensure you have completed:

- [ ] **App Icon:** Upload 1024x1024 PNG to Settings → Basic → App Icon
- [ ] **Privacy Policy URL:** Add `https://yourdomain.com/privacy` to Settings → Basic
- [ ] **User Data Deletion:** 
  - [ ] Verify data deletion endpoint works: `DELETE /api/user-data`
  - [ ] Test the deletion flow in your app
  - [ ] Add deletion instructions or callback URL in Facebook Dashboard
- [ ] **Category:** Select appropriate category in Settings → Basic
- [ ] **App Display Name:** Set a clear, descriptive name
- [ ] **App Domain:** Configure your production domain
- [ ] **Valid OAuth Redirect URIs:** Add production callback URLs
- [ ] **Platform Settings:** Configure Web platform with Site URL

## 🔗 Important URLs for Facebook Configuration

Make sure these URLs are configured in Facebook App Dashboard → Settings → Basic:

1. **Privacy Policy URL:** `https://yourdomain.com/privacy`
2. **Site URL:** `https://yourdomain.com`
3. **Valid OAuth Redirect URIs:** 
   - `https://yourdomain.com/auth/facebook/callback`
   - `https://yourdomain.com` (if using implicit flow)

## 🧪 Testing Checklist

Before submission, test:

- [ ] Privacy policy page loads correctly
- [ ] Privacy policy is accessible without authentication
- [ ] User can access account settings when logged in
- [ ] User can delete their account and data
- [ ] Deleted user data is permanently removed from database
- [ ] User is logged out after deletion
- [ ] App icon displays correctly (1024x1024 PNG format)

## 📝 Additional Notes

1. **Production Deployment:** 
   - Update all URLs in the codebase for production
   - Set `REACT_APP_API_URL` environment variable in client
   - Update CORS origins in server
   - Use HTTPS for production

2. **Privacy Policy Customization:**
   - Update contact email in `server/routes/privacy.js`
   - Add your company/organization name if applicable
   - Customize data collection details if needed

3. **Data Deletion:**
   - The current implementation deletes all user data immediately
   - Consider adding a grace period or confirmation email (optional)
   - Ensure backups don't retain deleted user data

4. **Facebook Review:**
   - Facebook may request screenshots or video walkthrough
   - Be prepared to demonstrate the data deletion flow
   - Ensure all URLs are publicly accessible for review

## 🚀 Next Steps

1. Convert SVG icon to 1024x1024 PNG
2. Deploy your app to production
3. Update all URLs in Facebook App Dashboard
4. Complete the category selection
5. Submit for Facebook review

Good luck with your submission! 🎉

