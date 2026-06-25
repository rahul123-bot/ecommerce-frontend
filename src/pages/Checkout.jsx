import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaTruck,
  FaShieldAlt,
  FaLock,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import { createOrder } from "../features/order/orderSlice";
import { getAddresses } from "../features/users/userSlice";
import { getCart } from "../features/cart/cartSlice";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const amount = Number(localStorage.getItem("paymentAmount") || 0);
  const defaultAddress = addresses?.find((a) => a.isDefault);

  useEffect(() => {
    if (defaultAddress) {
      setAddress(`${defaultAddress.houseNo}, ${defaultAddress.area}`);

      setCity(defaultAddress.city);

      setStateRegion(defaultAddress.state);

      setPostalCode(defaultAddress.pincode);

      setPhone(defaultAddress.phone);
    }
  }, [defaultAddress]);
  useEffect(() => {
    dispatch(getAddresses());
    dispatch(getCart())
  }, [dispatch]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!cart?.items || cart.items.length === 0) {
    alert("Your cart is empty!");
    navigate("/cart");
    return;
  }

  const orderData = {
    address,
    city,
    stateRegion,
    postalCode,
    phone,
    paymentMethod,
  };

  try {
    // COD
    if (paymentMethod === "COD") {
      await dispatch(createOrder(orderData)).unwrap();

      alert("Order placed successfully 🎉");
      navigate("/my-orders");
      return;
    }

    // Razorpay
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify(orderData)
    );

    // IMPORTANT
    localStorage.setItem(
      "paymentAmount",
      cart.totalPrice
    );

    navigate("/payment");
  } catch (error) {
    console.error(error);
    alert("Order failed");
  }
};
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Secure Checkout
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Please provide your details to complete the order.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT: FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ADDRESS FIELDS */}
                {defaultAddress && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                    <h3 className="font-bold text-green-700 mb-3">
                      Deliver To
                    </h3>

                    <div className="space-y-1 text-sm">
                      <p className="font-bold">{defaultAddress.fullName}</p>

                      <p>{defaultAddress.phone}</p>

                      <p>
                        {defaultAddress.houseNo},{defaultAddress.area},
                        {defaultAddress.city},{defaultAddress.state} -
                        {defaultAddress.pincode}
                      </p>

                      {defaultAddress.landmark && (
                        <p className="text-slate-500">
                          Landmark: {defaultAddress.landmark}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <FaTruck /> Shipping Address
                  </h2>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 transition-all text-sm"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 transition-all text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={stateRegion}
                      onChange={(e) => setStateRegion(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 transition-all text-sm"
                      required
                    />
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="Pincode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 transition-all text-sm"
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 transition-all text-sm"
                    required
                  />
                </div>

                {/* PAYMENT SELECTION */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800">
                    Select Payment Method
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setPaymentMethod("COD")}
                      className={`cursor-pointer border-2 p-4 rounded-xl transition-all ${paymentMethod === "COD" ? "border-orange-500 bg-orange-50" : "border-slate-200"}`}
                    >
                      <FaMoneyBillWave
                        className={
                          paymentMethod === "COD"
                            ? "text-orange-500"
                            : "text-slate-400"
                        }
                      />
                      <p className="text-xs font-bold mt-2">Cash on Delivery</p>
                    </div>
                    <div
                      onClick={() => setPaymentMethod("Razorpay")}
                      className={`cursor-pointer border-2 p-4 rounded-xl transition-all ${paymentMethod === "Razorpay" ? "border-orange-500 bg-orange-50" : "border-slate-200"}`}
                    >
                      <FaCreditCard
                        className={
                          paymentMethod === "Razorpay"
                            ? "text-orange-500"
                            : "text-slate-400"
                        }
                      />
                      <p className="text-xs font-bold mt-2">
                        Razorpay (Online)
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
                >
                  Confirm & Pay ({paymentMethod})
                </button>
              </form>
              {!defaultAddress && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6">
                  <h3 className="font-bold text-red-600">
                    No Default Address Found
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    Please add and set a default address from Profile.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold pb-3 border-b border-slate-100">
              Price Details
            </h2>
            <div className="space-y-3 mt-4 text-xs font-medium">
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹{amount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Delivery</span>
                <span>FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-sm font-bold">
                <span>Total</span>
                <span>₹{amount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
