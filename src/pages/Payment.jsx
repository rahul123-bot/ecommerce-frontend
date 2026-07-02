import React, { useState, useEffect } from "react";
import {
  FaLock,
  FaShieldAlt,
  FaCreditCard,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";

import loadRazorpay from "../utils/loadRazorpay";
import { createOrderApi } from "../features/payment/paymentApi.js";
import { createOrder } from "../features/order/orderSlice.js";
import { getCart } from "../features/cart/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading: cartLoading } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getCart());

    const storedAmount = localStorage.getItem("paymentAmount");
    const parsedAmount = Number(storedAmount);

    if (storedAmount && parsedAmount > 0) {
      setAmount(parsedAmount);
      return;
    }

    if (cart?.items?.length > 0) {
      const cartAmount = cart.items.reduce(
        (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
        0,
      );

      if (cartAmount > 0) {
        localStorage.setItem("paymentAmount", cartAmount);
        setAmount(cartAmount);
        return;
      }
    }

    alert("Invalid payment amount. Please return to checkout and try again.");
    navigate("/checkout/:id");
  }, [cart, dispatch, navigate]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (!amount || amount <= 0) {
        alert("Invalid payment amount. Please return to checkout and try again.");
        setLoading(false);
        return;
      }

      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Payment gateway failed to initialize.");
        setLoading(false);
        return;
      }

      // shipping info
      const shippingInfo =
        JSON.parse(localStorage.getItem("shippingInfo")) || {};

      // Create Razorpay order
      const { data } = await createOrderApi(amount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "NextCart",
        description: "Secure Order Payment",
        image: "https://cdn-icons-png.flaticon.com/512/263/263142.png",

         handler: async function (response) {
          try {
            await dispatch(
              createOrder({
                address: shippingInfo.address,
                city: shippingInfo.city,
                stateRegion:
                  shippingInfo.stateRegion,
                postalCode:
                  shippingInfo.postalCode,
                phone: shippingInfo.phone,

                paymentMethod: "Razorpay",
                paymentStatus: "Paid",
              })
            ).unwrap();

            localStorage.removeItem(
              "paymentAmount"
            );

            localStorage.removeItem(
              "shippingInfo"
            );

            alert("Payment Successful 🎉");

            navigate("/my-orders");
          } catch (err) {
            console.error(err);
            alert("Order creation failed");
          }
        },

        prefill: {
          name: "Customer",
        },

        theme: {
          color: "#f97316",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function () {
        alert("Payment Failed ❌");
      });

      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased px-4 sm:px-6 lg:px-8 py-8 sm:py-12 selection:bg-orange-500/20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* PROGRESS BANNER HEADLINE */}
        <div className="text-center space-y-1.5 max-w-md mx-auto">
          <div className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-sm select-none">
            <FaLock className="text-[9px]" /> 100% Secure Checkout
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Select Payment Method
          </h1>
          <p className="text-xs text-slate-400 font-medium leading-normal">
            Your transaction is fully encrypted and processed via verified
            PCI-compliant bank routing channels.
          </p>
        </div>

        {/* RESPONSIVE CONTENT SPLIT LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN: METHOD SELECTOR CONTAINER */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-3.5 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shadow-inner">
                  <FaCreditCard className="text-sm" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-800">
                    Available Gateways
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Choose your payment mode wrapper below
                  </p>
                </div>
              </div>

              {/* INTEGRATED ACTIVE RAZORPAY OPTION BLOC */}
              <div className="bg-orange-50/20 border-2 border-orange-500 rounded-xl p-4 flex justify-between items-center relative shadow-sm">
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-xs text-slate-800 tracking-wide flex items-center gap-1.5">
                    Razorpay Smart Checkout
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    UPI, Credit/Debit Cards, NetBanking, and Instant Wallets
                  </p>
                </div>
                <FaCheckCircle className="text-orange-500 text-lg shrink-0" />
              </div>

              {/* BRAND VALUE ACCREDITATIONS */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-sm shrink-0">
                    <FaShieldAlt className="text-xs" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-wide">
                    256-Bit SSL Safeguards
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-white border border-slate-200 text-orange-500 flex items-center justify-center shadow-sm shrink-0">
                    <FaLock className="text-xs" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 tracking-wide">
                    PCI-DSS Global Certified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: REASSURING VALUATION PANEL */}
          <div className="lg:sticky lg:top-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-800 tracking-tight pb-3 border-b border-slate-100">
                Price Details
              </h2>

              <div className="space-y-3.5 text-xs font-medium text-slate-500">
                <div className="flex justify-between items-center">
                  <span>Price Subtotal</span>
                  <span className="text-slate-800 font-semibold">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Estimated Tax</span>
                  <span className="text-slate-800 font-semibold">₹0</span>
                </div>

                <hr className="border-slate-100 my-1" />

                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-slate-800 font-bold text-sm">
                    Amount Payable
                  </span>
                  <span className="text-xl font-black text-slate-900 tracking-tight">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* STRATEGIC TRIGGER ACTION ELEMENT */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-slate-100 disabled:to-slate-200 disabled:text-slate-400 text-white py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.99] shadow-md shadow-orange-500/10 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-1.5 group"
              >
                {loading ? (
                  <span className="font-bold animate-pulse">
                    Initializing Gateway...
                  </span>
                ) : (
                  <>
                    <span>Pay Securely Now</span>
                    <FaChevronRight className="text-[9px] mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              {/* QUICK REASSURANCE MATRIX GRID */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 pt-3 border-t border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider uppercase select-none">
                <div>🛡️ Safe Checkout</div>
                <div>📦 Tracked Delivery</div>
                <div>🔄 Simple Returns</div>
                <div>⭐ Top Rated Store</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
