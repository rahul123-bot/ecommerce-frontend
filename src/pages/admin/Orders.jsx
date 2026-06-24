import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBoxOpen, FaCircle, FaChevronRight, FaFileInvoice } from "react-icons/fa";
import { getMyOrders } from "../../features/order/orderSlice.js";

// Premium Retail Skeleton Loading Component
const OrdersSkeleton = () => (
  <div className="p-4 md:p-8 max-w-5xl mx-auto animate-pulse space-y-6 bg-slate-50 min-h-screen">
    <div className="h-7 bg-slate-200 rounded-md w-36 mb-2"></div>
    <div className="h-4 bg-slate-200 rounded w-56 mb-8"></div>
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-32 bg-white border border-slate-200 rounded-xl"></div>
    ))}
  </div>
);

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  // Clean, context-driven status marker styler
  const getStatusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return { text: "text-emerald-600", dot: "bg-emerald-500", label: "Delivered" };
      case "Shipped":
        return { text: "text-blue-600", dot: "bg-blue-500", label: "Shipped" };
      case "Processing":
        return { text: "text-amber-600", dot: "bg-amber-500", label: "Processing" };
      case "Cancelled":
        return { text: "text-rose-600", dot: "bg-rose-500", label: "Cancelled" };
      default:
        return { text: "text-slate-600", dot: "bg-slate-400", label: "Order Placed" };
    }
  };

  if (loading && (!orders || orders.length === 0)) return <OrdersSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased p-4 sm:p-6 md:p-8 selection:bg-orange-500/20">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-1 pb-2 border-b border-slate-200">
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
            Your Orders
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            Track shipment delivery timelines, manage returns, and view digital invoices.
          </p>
        </div>

        {/* EMPTY STATE */}
        {!orders || orders.length === 0 ? (
          <div className="text-center py-16 border border-slate-200 rounded-2xl bg-white shadow-sm max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <FaBoxOpen className="text-xl" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Orders Placed Yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              You haven't made any purchases yet. Your itemized receipt tracking sheets will settle here.
            </p>
          </div>
        ) : (
          
          /* ORDERS GRID TIMELINE */
          <div className="space-y-4">
            {orders.map((order) => {
              const statusStyle = getStatusConfig(order.status);
              return (
                <div
                  key={order._id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-slate-300 transition-all flex flex-col"
                >
                  {/* UPPER CARDS BANNER METADATA BLOCK (Amazon-Style Metadata Bar) */}
                  <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 sm:px-6 grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-4 text-[11px] sm:text-xs font-bold text-slate-500 tracking-wide uppercase">
                    <div className="space-y-0.5">
                      <p className="text-slate-400 font-semibold text-[10px]">Order ID</p>
                      <p className="font-mono text-slate-700 truncate max-w-[140px] sm:max-w-none">
                        #{order._id}
                      </p>
                    </div>

                    {order.user?.name && (
                      <div className="space-y-0.5 hidden md:block">
                        <p className="text-slate-400 font-semibold text-[10px]">Ship To</p>
                        <p className="text-slate-700 normal-case">{order.user.name}</p>
                      </div>
                    )}

                    <div className="space-y-0.5 sm:text-right">
                      <p className="text-slate-400 font-semibold text-[10px]">Total Paid</p>
                      <p className="text-slate-900 font-extrabold text-sm sm:text-base normal-case">
                        ₹{order.totalPrice?.toLocaleString("en-IN") || "0"}
                      </p>
                    </div>
                  </div>

                  {/* MAIN BODY CONTENTS CORE */}
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    
                    {/* LEFT COLUMN: ITEM DESCRIPTIONS BLOCK */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Box Placeholder representing order item items */}
                      <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0 shadow-inner">
                        <FaBoxOpen className="text-xl" />
                      </div>
                      
                      <div className="space-y-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate">
                          Package details containing {order.orderItems?.length || 1} item(s)
                        </h4>
                        <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-black uppercase text-slate-500">
                            Standard Ship
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* MIDDLE COLUMN: LIVE FULFILLMENT INDICATOR TRACK */}
                    <div className="flex items-center gap-2 sm:justify-center py-2 sm:py-0 border-t border-b border-slate-100 sm:border-none">
                      <FaCircle className={`text-[8px] animate-pulse ${statusStyle.dot}`} />
                      <span className={`text-sm font-extrabold tracking-tight ${statusStyle.text}`}>
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* RIGHT COLUMN: ACTION ROUTING CONSOLE ROW */}
                    <div className="flex items-center gap-2 sm:justify-end shrink-0">
                      <button 
                        onClick={() => alert(`Opening Invoice for Order #${order._id}`)}
                        className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <FaFileInvoice className="text-slate-400 text-[11px]" />
                        <span>Invoice</span>
                      </button>
                      
                      <button 
                        onClick={() => alert(`Navigating to details for Order #${order._id}`)}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold text-blue-600 bg-blue-50/40 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View Details</span>
                        <FaChevronRight className="text-[9px] mt-0.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;