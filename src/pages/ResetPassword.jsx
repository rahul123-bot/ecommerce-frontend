import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../features/auth/authAPI";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return alert(
        "Password must be at least 6 characters"
      );
    }

    if (password !== confirmPassword) {
      return alert(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      const { data } =
        await resetPasswordApi(
          token,
          password
        );

      alert(
        data.message ||
          "Password reset successful"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Reset password failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>

          <h1 className="text-2xl font-extrabold text-slate-900">
            Reset Password
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Enter your new password below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter new password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
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
      </div>
    </div>
  );
};

export default ResetPassword;