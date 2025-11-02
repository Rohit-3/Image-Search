const router = require('express').Router();
const path = require('path');

// Privacy Policy HTML
router.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - MERN Image Search</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: #4F46E5;
            border-bottom: 3px solid #4F46E5;
            padding-bottom: 10px;
        }
        h2 {
            color: #7C3AED;
            margin-top: 30px;
        }
        .last-updated {
            color: #666;
            font-style: italic;
            margin-bottom: 30px;
        }
        .contact {
            background: #e0e7ff;
            padding: 15px;
            border-radius: 8px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last Updated: ${new Date().toLocaleDateString()}</p>
    
    <h2>1. Introduction</h2>
    <p>MERN Image Search ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our image search application.</p>
    
    <h2>2. Information We Collect</h2>
    <h3>2.1 Authentication Information</h3>
    <p>When you log in through OAuth providers (Google, GitHub, or Facebook), we collect:</p>
    <ul>
        <li>Your display name</li>
        <li>Your email address (if provided by the OAuth provider)</li>
        <li>Your provider ID and authentication provider name</li>
    </ul>
    
    <h3>2.2 Usage Data</h3>
    <p>We collect information about your search activity:</p>
    <ul>
        <li>Search terms you enter</li>
        <li>Timestamp of searches</li>
        <li>Search history associated with your account</li>
    </ul>
    
    <h2>3. How We Use Your Information</h2>
    <p>We use the collected information to:</p>
    <ul>
        <li>Provide and maintain our service</li>
        <li>Authenticate your identity</li>
        <li>Track and display your search history</li>
        <li>Generate aggregated statistics on top searches (without personal identification)</li>
        <li>Improve our service</li>
    </ul>
    
    <h2>4. Data Storage</h2>
    <p>Your data is stored securely in our MongoDB database. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
    
    <h2>5. Third-Party Services</h2>
    <h3>5.1 OAuth Providers</h3>
    <p>We use OAuth authentication services provided by Google, GitHub, and Facebook. When you log in, these providers share your basic profile information (name, email) with us according to their respective privacy policies.</p>
    
    <h3>5.2 Unsplash API</h3>
    <p>We use the Unsplash API to retrieve image search results. Your search terms are sent to Unsplash to fetch relevant images. Please refer to <a href="https://unsplash.com/privacy" target="_blank">Unsplash's Privacy Policy</a> for information on how they handle data.</p>
    
    <h2>6. Data Retention</h2>
    <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You may request deletion of your data at any time (see Section 8).</p>
    
    <h2>7. Your Rights</h2>
    <p>You have the right to:</p>
    <ul>
        <li>Access your personal data</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to processing of your data</li>
        <li>Request data portability</li>
    </ul>
    
    <h2>8. Data Deletion</h2>
    <p>You can request deletion of your account and associated data at any time. To do so:</p>
    <ol>
        <li>Log into your account</li>
        <li>Navigate to Account Settings</li>
        <li>Click "Delete My Account" or "Delete My Data"</li>
        <li>Confirm the deletion</li>
    </ol>
    <p>Upon confirmation, we will permanently delete:</p>
    <ul>
        <li>Your user account information</li>
        <li>All your search history</li>
        <li>Any other personal data associated with your account</li>
    </ul>
    <p>This action is irreversible. If you need assistance with data deletion, please contact us using the information below.</p>
    
    <h2>9. Cookies and Session Data</h2>
    <p>We use session cookies to maintain your authentication state. These cookies are essential for the application to function and do not contain personal information beyond what is necessary for authentication.</p>
    
    <h2>10. Security</h2>
    <p>We take security seriously and implement industry-standard measures to protect your data, including encryption in transit and secure session management. However, no method of transmission over the Internet is 100% secure.</p>
    
    <h2>11. Children's Privacy</h2>
    <p>Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
    
    <h2>12. Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
    
    <h2>13. Terms of Service</h2>
    <p>Your use of the Service is also governed by our Terms of Service. Please review our <a href="/terms">Terms of Service</a> to understand the rules and regulations governing your use of the Service.</p>
    
    <h2>14. Contact Us</h2>
    <div class="contact">
        <p>If you have questions about this Privacy Policy or wish to exercise your rights regarding your personal data, please contact us:</p>
        <p><strong>Email:</strong> [Your Contact Email]<br>
        <strong>Website:</strong> [Your Website URL]</p>
    </div>
    
    <h2>15. Compliance</h2>
    <p>This Privacy Policy complies with:</p>
    <ul>
        <li>General Data Protection Regulation (GDPR) for EU users</li>
        <li>California Consumer Privacy Act (CCPA) for California residents</li>
        <li>Facebook App Privacy Requirements</li>
    </ul>
</body>
</html>
  `;
  res.send(html);
});

// Data Deletion Instructions Page (for Facebook)
router.get('/data-deletion', (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Deletion Instructions - MERN Image Search</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h1 {
            color: #4F46E5;
            border-bottom: 3px solid #4F46E5;
            padding-bottom: 10px;
        }
        .instructions {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .step {
            margin: 15px 0;
            padding: 15px;
            background: #f0f9ff;
            border-left: 4px solid #4F46E5;
        }
        .warning {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
            font-weight: 500;
        }
        .button:hover {
            background: #4338ca;
        }
    </style>
</head>
<body>
    <h1>Data Deletion Instructions</h1>
    
    <div class="instructions">
        <p>If you would like to delete your account and all associated data from MERN Image Search, please follow these steps:</p>
        
        <div class="step">
            <strong>Step 1:</strong> Log into your account at <a href="${baseUrl.replace('5000', '3000')}" target="_blank">${baseUrl.replace('5000', '3000')}</a>
        </div>
        
        <div class="step">
            <strong>Step 2:</strong> Click on the "Settings" button in the header (next to your display name)
        </div>
        
        <div class="step">
            <strong>Step 3:</strong> Scroll down to the "Delete Account & Data" section
        </div>
        
        <div class="step">
            <strong>Step 4:</strong> Click "Delete Account" button
        </div>
        
        <div class="step">
            <strong>Step 5:</strong> Confirm the deletion by clicking "Yes, Delete My Account"
        </div>
        
        <div class="warning">
            <strong>⚠️ Warning:</strong> This action is permanent and irreversible. All your data including:
            <ul>
                <li>Your user account information</li>
                <li>All search history</li>
                <li>Any other personal data</li>
            </ul>
            will be permanently deleted and cannot be recovered.
        </div>
        
        <a href="${baseUrl.replace('5000', '3000')}" class="button">Go to App →</a>
    </div>
    
    <div style="margin-top: 30px; padding: 15px; background: #e0e7ff; border-radius: 8px;">
        <p><strong>Need Help?</strong></p>
        <p>If you have trouble accessing your account or need assistance with data deletion, please contact us at: <strong>[Your Contact Email]</strong></p>
    </div>
</body>
</html>
  `;
  res.send(html);
});

module.exports = router;
