const nodemailer = require("nodemailer");

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // You can change this to your preferred email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send OTP email
const sendOTPEmail = async (email, otp, adminName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "ExploreZA Admin Login - OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">ExploreZA</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Admin Panel Access</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${
              adminName || "Admin"
            }!</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              You requested to login to the ExploreZA Admin Panel. Please use the following One-Time Password (OTP) to complete your login:
            </p>
            
            <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <h3 style="color: #667eea; font-size: 36px; letter-spacing: 5px; margin: 0; font-weight: bold;">
                ${otp}
              </h3>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Important:</strong> This OTP is valid for 10 minutes only. Do not share this code with anyone.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 0;">
              If you didn't request this login, please ignore this email or contact support.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 12px;">
              © 2024 ExploreZA. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, error: error.message };
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, adminName, password) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to ExploreZA Admin Panel",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ExploreZA</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Admin Panel Access</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${adminName}!</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Your admin account has been created successfully. You can now access the ExploreZA Admin Panel.
            </p>
            
            <div style="background: white; border: 2px solid #28a745; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #28a745; margin: 0 0 10px 0;">Login Credentials</h3>
              <p style="color: #333; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="color: #333; margin: 5px 0;"><strong>Password:</strong> ${password}</p>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Security Note:</strong> Please change your password after first login for security purposes.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 0;">
              If you have any questions, please contact the system administrator.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 12px;">
              © 2024 ExploreZA. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail,
};
