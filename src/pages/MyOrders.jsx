import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyOrders, cancelOrder } from "../features/order/orderSlice";
import Loader from "../components/Loader";
import generateInvoice from "../utils/generateInvoice.js";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.orders);
  
  // Local state to track if we've successfully loaded the data at least once
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

 useEffect(() => {
  dispatch(getMyOrders()).finally(() => {
    setIsInitialLoadComplete(true);
  });
}, [dispatch]);

useEffect(() => {
  const hasActiveOrders = orders?.some(
    (order) =>
      order.status !== "Delivered" &&
      order.status !== "Cancelled"
  );

  if (!hasActiveOrders) return;

  const interval = setInterval(() => {
    dispatch(getMyOrders());
  }, 5000); // every 5 sec

  return () => clearInterval(interval);
}, [orders, dispatch]);
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await dispatch(cancelOrder(orderId)).unwrap();
      dispatch(getMyOrders());
      alert("Order cancelled successfully");
    } catch (error) {
      alert(error?.message || "Unable to cancel order");
    }
  };

  // Only show full-screen loader during the very first network request
  if (loading && !isInitialLoadComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Your Orders
            </h1>
            <p className="text-slate-600 mt-1">
              Manage your purchase history and track active orders.
            </p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 text-center relative">
            {/* Subtle background updating indicator */}
            {loading && isInitialLoadComplete && (
              <span className="absolute top-1 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            )}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total Orders
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              {orders?.length || 0}
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {orders?.map((order) => {
            const steps = ["Pending", "Processing", "Shipped", "Delivered"];
            const currentIndex = steps.indexOf(order.status);
            const totalAmount =
              order.items?.reduce(
                (acc, item) =>
                  acc + (item.product?.price || 0) * (item.quantity || 1),
                0
              ) || 0;

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Header Info */}
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Placed On
                    </p>
                    <p className="text-sm font-semibold mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Payment
                    </p>
                    {order.paymentMethod === "COD" ? (
                      <span className="inline-block bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded mt-0.5 uppercase">
                        Cash on Delivery
                      </span>
                    ) : (
                      <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded mt-0.5 uppercase">
                        Paid
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Total
                    </p>
                    <p className="text-sm font-bold mt-0.5 text-slate-900">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Order ID
                    </p>
                    <p className="text-sm font-mono font-semibold mt-0.5 text-slate-500">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-md font-bold flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          order.status === "Cancelled"
                            ? "bg-red-500"
                            : order.status === "Delivered"
                            ? "bg-emerald-500"
                            : "bg-orange-500"
                        }`}
                      ></span>
                      Status:{" "}
                      <span
                        className={
                          order.status === "Cancelled"
                            ? "text-red-600"
                            : order.status === "Delivered"
                            ? "text-emerald-600"
                            : "text-slate-900"
                        }
                      >
                        {order.status}
                      </span>
                    </h3>
                  </div>

                  {/* Enhanced Tracking Bar */}
                  {order.status !== "Cancelled" && (
                    <div className="flex items-center justify-between mb-8 px-2">
                      {steps.map((step, index) => (
                        <div
                          key={step}
                          className="flex flex-col items-center flex-1 relative"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300 ${
                              index <= currentIndex
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-white border-slate-200 text-slate-400"
                            }`}
                          >
                            {index <= currentIndex ? "✓" : index + 1}
                          </div>
                          <p
                            className={`text-[10px] font-bold mt-2 ${
                              index <= currentIndex
                                ? "text-slate-900"
                                : "text-slate-400"
                            }`}
                          >
                            {step}
                          </p>
                          {index < steps.length - 1 && (
                            <div
                              className={`absolute top-4 left-[50%] w-full h-0.5 transition-colors duration-300 ${
                                index < currentIndex
                                  ? "bg-blue-600"
                                  : "bg-slate-200"
                              }`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    {order.items?.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition"
                      >
                        <img
                          src={item.product?.image}
                          alt={item.product?.name}
                          className="w-16 h-16 object-contain bg-white rounded-lg border p-1"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">
                            {item.product?.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-blue-600">
                          ₹
                          {(
                            item.product?.price * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-6 pt-6 border-t border-slate-100 gap-4">
                    <button className="text-xs font-bold text-blue-600 hover:underline">
                      Contact Support
                    </button>
                    <div className="flex gap-3">
                      {["Pending", "Processing"].includes(order.status) && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="bg-white border border-red-200 text-red-600 px-5 py-2 rounded-xl text-xs font-bold hover:bg-red-50 transition"
                        >
                          Cancel Order
                        </button>
                      )}
                      <button
                        onClick={() => generateInvoice(order)}
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                      >
                        📄 Download Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;