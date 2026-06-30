import React, { useState } from "react";
import { loginUser } from "../features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../features/auth/authAPI.js";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload on standard form submit
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 font-sans selection:bg-orange-500/20">
      {/* Container Box */}
      <div className="max-w-4xl w-full grid md:grid-cols-5 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
        {/* LEFT MARKETING SIDEBAR (Amazon Prime / Flipkart Inspired) */}
        <div className="hidden md:flex md:col-span-2 flex-col justify-between bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-8 text-white relative">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Minimalist Logo / E-Com Brand Hook */}
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 font-black text-xl tracking-tight bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              <span>🛒</span> AI<span className="text-white">Shop</span>
            </div>
          </div>

          {/* Value Prop Messages */}
          <div className="my-auto space-y-6 relative z-10 pt-8">
            <h2 className="text-2xl font-bold tracking-tight leading-snug">
              Unlock exclusive deals & lightning-fast checkout.
            </h2>

            <ul className="space-y-4 text-xs font-medium text-slate-300">
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 text-[10px]">
                  ✓
                </span>
                Track real-time delivery dispatches
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 text-[10px]">
                  ✓
                </span>
                Save curated dynamic wishlists
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 text-[10px]">
                  ✓
                </span>
                Access early deal drops & cashbacks
              </li>
            </ul>
          </div>

          {/* Footer Subtext */}
          <div className="text-[10px] font-medium text-slate-500 tracking-wider relative z-10 pt-4">
            Secure Marketplace Engine © 2026
          </div>
        </div>

        {/* RIGHT INTERACTION PANEL */}
        <div className="p-6 sm:p-10 md:p-12 md:col-span-3 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto space-y-6">
            {/* Form Header */}
            <div className="space-y-1.5">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Sign In
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Welcome back! Please enter your account credentials to continue
                shopping.
              </p>
            </div>

            {/* Main Interactive Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 tracking-wide block">
                  Email or Mobile Number
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium placeholder-slate-400 transition-all focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* Password Area */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 tracking-wide block">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-orange-600 hover:text-orange-500 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium placeholder-slate-400 transition-all focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* Form Action Controls */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.99] shadow-md shadow-orange-500/10 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? "Signing in..." : "Continue"}
                </button>
              </div>
            </form>

            {/* Separation Break */}
            <div className="flex items-center gap-3 py-1 text-slate-400 text-[11px] font-bold tracking-wider uppercase select-none">
              <div className="flex-1 h-px bg-slate-100" />
              <span>or connect with</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="text-center">
              <Link
                to="/otp-login"
                className="text-orange-600 font-semibold hover:underline"
              >
                Login with OTP
              </Link>
            </div>
            {/* OAuth Sign-In Layer */}
            <div className="flex justify-center pt-0.5 overflow-hidden rounded-xl">
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
                theme="outline"
                size="large"
                width="100%"
              />
            </div>
            
            {/* Registration Anchor Callout */}
            <p className="text-center text-xs font-medium text-slate-500 pt-2">
              New to our marketplace?
              <Link
                to="/register"
                className="text-orange-600 font-bold ml-1.5 hover:text-orange-500 hover:underline underline-offset-2 transition-all"
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
