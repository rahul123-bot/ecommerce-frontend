import React, { useState} from "react";
import { Link } from "react-router-dom";
import { forgotPasswordApi } from "../features/auth/authAPI";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Please enter your email");
    }

    try {
      setLoading(true);

      const { data } = await forgotPasswordApi(email);

      setSuccess(
        data.message || "Password reset link sent successfully"
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>

          <h1 className="text-2xl font-extrabold text-slate-900">
            Forgot Password
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Enter your registered email address and we'll send you a password reset link.
          </p>
        </div>

        {success ? (
          <div className="space-y-5">
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm font-medium">
              {success}
            </div>

            <Link
              to="/login"
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="name@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-semibold text-orange-600 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;