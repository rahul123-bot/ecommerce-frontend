import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../features/auth/authSlice";
import logo from "../assets/NextCart_logo.png";

const OtpLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    if (!email) return alert("Please enter your email.");
    try {
      await dispatch(sendOtp(email)).unwrap();
      setOtpSent(true);
      setTimer(30);
    } catch (error) {
      alert(error.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP.");
    try {
      await dispatch(verifyOtp({ email, otp })).unwrap();
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      alert(error.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg flex overflow-hidden min-h-[550px]">
        
        {/* Left Side Banner (Matches image_7256f6.png Dark Theme) */}
        <div className="hidden md:flex flex-col justify-between w-2/5 bg-[#0f111e] text-white p-10 relative">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 text-xl font-bold tracking-wide mb-14">
              <img src={logo} alt="NextCart logo" className="h-8 w-auto object-contain" />
              <span>Next<span className="text-gray-300 font-light">Cart</span></span>
            </div>

            {/* Banner Value Proposition */}
            <h2 className="text-2xl font-bold leading-snug mb-8">
              Unlock exclusive deals & lightning-fast checkout.
            </h2>

            {/* Bullet Points */}
            <ul className="space-y-5 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#ff8f00] text-xs bg-[#ff8f00]/10 p-1 rounded-full">✓</span>
                <span>Track real-time delivery dispatches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff8f00] text-xs bg-[#ff8f00]/10 p-1 rounded-full">✓</span>
                <span>Save curated dynamic wishlists</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff8f00] text-xs bg-[#ff8f00]/10 p-1 rounded-full">✓</span>
                <span>Access early deal drops & cashbacks</span>
              </li>
            </ul>
          </div>

          {/* Footer Engine Note */}
          <div className="text-[10px] text-gray-500 font-mono">
            Secure Marketplace Engine © 2026
          </div>
        </div>

        {/* Right Side Form (Matches image_7256f6.png Layout) */}
        <div className="w-full md:w-3/5 p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {otpSent ? "Verify Security Code" : "Sign In"}
          </h1>
          <p className="text-xs text-gray-400 mb-8">
            {otpSent 
              ? "Please enter the 6-digit code sent to your email address." 
              : "Welcome back! Please enter your email credentials to continue shopping."}
          </p>

          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="rithik@gmail.com"
                  value={email}
                  disabled={otpSent}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-[#ecf2fa] text-sm text-gray-800 placeholder-gray-400 p-3.5 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all ${
                    otpSent ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                />
                {otpSent && (
                  <button 
                    onClick={() => setOtpSent(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#ff8f00] hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic UI Transition for OTP */}
            {otpSent && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-gray-600">
                    One-Time Password (OTP)
                  </label>
                  {timer > 0 ? (
                    <span className="text-xs text-gray-400">Resend in {timer}s</span>
                  ) : (
                    <button 
                      onClick={handleSendOtp} 
                      className="text-xs font-semibold text-[#ff8f00] hover:underline"
                    >
                      Resend OTP?
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-[#ecf2fa] text-center text-lg font-bold tracking-widest text-gray-800 placeholder-gray-300 p-3.5 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
            )}

            {/* Action Buttons */}
            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-[#ff8f00] hover:bg-[#e68000] text-white text-sm font-bold p-3.5 rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? "Sending..." : "Request OTP"}
              </button>
            ) : (
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-[#ff8f00] hover:bg-[#e68000] text-white text-sm font-bold p-3.5 rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>
            )}

            {/* Divider lines */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                Secured Login
              </span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            {/* Marketplace Footer Anchor */}
            <div className="text-center text-xs text-gray-500">
              New to our marketplace?{" "}
              <span className="text-[#ff8f00] font-semibold hover:underline cursor-pointer">
                Create your account
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OtpLogin;
