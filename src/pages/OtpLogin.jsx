import React, {
  useState,
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  sendOtp,
  verifyOtp,
} from "../features/auth/authSlice";

const OtpLogin = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const { loading } =
    useSelector(
      (state) => state.auth
    );

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSendOtp =
    async () => {
      try {
        await dispatch(
          sendOtp(email)
        ).unwrap();

        alert(
          "OTP sent successfully"
        );

        setOtpSent(true);
      } catch (error) {
        alert(
          error.message ||
            "Failed to send OTP"
        );
      }
    };

  const handleVerifyOtp =
    async () => {
      try {
        await dispatch(
          verifyOtp({
            email,
            otp,
          })
        ).unwrap();

        alert(
          "Login Successful"
        );

        navigate("/");
      } catch (error) {
        alert(
          error.message ||
            "Invalid OTP"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">
          OTP Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          disabled={otpSent}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        {!otpSent ? (
          <button
            onClick={
              handleSendOtp
            }
            disabled={loading}
            className="w-full bg-orange-500 text-white p-3 rounded"
          >
            {loading
              ? "Sending..."
              : "Send OTP"}
          </button>
        ) : (
          <>
            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded mb-4"
            />

            <button
              onClick={
                handleVerifyOtp
              }
              disabled={loading}
              className="w-full bg-green-600 text-white p-3 rounded"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default OtpLogin;