# Admin Panel Setup Guide

यह guide आपको ExploreZA admin panel के लिए authentication system setup करने में help करेगी।

## Prerequisites

1. Node.js installed
2. MongoDB connection configured
3. Email service configured (for OTP functionality)

## Backend Setup

### 1. Environment Variables

`config.env` file में निम्न variables add करें:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Note:** Gmail के लिए App Password generate करना होगा:

1. Google Account Settings → Security → 2-Step Verification enable करें
2. App Passwords generate करें
3. उस password को `EMAIL_PASSWORD` में use करें

### 2. Dependencies Install करें

```bash
cd backend
npm install
```

### 3. Admin User Create करें

```bash
npm run create-admin
```

यह command एक default admin user create करेगी:

- **Email:** admin@exploreza.com
- **Password:** admin123
- **Role:** super_admin

### 4. Server Start करें

```bash
npm run dev
```

## Frontend Setup

### 1. Dependencies Install करें

```bash
cd "front end"
npm install
```

### 2. Server Start करें

```bash
npm run dev
```

## API Endpoints

### Authentication Routes

| Method | Endpoint                     | Description                   |
| ------ | ---------------------------- | ----------------------------- |
| POST   | `/api/admin/auth/login`      | Email/Password login          |
| POST   | `/api/admin/auth/send-otp`   | Send OTP to email             |
| POST   | `/api/admin/auth/verify-otp` | Verify OTP and login          |
| GET    | `/api/admin/auth/profile`    | Get admin profile (Protected) |
| POST   | `/api/admin/auth/logout`     | Logout (Protected)            |

### Request Examples

#### Password Login

```json
POST /api/admin/auth/login
{
  "email": "admin@exploreza.com",
  "password": "admin123"
}
```

#### Send OTP

```json
POST /api/admin/auth/send-otp
{
  "email": "admin@exploreza.com"
}
```

#### Verify OTP

```json
POST /api/admin/auth/verify-otp
{
  "email": "admin@exploreza.com",
  "otp": "123456"
}
```

## Admin Model Fields

```javascript
{
  name: String,           // Admin name
  email: String,          // Unique email
  password: String,       // Hashed password
  loginMethod: String,    // 'password', 'otp', or 'both'
  isActive: Boolean,      // Account status
  role: String,           // 'super_admin', 'admin', 'moderator'
  lastLogin: Date,        // Last login timestamp
  otpCode: String,        // Current OTP (temporary)
  otpExpires: Date,       // OTP expiration
  profileImage: String,   // Profile image URL
  phoneNumber: String,    // Phone number
  permissions: {          // Role-based permissions
    canManagePlaces: Boolean,
    canManageDestinations: Boolean,
    canManageDeals: Boolean,
    canViewEnquiries: Boolean,
    canManageAdmins: Boolean
  }
}
```

## Frontend Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (Protected)
- `/admin/destinations` - Travel destinations management (Protected)
- `/admin/enquiry` - Enquiry management (Protected)

## Security Features

1. **JWT Authentication** - Secure token-based authentication
2. **Password Hashing** - bcryptjs के साथ secure password storage
3. **OTP Expiration** - 10 minutes validity
4. **Role-based Access** - Different permission levels
5. **Rate Limiting** - API abuse prevention
6. **Input Validation** - Request validation middleware

## Login Methods

### 1. Password Login

- Email और password के साथ direct login
- Password bcrypt के साथ hash होता है

### 2. OTP Login

- Email पर OTP send होता है
- 6-digit OTP with 10 minutes validity
- Nodemailer के साथ professional email templates

### 3. Both Methods

- Admin अपनी choice के according कोई भी method use कर सकता है

## Troubleshooting

### Email Not Sending

1. Check EMAIL_USER और EMAIL_PASSWORD in config.env
2. Verify Gmail App Password is correct
3. Check internet connection
4. Verify email service configuration

### Authentication Issues

1. Check JWT_SECRET in config.env
2. Verify MongoDB connection
3. Check admin account is active
4. Verify token expiration

### Frontend Issues

1. Check backend server is running
2. Verify API endpoints are accessible
3. Check browser console for errors
4. Verify CORS configuration

## Production Considerations

1. **Change JWT_SECRET** - Use strong, unique secret key
2. **Use HTTPS** - Always use secure connections
3. **Environment Variables** - Don't commit sensitive data
4. **Database Security** - Use MongoDB Atlas with proper security
5. **Email Service** - Use professional email service (SendGrid, AWS SES)
6. **Rate Limiting** - Configure appropriate limits
7. **Logging** - Implement proper logging for monitoring

## Support

अगर कोई issues हों तो:

1. Check logs in backend console
2. Verify all environment variables
3. Test API endpoints with Postman
4. Check browser network tab for errors
