# Admin Management System

## Overview

Complete admin management system with CRUD operations, role-based access control, and secure authentication.

## Features

### 🔐 Authentication & Authorization

- **JWT-based authentication**
- **Role-based access control** (super_admin, admin, moderator)
- **Multiple login methods** (password, OTP, both)
- **Secure password hashing** with bcryptjs

### 👥 Admin Management

- **Create new admins** with minimal required fields
- **View all admins** with role and status information
- **Edit admin details** (name, email, role, permissions)
- **Delete admins** (with self-deletion protection)
- **Role-based permissions** for different admin types

### 📧 Email Integration

- **Welcome emails** for new admins
- **OTP emails** for passwordless login
- **Nodemailer integration** with Gmail SMTP

## API Endpoints

### Admin Management Routes

```
GET    /api/admin/management           - Get all admins (super_admin only)
GET    /api/admin/management/:id       - Get admin by ID (super_admin only)
POST   /api/admin/management           - Create new admin (super_admin only)
PUT    /api/admin/management/:id       - Update admin (super_admin only)
DELETE /api/admin/management/:id       - Delete admin (super_admin only)
```

### Authentication Routes

```
POST   /api/admin/auth/login           - Login with email/password
POST   /api/admin/auth/send-otp        - Send OTP to email
POST   /api/admin/auth/verify-otp      - Verify OTP and login
GET    /api/admin/auth/profile         - Get admin profile
POST   /api/admin/auth/logout          - Logout admin
```

## Admin Roles & Permissions

### Super Admin

- Full access to all features
- Can manage other admins
- Can access admin management panel
- All CRUD operations

### Admin

- Manage travel destinations
- Manage places
- Manage deals
- View enquiries
- Cannot manage other admins

### Moderator

- Limited access
- View-only permissions for most features
- Can manage basic content

## Database Schema

### Admin Model

```javascript
{
  name: String (required, 2-100 chars)
  email: String (required, unique, valid email)
  password: String (required for password/both login methods, min 6 chars)
  role: String (enum: super_admin, admin, moderator)
  loginMethod: String (enum: password, otp, both)
  isActive: Boolean (default: true)
  permissions: {
    canManagePlaces: Boolean
    canManageDestinations: Boolean
    canManageDeals: Boolean
    canViewEnquiries: Boolean
    canManageAdmins: Boolean
  }
  lastLogin: Date
  otpCode: String
  otpExpires: Date
  profileImage: String
  phoneNumber: String
  createdAt: Date
  updatedAt: Date
}
```

## Setup Instructions

### 1. Environment Variables

Add to `config.env`:

```env
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail_address
EMAIL_PASSWORD=your_gmail_app_password
```

### 2. Install Dependencies

```bash
npm install bcryptjs jsonwebtoken nodemailer express-validator
```

### 3. Create Default Admin

```bash
npm run create-admin
```

### 4. Create New Admin

```bash
npm run create-new-admin
```

### 5. Update Admin

```bash
npm run update-admin
```

### 6. Delete All Admins

```bash
npm run delete-all-admins
```

## Frontend Integration

### Admin Management Page

- **Route:** `/admin/management`
- **Access:** Super admin only
- **Features:**
  - View all admins with stats
  - Create new admins with minimal fields
  - Edit admin details
  - Delete admins
  - Role-based UI elements

### Navigation

- Admin Management link only visible to super admins
- Automatic role-based menu filtering
- Secure route protection

## Security Features

### Password Security

- **Bcrypt hashing** with salt rounds
- **Minimum 6 character** requirement
- **Password comparison** method for authentication

### JWT Security

- **Token-based authentication**
- **Automatic token validation**
- **Secure logout** with token cleanup

### Role-Based Access

- **Middleware protection** for all admin routes
- **Permission checking** before operations
- **Self-deletion protection**

### Email Security

- **OTP expiration** (5 minutes)
- **OTP cleanup** after use
- **Rate limiting** on OTP requests

## Usage Examples

### Create New Admin

```javascript
const adminData = {
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword",
  role: "admin",
  loginMethod: "password",
  isActive: true,
};

const response = await api.adminManagement.create(adminData, token);
```

### Login

```javascript
// Password login
const response = await api.auth.login({
  email: "admin@example.com",
  password: "password123",
});

// OTP login
await api.auth.sendOTP("admin@example.com");
const response = await api.auth.verifyOTP("admin@example.com", "123456");
```

## Error Handling

### Validation Errors

- **Field validation** with express-validator
- **Custom error messages** for better UX
- **Client-side validation** for immediate feedback

### Authentication Errors

- **401 Unauthorized** for invalid credentials
- **403 Forbidden** for insufficient permissions
- **404 Not Found** for non-existent admins

### Network Errors

- **Connection timeout** handling
- **Retry mechanisms** for failed requests
- **User-friendly error messages**

## Testing

### Manual Testing

1. **Login with different roles**
2. **Create/edit/delete admins**
3. **Test permission restrictions**
4. **Verify email functionality**

### API Testing

```bash
# Test admin creation
curl -X POST http://localhost:5000/api/admin/management \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Admin","email":"test@example.com","password":"password123","role":"admin"}'
```

## Troubleshooting

### Common Issues

1. **Email not sending:** Check Gmail app password
2. **JWT errors:** Verify JWT_SECRET in environment
3. **Permission denied:** Check admin role and permissions
4. **Database connection:** Verify MongoDB connection string

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment.

## Future Enhancements

- **Two-factor authentication** with SMS
- **Admin activity logging**
- **Bulk admin operations**
- **Advanced permission system**
- **Admin profile management**
- **Password reset functionality**
