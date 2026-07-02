import React, { useState } from "react";
import { loginUser } from "../features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../features/auth/authAPI.js";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/NextCart_logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      console.log({ email, password });
      await dispatch(
        loginUser({
          email,
          password,
        }),
      );
      navigate("/");
    } catch (error) {
      console.error("Login action failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-0 sm:p-6 lg:p-8 font-sans antialiased selection:bg-blue-500/20">
      {/* Main Container - Responsive full screen on mobile, elegant card on desktop */}
      <div className="w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border-0 sm:border border-slate-100 bg-white grid md:grid-cols-5 transition-all duration-300">
        
        {/* LEFT BLUE BRAND SIDEBAR (Premium Flipkart Style) */}
        <div className="hidden md:flex md:col-span-2 flex-col justify-between bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-800 p-10 text-white relative overflow-hidden">
          {/* Subtle Premium Background Accents */}
          <div className="absolute top-[-20%] right-[-20%] w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Clean Brand Typography */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 font-black text-2xl tracking-tight text-white group">
              <img src={logo} alt="NextCart logo" className="h-10 w-auto object-contain" />
              <span>Next<span className="text-yellow-400">Cart</span></span>
            </Link>
          </div>

          {/* Value Prop Messages */}
          <div className="my-auto space-y-8 relative z-10 pt-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-white">
                Looks like you're new here!
              </h2>
              <p className="text-blue-100 text-sm font-medium leading-relaxed">
                Sign up with your official account to get started and unlock special reward tiers.
              </p>
            </div>

            <ul className="space-y-4 text-sm font-medium text-blue-50">
              <li className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 transition-all hover:bg-white/10">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-blue-900 text-xs font-bold shadow-md">
                  ✓
                </span>
                <span>Track lightning-fast delivery dispatches</span>
              </li>
              <li className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 transition-all hover:bg-white/10">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-blue-900 text-xs font-bold shadow-md">
                  ✓
                </span>
                <span>Save curated dynamic wishlists</span>
              </li>
              <li className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 transition-all hover:bg-white/10">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-blue-900 text-xs font-bold shadow-md">
                  ✓
                </span>
                <span>Access early deal drops & cashbacks</span>
              </li>
            </ul>
          </div>

          {/* Footer Subtext */}
          <div className="text-xs font-medium text-blue-200/60 tracking-wider relative z-10">
            Secure Marketplace Engine © 2026
          </div>
        </div>

        {/* RIGHT INTERACTION PANEL */}
        <div className="p-8 sm:p-12 md:col-span-3 flex flex-col justify-center bg-white relative">
          
          {/* Mobile Top Header - Only shows up on mobile screens */}
          <div className="flex md:hidden items-center justify-between pb-6 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 font-black text-xl tracking-tight text-blue-600">
              <img src={logo} alt="NextCart logo" className="h-7 w-auto object-contain" /> NextCart
            </div>
            <Link to="/register" className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all">
              Sign Up
            </Link>
          </div>

          <div className="w-full max-w-md mx-auto space-y-7">
            {/* Form Header */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Sign In
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                Welcome back! Please enter your account credentials to continue shopping.
              </p>
            </div>

            {/* Main Interactive Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide block">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50/50 text-slate-900 border border-slate-200 rounded-xl pl-4 pr-4 py-3.5 text-sm font-medium placeholder-slate-400 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 group-hover:border-slate-300"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 tracking-wide block">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50/50 text-slate-900 border border-slate-200 rounded-xl pl-4 pr-4 py-3.5 text-sm font-medium placeholder-slate-400 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 group-hover:border-slate-300"
                  />
                </div>
              </div>

              {/* Form Actions (Submit Button) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.99] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            {/* Premium Divider Ring */}
            <div className="flex items-center gap-3 py-1 text-slate-400 text-[11px] font-bold tracking-wider uppercase select-none">
              <div className="flex-1 h-px bg-slate-100" />
              <span>or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Core Alternate Sign-in Row */}
            <div className="space-y-3">
              <Link
                to="/otp-login"
                className="w-full flex items-center justify-center bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm active:scale-[0.99]"
              >
                Request OTP
              </Link>

              {/* Native Google OAuth Integration Wrapper */}
              <div className="w-full flex justify-center rounded-xl overflow-hidden shadow-sm border border-slate-200/80 hover:border-slate-300 transition-all">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const { data } = await googleLoginApi({
                        credential: credentialResponse.credential,
                      });
                      localStorage.setItem("token", data.token);
                      localStorage.setItem("user", JSON.stringify(data.user));
                      window.location.href = "/";
                    } catch (err) {
                      console.error("Google authentication route failure: ", err);
                    }
                  }}
                  onError={() => {
                    console.log("Google Login Failed");
                  }}
                  theme="filled_blue"
                  size="large"
                  width="100%"
                />
              </div>
            </div>
            
            {/* Desktop Registration Anchor Callout */}
            <p className="hidden md:block text-center text-xs font-semibold text-slate-500 pt-2">
              New to our marketplace?
              <Link
                to="/register"
                className="text-blue-600 font-bold ml-1.5 hover:text-blue-700 hover:underline underline-offset-2 transition-all"
              >
                Create your account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
