import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
} from "react-icons/fa";
import logo from "../assets/NextCart_logo.png";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); // Native form protection
    if (!name || !email || !password) return;
    
    setIsSubmitting(true);
    try {
      const result = await dispatch(
        registerUser({
          name,
          email,
          password,
        })
      );

      if (result.payload) {
        navigate("/");
      }
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center selection:bg-amber-500/10">
      <div className="w-full max-w-5xl md:m-4 bg-white md:border md:border-slate-200 md:rounded-2xl md:shadow-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-screen md:min-h-[640px]">
        
        {/* LEFT COLUMN: BRAND PROMOTIONAL VALUATION BLOCK (Hidden on mobile) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#2874f0] via-[#1e5cc2] to-[#174899] p-10 flex-col justify-between text-white relative overflow-hidden">
          {/* Decorative ambient lighting overlays */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 z-10">
            <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tight text-white inline-block">
              <img src={logo} alt="NextCart logo" className="h-10 w-auto object-contain" />
              <span>Next<span className="text-amber-400">Cart</span></span>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight pt-6">Looks like you're new here!</h2>
            <p className="text-sm text-sky-100/80 leading-relaxed">
              Sign up with your account parameters to unlock tailored marketplace access modules, hyper-personalized tracking, and priority checkout options.
            </p>
          </div>

          {/* Institutional Trust Badges */}
          <div className="space-y-4 border-t border-white/10 pt-6 z-10">
            <div className="flex items-center gap-3 text-xs font-medium text-sky-100">
              <FaShieldAlt className="text-amber-400 text-sm flex-shrink-0" />
              <span>100% Secure Transaction Vaults</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-sky-100">
              <FaTruck className="text-amber-400 text-sm flex-shrink-0" />
              <span>Free, Tiered Express Logistics</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-sky-100">
              <FaUndoAlt className="text-amber-400 text-sm flex-shrink-0" />
              <span>Simplified 7-Day Asset Returns</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REVENUE-READY ACCOUNT REGISTRATION SHEET */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 bg-white">
          
          {/* Mobile Branding Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="flex items-center justify-center gap-3 text-3xl font-black tracking-tight text-slate-900">
              <img src={logo} alt="NextCart logo" className="h-10 w-auto object-contain" />
              <span>Next<span className="text-[#ff9f00]">Cart</span></span>
            </Link>
          </div>

          <div className="w-full max-w-[380px] mx-auto space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Account</h1>
              <p className="text-xs text-slate-400 font-medium">Your universal credentials for cross-platform access.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* LEGAL NAME VECTOR */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Your name</label>
                <div className="relative focus-within:text-blue-600 text-slate-400 transition-colors">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none" />
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="First and last name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white text-slate-900 border border-slate-300 text-sm rounded-md pl-10 pr-3 py-2.5 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* ELECTRONIC COMMERCE IDENTITY ADDRESS (EMAIL) */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Email Address</label>
                <div className="relative focus-within:text-blue-600 text-slate-400 transition-colors">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-slate-900 border border-slate-300 text-sm rounded-md pl-10 pr-3 py-2.5 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* SECURITY KEY BLOCK (PASSWORD) */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Password</label>
                <div className="relative focus-within:text-blue-600 text-slate-400 transition-colors">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters required"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white text-slate-900 border border-slate-300 text-sm rounded-md pl-10 pr-10 py-2.5 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors p-1 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium pt-0.5">
                  <span className="inline-block px-1 bg-slate-100 rounded text-[9px] border border-slate-200">i</span>
                  <span>Passwords must contain structural complexities.</span>
                </div>
              </div>

              {/* TRANSACTION STRATEGY SUBMISSION CALL-TO-ACTION */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-[#fb641b] hover:bg-[#e15613] disabled:opacity-50 disabled:pointer-events-none text-white rounded-md py-2.5 text-xs font-black uppercase tracking-wider shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? "Generating Profile Node..." : "Create Account"}
              </button>

            </form>

            {/* INTERACTION LINK FOOTER REDIRECTS */}
            <div className="space-y-4 pt-4 border-t border-slate-100 text-xs">
              <p className="text-slate-600 font-medium">
                Already registered? 
                <Link
                  to="/login"
                  className="ml-1 text-blue-600 hover:text-[#fb641b] hover:underline font-bold transition-colors inline-flex items-center gap-0.5"
                >
                  Sign In System ▸
                </Link>
              </p>
              
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                By maintaining registration sequences, you certify authorization of NextCart's <span className="text-blue-600 hover:underline cursor-pointer font-semibold">Conditions of Sale</span> and structural processing clauses noted inside our <span className="text-blue-600 hover:underline cursor-pointer font-semibold">Privacy Registry</span>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
