const router = require('express').Router();

// Terms of Service HTML
router.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Service - MERN Image Search</title>
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
        .warning {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>Terms of Service</h1>
    <p class="last-updated">Last Updated: ${new Date().toLocaleDateString()}</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing and using MERN Image Search ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
    
    <h2>2. Description of Service</h2>
    <p>MERN Image Search is an image search application that allows users to search for images using the Unsplash API. The Service provides:</p>
    <ul>
        <li>Image search functionality</li>
        <li>User authentication via OAuth providers (Google, GitHub, Facebook)</li>
        <li>Search history tracking</li>
        <li>Top searches statistics</li>
    </ul>
    
    <h2>3. User Accounts</h2>
    <h3>3.1 Registration</h3>
    <p>To use certain features of the Service, you must register for an account using one of the supported OAuth providers (Google, GitHub, or Facebook). By registering, you agree to:</p>
    <ul>
        <li>Provide accurate and complete information</li>
        <li>Maintain and update your account information</li>
        <li>Maintain the security of your account</li>
        <li>Accept responsibility for all activities under your account</li>
    </ul>
    
    <h3>3.2 Account Responsibility</h3>
    <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
    
    <h2>4. Acceptable Use</h2>
    <p>You agree not to use the Service to:</p>
    <ul>
        <li>Violate any applicable laws or regulations</li>
        <li>Infringe upon the rights of others</li>
        <li>Transmit any harmful, threatening, abusive, or offensive content</li>
        <li>Attempt to gain unauthorized access to the Service or related systems</li>
        <li>Interfere with or disrupt the Service or servers</li>
        <li>Use automated systems to access the Service without permission</li>
        <li>Impersonate any person or entity</li>
        <li>Collect or harvest information about other users</li>
    </ul>
    
    <h2>5. Third-Party Services</h2>
    <h3>5.1 OAuth Providers</h3>
    <p>The Service uses OAuth authentication provided by third parties (Google, GitHub, Facebook). Your use of these services is subject to their respective terms of service and privacy policies.</p>
    
    <h3>5.2 Unsplash API</h3>
    <p>Image search results are provided by Unsplash. All images are subject to Unsplash's <a href="https://unsplash.com/license" target="_blank">License</a> and <a href="https://unsplash.com/terms" target="_blank">Terms of Service</a>. By using our Service, you agree to comply with Unsplash's terms.</p>
    
    <h2>6. Intellectual Property</h2>
    <h3>6.1 Our Content</h3>
    <p>The Service, including its original content, features, and functionality, is owned by MERN Image Search and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
    
    <h3>6.2 Third-Party Content</h3>
    <p>Images displayed through the Service are provided by Unsplash and are subject to their licensing terms. You are responsible for complying with any image usage restrictions.</p>
    
    <h2>7. Privacy</h2>
    <p>Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy at <a href="/privacy">/privacy</a> to understand our practices.</p>
    
    <h2>8. Service Availability</h2>
    <p>We strive to provide continuous access to the Service, but we do not guarantee:</p>
    <ul>
        <li>That the Service will be available at all times</li>
        <li>That the Service will be error-free or uninterrupted</li>
        <li>That defects will be corrected</li>
        <li>The accuracy or reliability of search results</li>
    </ul>
    <p>We reserve the right to modify, suspend, or discontinue the Service at any time without notice.</p>
    
    <h2>9. Limitation of Liability</h2>
    <div class="warning">
        <p><strong>Disclaimer:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
    </div>
    <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.</p>
    
    <h2>10. Indemnification</h2>
    <p>You agree to indemnify and hold harmless MERN Image Search, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or relating to:</p>
    <ul>
        <li>Your use of the Service</li>
        <li>Your violation of these Terms</li>
        <li>Your violation of any rights of another</li>
    </ul>
    
    <h2>11. Termination</h2>
    <h3>11.1 By You</h3>
    <p>You may terminate your account at any time by using the account deletion feature in Settings or by contacting us directly.</p>
    
    <h3>11.2 By Us</h3>
    <p>We reserve the right to suspend or terminate your access to the Service, with or without notice, for any reason, including:</p>
    <ul>
        <li>Violation of these Terms</li>
        <li>Fraudulent, abusive, or illegal activity</li>
        <li>Extended periods of inactivity</li>
        <li>At our sole discretion</li>
    </ul>
    
    <h2>12. Changes to Terms</h2>
    <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by:</p>
    <ul>
        <li>Posting the new Terms on this page</li>
        <li>Updating the "Last Updated" date</li>
    </ul>
    <p>Your continued use of the Service after such changes constitutes acceptance of the new Terms.</p>
    
    <h2>13. Governing Law</h2>
    <p>These Terms shall be governed and construed in accordance with applicable laws, without regard to conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
    
    <h2>14. Severability</h2>
    <p>If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions will remain in effect. These Terms constitute the entire agreement between us regarding the Service.</p>
    
    <h2>15. Contact Information</h2>
    <div class="contact">
        <p>If you have any questions about these Terms of Service, please contact us:</p>
        <p><strong>Email:</strong> [Your Contact Email]<br>
        <strong>Website:</strong> [Your Website URL]</p>
    </div>
    
    <h2>16. Acknowledgment</h2>
    <p>By using MERN Image Search, you acknowledge that you have read these Terms of Service and agree to be bound by them.</p>
</body>
</html>
  `;
  res.send(html);
});

module.exports = router;

