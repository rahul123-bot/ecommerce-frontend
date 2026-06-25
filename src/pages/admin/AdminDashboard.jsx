import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaUsers, FaBoxOpen, FaClipboardList, FaWallet, FaPlus, FaCog } from "react-icons/fa";
import {
  getDashboardStats,
  getAnalytics,
} from "../../features/dashboard/dashboardSlice.js";

// Premium Retail Hub Skeleton Loader
const DashboardSkeleton = () => (
  <div className="p-4 md:p-8 max-w-7xl mx-auto animate-pulse bg-slate-50 min-h-screen">
    <div className="h-7 bg-slate-200 rounded-md w-48 mb-8"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl h-28"></div>
      ))}
    </div>
    <div className="bg-white border border-slate-200 p-6 rounded-xl h-[400px] mb-6"></div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-slate-200 rounded-lg h-14"></div>
      ))}
    </div>
  </div>
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, analytics, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getAnalytics());
  }, [dispatch]);

  // Safely format analytics into chart data
  const chartData = (analytics || []).map((item) => {
    const months = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return {
      month: months[item?._id?.month] || "N/A",
      revenue: item?.revenue || 0,
    };
  });

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-orange-500/10">
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* RETAIL MANAGEMENT HUB HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="space-y-0.5">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
              Merchant Control Console
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              Real-time platform performance indicators, financial registries, and rapid inventory control.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Marketplace Sync
            </span>
          </div>
        </div>

        {/* HIGH-DENSITY ANALYTICAL SUMMARY BLOCK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Users */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase block">Total Users</span>
              <p className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                {stats?.users?.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <FaUsers className="text-lg" />
            </div>
          </div>

          {/* Card 2: Products */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase block">Active SKUs</span>
              <p className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                {stats?.products?.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-3.5 bg-purple-50 border border-purple-100 rounded-xl text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
              <FaBoxOpen className="text-lg" />
            </div>
          </div>

          {/* Card 3: Orders */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase block">Fulfillment Lines</span>
              <p className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                {stats?.orders?.toLocaleString() || 0}
              </p>
            </div>
            <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
              <FaClipboardList className="text-lg" />
            </div>
          </div>

          {/* Card 4: Revenue */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold tracking-wider text-slate-400 uppercase block">Gross Revenues</span>
              <p className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 text-emerald-600">
                ₹{stats?.revenue?.toLocaleString("en-IN") || 0}
              </p>
            </div>
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <FaWallet className="text-lg" />
            </div>
          </div>

        </div>

        {/* CHART METRIC MATRIX DISPLAY */}
        <div className="border border-slate-200 bg-white p-5 md:p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold tracking-tight text-slate-900">
                Gross Financial Trajectory
              </h2>
              <p className="text-xs text-slate-400 font-medium">Aggregated sales pipelines grouped by monthly calendar nodes</p>
            </div>
            <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
              FY 2025 - 2026
            </div>
          </div>

          <div className="w-full h-[320px] md:h-[360px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  {/* Clean, institutional gradient replacing toxic neon look */}
                  <linearGradient id="retailBlueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b" 
                  fontSize={11}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  dy={8}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  dx={-4}
                  tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
                <Tooltip
                  cursor={{ fill: '#f1f5f9', opacity: 0.6 }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                    color: '#1e293b',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Settled Revenue']}
                />
                <Bar
                  dataKey="revenue"
                  fill="url(#retailBlueGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={38}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MANAGEMENT ROUTING FOOTER LINKS */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Quick Operational Relays</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <Link
              to="/admin/add-product"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 text-xs shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><FaPlus /></span>
                <span>Publish New Listing</span>
              </div>
              <span className="text-slate-300 group-hover:text-slate-500 text-sm transition-colors">➔</span>
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 text-xs shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors"><FaClipboardList /></span>
                <span>Fulfillment Engine</span>
              </div>
              <span className="text-slate-300 group-hover:text-slate-500 text-sm transition-colors">➔</span>
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 text-xs shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-800 group-hover:text-white transition-colors"><FaCog /></span>
                <span>Access Management</span>
              </div>
              <span className="text-slate-300 group-hover:text-slate-500 text-sm transition-colors">➔</span>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;