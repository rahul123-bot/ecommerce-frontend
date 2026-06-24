import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpApi, verifyOtpApi } from "../features/auth/authAPI.js";
import {
  FaEnvelope,
  FaShieldAlt,
  FaArrowRight,
  FaLock,
  FaMobileAlt,
} from "react-icons/fa";

const OtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const { data } = await sendOtpApi(email);
      alert(data.message || "OTP sent successfully");
      setOtpSent(true);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await verifyOtpApi(email, otp);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Invalid OTP code. Please verify and re-enter."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center font-sans antialiased px-4 py-12 sm:px-6 lg:px-8 selection:bg-orange-500/20">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
        
        {/* LEFT MARKETING SIDE (Hidden on mobile) */}
        <div className="hidden lg:block space-y-6 pr-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              AIShop<span className="text-orange-500">.</span>
            </h1>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              Simple, Passwordless Sign In
            </h2>
            <p className="text-xs leading-relaxed text-slate-500 font-medium max-w-sm">
              Log in instantly using a secure single-use code sent directly to your email verification terminal. No password memory required.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                <FaLock className="text-sm" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-800">Secure Code Validation</h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Codes expire shortly after generation for target account safety.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                <FaMobileAlt className="text-sm" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-800">Unified Account Portability</h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Access order status history instantly across all personal browsers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT INTERACTIVE INTERFACE CARD */}
        <div className="w-full max-w-sm mx-auto space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">
          
          {/* Header context layout */}
          <div className="text-center lg:text-left space-y-1.5">
            <div className="w-12 h-12 bg-orange-50 border border-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto lg:mx-0 text-lg shadow-sm">
              <FaShieldAlt className={otpSent ? "text-emerald-600" : "text-orange-500"} />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 pt-1">
              {otpSent ? "Enter Verification Code" : "Sign In via OTP"}
            </h2>
            <p className="text-xs font-medium text-slate-400 leading-normal">
              {otpSent 
                ? "Please provide the 6-digit dynamic key sent to your inbox." 
                : "Enter your registered business account mail endpoint below."}
            </p>
          </div>

          {/* DYNAMIC ACTION COMPONENT FIELDS */}
          <div className="space-y-4">
            
            {/* CORE EMAIL COMPONENT */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-700 tracking-wide uppercase block">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                <input
                  type="email"
                  placeholder="e.g., mail@example.com"
                  value={email}
                  disabled={otpSent}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium placeholder-slate-400 transition-all focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  required
                />
              </div>
            </div>

            {/* CONDITIONAL SWITCH: SEND TOKEN VS VERIFY OTP */}
            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.99] shadow-md shadow-orange-500/10 flex items-center justify-center gap-1.5 mt-2 group"
              >
                <span>Continue</span>
                <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <div className="space-y-3">
                
                {/* DYNAMIC OTP VALUE CONTROLLER */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-700 tracking-wide uppercase block">
                    One-Time Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold tracking-widest placeholder-slate-400 placeholder:tracking-normal transition-all focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.99] shadow-md shadow-emerald-600/10"
                >
                  Verify and Log In
                </button>
                
                <button 
                  onClick={() => setOtpSent(false)}
                  className="w-full text-center text-xs font-semibold text-slate-400 hover:text-orange-500 transition-colors pt-1"
                >
                  Change Email Address
                </button>
              </div>
            )}

          </div>

          {/* SECURE BUYER CONTEXT EMBED */}
          <div className="text-center pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase inline-flex items-center gap-1 select-none">
              🔒 100% Secure Account Verification Protection
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OtpLogin;