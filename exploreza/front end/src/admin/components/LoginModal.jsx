import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import api from "../../utils/api";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' or 'otp'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        email: "",
        password: "",
        otp: "",
      });
      setLoginMethod("password");
      setOtpSent(false);
      setCountdown(0);
      setMessage("");
      setMessageType("");
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear message when user starts typing
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const sendOTP = async () => {
    if (!formData.email) {
      showMessage("Please enter your email address", "error");
      return;
    }

    setLoading(true);
    try {
      const data = await api.auth.sendOTP(formData.email);

      if (data.success) {
        setOtpSent(true);
        setCountdown(300); // 5 minutes
        showMessage("OTP sent successfully to your email", "success");
      } else {
        showMessage(data.message || "Failed to send OTP", "error");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);

      // Handle different types of errors
      if (error.message) {
        showMessage(error.message, "error");
      } else if (error.status === 404) {
        showMessage("Admin account not found with this email", "error");
      } else if (error.status === 401) {
        showMessage("OTP login is not enabled for this account", "error");
      } else if (error.status === 500) {
        showMessage("Failed to send OTP. Please try again later.", "error");
      } else {
        showMessage("Network error. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    setLoading(true);
    try {
      const data = await api.auth.login({
        email: formData.email,
        password: formData.password,
      });

      if (data.success) {
        localStorage.setItem("adminToken", data.data.token);
        localStorage.setItem("adminData", JSON.stringify(data.data.admin));
        showMessage("Login successful! Redirecting...", "success");

        // Call success callback if provided
        if (onLoginSuccess) {
          onLoginSuccess(data.data.admin);
        }

        setTimeout(() => {
          onClose();
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        showMessage(data.message || "Login failed", "error");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle different types of errors
      if (error.message) {
        showMessage(error.message, "error");
      } else if (error.status === 401) {
        showMessage("Invalid email or password", "error");
      } else if (error.status === 500) {
        showMessage("Server error. Please try again later.", "error");
      } else {
        showMessage("Network error. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.otp) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    setLoading(true);
    try {
      const data = await api.auth.verifyOTP(formData.email, formData.otp);

      if (data.success) {
        localStorage.setItem("adminToken", data.data.token);
        localStorage.setItem("adminData", JSON.stringify(data.data.admin));
        showMessage("OTP verification successful! Redirecting...", "success");

        // Call success callback if provided
        if (onLoginSuccess) {
          onLoginSuccess(data.data.admin);
        }

        setTimeout(() => {
          onClose();
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        showMessage(data.message || "OTP verification failed", "error");
      }
    } catch (error) {
      console.error("OTP verification error:", error);

      // Handle different types of errors
      if (error.message) {
        showMessage(error.message, "error");
      } else if (error.status === 401) {
        showMessage("Invalid or expired OTP", "error");
      } else if (error.status === 404) {
        showMessage("Admin account not found", "error");
      } else if (error.status === 500) {
        showMessage("Server error. Please try again later.", "error");
      } else {
        showMessage("Network error. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const switchLoginMethod = (method) => {
    setLoginMethod(method);
    setFormData({
      email: "",
      password: "",
      otp: "",
    });
    setOtpSent(false);
    setCountdown(0);
    setMessage("");
    setMessageType("");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Admin Login"
      size="md"
      showCloseButton={false}
    >
      <div className="space-y-6">
        {/* Login Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginMethod === "password"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => switchLoginMethod("password")}
          >
            <i className="fas fa-lock mr-2"></i>
            Email & Password
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              loginMethod === "otp"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => switchLoginMethod("otp")}
          >
            <i className="fas fa-envelope mr-2"></i>
            OTP Login
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`p-3 rounded-md text-sm ${
              messageType === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Login Forms */}
        {loginMethod === "password" ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleOTPLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                  disabled={loading || otpSent}
                />
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOTP}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !formData.email}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send OTP
                    </>
                  )}
                </button>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                      placeholder="000000"
                      maxLength="6"
                      required
                      disabled={loading}
                    />
                    {countdown > 0 && (
                      <div className="text-center text-sm text-red-600 mt-2">
                        OTP expires in: {formatTime(countdown)}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check mr-2"></i>
                        Verify & Login
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setFormData((prev) => ({ ...prev, otp: "" }));
                      sendOTP();
                    }}
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || countdown > 0}
                  >
                    {countdown > 0 ? (
                      `Resend in ${formatTime(countdown)}`
                    ) : (
                      <>
                        <i className="fas fa-redo mr-2"></i>
                        Resend OTP
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Having trouble logging in?{" "}
            <a href="/contact" className="text-blue-600 hover:text-blue-500">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
