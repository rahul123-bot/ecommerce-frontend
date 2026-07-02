import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaBoxOpen,
  FaShieldAlt,
  FaPlusCircle,
} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";
import { logout } from "../features/auth/authSlice";
import logo from "../assets/NextCart_logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#2874f0] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          {/* BRAND LOGO DESIGN (FLIPKART ARCHETYPE) */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              className="hover:opacity-95 transition-opacity flex items-center gap-2 select-none group"
            >
              <img
                src={logo}
                alt="NextCart logo"
                className="h-8 sm:h-10 w-auto object-contain drop-shadow-sm"
              />
              <div className="hidden sm:flex flex-col justify-center leading-none">
                <span className="text-base sm:text-xl font-black italic tracking-tight text-white">
                  NextCart
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium italic text-amber-300 flex items-center gap-0.5 mt-0.5 tracking-wide">
                  Explore{" "}
                  <span className="font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    Plus
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP INTERACTION HUB */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-end">
            {/* LINK: NAVIGATION ANCHORS */}
            <Link
              to="/"
              className="text-sm font-semibold tracking-wide hover:text-slate-100 transition-colors py-2"
            >
              Home
            </Link>

            {/* NESTED CUSTOMER PROFILE ACTIONS DROPDOWN MODULE */}
            <div
              className="relative py-2"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 bg-white text-[#2874f0] px-5 py-1 rounded-sm text-sm font-bold tracking-wide shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
                type="button"
              >
                <FaUserCircle size={14} className="text-[#2874f0]" />
                <span className="max-w-[80px] truncate">
                  {user?.name || "Login"}
                </span>
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* FLOATING ACTION PANEL LAYER */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full w-52 bg-white rounded-sm shadow-xl border border-slate-100 py-1 text-slate-700 text-xs font-semibold mt-0">
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider truncate">
                    Welcome, {user?.name || "User"}
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <FaUserCircle className="text-slate-400 text-sm" />
                    My Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <FaBoxOpen className="text-slate-400 text-sm" /> My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <FaHeart className="text-slate-400 text-sm" /> Wishlist
                  </Link>
                  {user?.role === "admin" && (
                    <>
                      <div className="h-px bg-slate-100 my-1" />
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-purple-50 text-purple-700 transition-colors font-bold"
                      >
                        <FaShieldAlt className="text-purple-400 text-sm" />{" "}
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/admin/add-product"
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-emerald-50 text-emerald-700 transition-colors font-bold"
                      >
                        <FaPlusCircle className="text-emerald-400 text-sm" />{" "}
                        Add New Product
                      </Link>
                    </>
                  )}
                  <div className="h-px bg-slate-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-bold transition-colors text-left border-none cursor-pointer"
                    type="button"
                  >
                    <FiLogOut className="text-sm" /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* LINK: WISHLIST ROW */}
            <Link
              to="/wishlist"
              className="flex items-center gap-1.5 text-sm font-semibold tracking-wide hover:text-slate-100 transition-colors py-2 md:hidden lg:flex"
            >
              <FaHeart className="text-xs" />
              Wishlist
            </Link>

            {/* LINK: CART VALUE BLOCK */}
            <Link
              to="/cart"
              className="flex items-center gap-2 text-sm font-bold tracking-wide hover:text-slate-100 transition-colors py-2"
            >
              <FaShoppingCart className="text-sm" />
              <span>Cart</span>
            </Link>

            {/* LINK: ORDERS FLAT SYSTEM */}
            <Link
              to="/my-orders"
              className="text-sm font-semibold tracking-wide hover:text-slate-100 transition-colors py-2"
            >
              Orders
            </Link>
          </div>

          {/* MOBILE INTERACTIVE ACTION PANEL TRIGGER SWITCH */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:bg-white/10 p-2 rounded-sm transition-colors active:scale-95 text-lg cursor-pointer"
            aria-label="Toggle Menu"
            type="button"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* OVERLAY NAVIGATION DRAWER SYSTEM (MOBILE VIEWS) */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 text-slate-800 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col p-4 max-h-[calc(100vh-4rem)] overflow-y-auto text-xs sm:text-sm font-bold text-slate-700 divide-y divide-slate-100">
            {/* USER METRIC IDENTITY HUB BANNER */}
            <div className="flex items-center gap-2.5 pb-3 px-2 text-slate-900 font-black">
              <FaUserCircle size={20} className="text-[#2874f0] shrink-0" />
              <span className="truncate">Hello, {user?.name || "User"}</span>
            </div>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Home</span>
              <span className="text-slate-300 font-normal">→</span>
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <FaUserCircle className="text-slate-400" />
                Profile
              </span>
              <span className="text-slate-300 font-normal">→</span>
            </Link>
            <Link
              to="/my-orders"
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <FaBoxOpen className="text-slate-400" /> Orders
              </span>
              <span className="text-slate-300 font-normal">→</span>
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <FaHeart className="text-slate-400" /> Wishlist
              </span>
              <span className="text-slate-300 font-normal">→</span>
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 hover:bg-slate-50 transition-colors flex items-center justify-between text-[#2874f0]"
            >
              <span className="flex items-center gap-2">
                <FaShoppingCart className="text-[#2874f0]" /> View Cart
              </span>
              <span className="text-slate-300 font-normal">→</span>
            </Link>

            {/* ADMINISTRATIVE MANAGEMENT LAYERS CONTROLS */}
            {user?.role === "admin" && (
              <div className="py-3 px-2 space-y-2 bg-purple-50/40 rounded-sm mt-2 border border-purple-100">
                <div className="text-[10px] uppercase font-extrabold text-purple-500 tracking-wider px-1">
                  Admin System Tools
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/admin"
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-sm text-center text-[11px] font-bold shadow-sm transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/admin/add-product"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-sm text-center text-[11px] font-bold shadow-sm transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    + Add Product
                  </Link>
                </div>
              </div>
            )}

            {/* DISPATCH TERMINATION ENGINE ACTUATOR */}
            <div className="pt-4 pb-2 mt-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-[#fb641b] hover:bg-[#e15613] text-white py-2.5 rounded-sm flex items-center justify-center gap-2 text-xs font-black tracking-wide shadow-sm transition-colors cursor-pointer"
                type="button"
              >
                <FiLogOut className="text-sm shrink-0" />
                Log Out Account
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
