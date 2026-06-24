import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBox, FaUser, FaEnvelope, FaChevronDown, FaSearch, FaFilter } from "react-icons/fa";
import { updateOrderStatus, getAllOrders } from "../../features/order/orderSlice";

// Premium Merchant Skeleton Loader
const OrdersSkeleton = () => (
  <div className="p-4 md:p-8 max-w-7xl mx-auto animate-pulse space-y-6 bg-slate-50 min-h-screen">
    <div className="h-8 bg-slate-200 rounded-lg w-52 mb-2"></div>
    <div className="h-4 bg-slate-200 rounded w-72 mb-8"></div>
    <div className="h-14 bg-white border border-slate-200 rounded-xl mb-4"></div>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="h-20 bg-white border border-slate-200 rounded-xl"></div>
    ))}
  </div>
);

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Premium Retail Badging Matrix
  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/70";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100/70";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/70";
      case "Processing":
        return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100/70";
      default: // Pending
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/70";
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  if (loading && (!orders || orders.length === 0)) return <OrdersSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased p-4 sm:p-6 md:p-8 selection:bg-orange-500/10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* MERCHANT HUB HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-orange-500 text-white shadow-sm shadow-orange-500/20 text-sm md:text-base">📦</span>
              Order Fulfillment Center
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              Monitor incoming marketplace transactions, updates dispatch pipelines, and adjust customer logs.
            </p>
          </div>
          
          {/* SEARCH/FILTER CONTROL BAR (Adds context to modern seller hubs) */}
          <div className="flex items-center gap-2 self-start md:self-auto w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-xs">
                <FaSearch />
              </span>
              <input 
                type="text" 
                placeholder="Search Order ID..." 
                className="w-full text-xs font-medium pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 placeholder:text-slate-400 transition-colors shadow-sm"
                disabled
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm text-xs">
              <FaFilter />
            </button>
          </div>
        </div>

        {/* EMPTY STATE ARCHIVE */}
        {!orders || orders.length === 0 ? (
          <div className="text-center py-20 border border-slate-200 rounded-2xl bg-white shadow-sm max-w-md mx-auto mt-8">
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4 shadow-inner">
              <FaBox className="text-xl" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Marketplace Requests</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Your storefront dashboard is quiet. Incoming live retail payments populate immediately inside this feed.
            </p>
          </div>
        ) : (
          
          /* ENTERPRISE CONTAINER FRAMEWORK */
          <div className="border border-slate-200 bg-white rounded-xl shadow-sm overflow-hidden">
            
            {/* DESKTOP MATRIX SYSTEM (md up) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-6">Order Details</th>
                    <th className="py-3.5 px-6">Recipient Registry</th>
                    <th className="py-3.5 px-6">Contact Endpoint</th>
                    <th className="py-3.5 px-6 text-right">Logistics Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr 
                      key={order._id} 
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Order Identifier */}
                      <td className="py-4 px-6 font-mono text-xs font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                        <span className="text-orange-500 font-sans mr-0.5">#</span>
                        {order._id}
                      </td>
                      
                      {/* Customer Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs border border-slate-200">
                            <FaUser className="scale-90" />
                          </div>
                          <span className="font-bold text-slate-800 text-sm">
                            {order.user?.name || "Anonymous Buyer"}
                          </span>
                        </div>
                      </td>
                      
                      {/* Email Identity */}
                      <td className="py-4 px-6 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <FaEnvelope className="text-slate-300 text-[10px]" />
                          <span className="truncate max-w-[200px]">{order.user?.email || "N/A"}</span>
                        </div>
                      </td>
                      
                      {/* Action Command Select Dropdown */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-block relative">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`pl-3 pr-8 py-1.5 rounded-lg border text-xs font-bold tracking-tight bg-white appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-slate-200/50 transition-all shadow-sm ${getStatusStyles(order.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-current opacity-70">
                            <FaChevronDown className="text-[9px]" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE INTERFACE LIST CARDS (xs to sm) */}
            <div className="block md:hidden divide-y divide-slate-100 p-2 bg-slate-50/50">
              {orders.map((order) => (
                <div 
                  key={order._id} 
                  className="p-4 space-y-4 bg-white rounded-xl my-2 border border-slate-200 shadow-sm"
                >
                  {/* Top Header Card Info Row */}
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      <span className="text-orange-500 font-sans mr-0.5">#</span>
                      {order._id?.substring(0, 12)}...
                    </span>
                    
                    {/* Compact Interactive State Toggle */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`pl-3 pr-7 py-1.5 rounded-lg border text-[11px] font-extrabold tracking-tight bg-white appearance-none focus:outline-none shadow-sm ${getStatusStyles(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-current opacity-70">
                        <FaChevronDown className="text-[8px]" />
                      </div>
                    </div>
                  </div>

                  {/* Customer Block Layout Metadata */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Specifications</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-[10px]">
                        <FaUser />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        {order.user?.name || "Anonymous Buyer"}
                      </p>
                    </div>
                    <p className="text-xs font-medium text-slate-500 pl-8 truncate">
                      {order.user?.email || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ManageOrders;