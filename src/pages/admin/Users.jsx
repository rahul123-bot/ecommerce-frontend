import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserShield, FaUserPlus, FaTrashAlt, FaUsers } from "react-icons/fa";
import {
  getUsers,
  deleteUser,
  makeAdmin,
} from "../../features/users/userSlice";

// Premium Retail Loading Skeleton Screen
const UsersSkeleton = () => (
  <div className="p-4 md:p-8 max-w-7xl mx-auto animate-pulse space-y-6 bg-slate-50 min-h-screen">
    <div className="h-8 bg-slate-200 rounded-md w-48 mb-2"></div>
    <div className="h-4 bg-slate-200 rounded w-64 mb-6"></div>
    <div className="h-12 bg-white border border-slate-200 rounded-xl mb-4"></div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-16 bg-white border border-slate-200 rounded-xl"></div>
    ))}
  </div>
);

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleMakeAdmin = (userId, userName) => {
    if (window.confirm(`Are you sure you want to grant Administrator access to ${userName}?`)) {
      dispatch(makeAdmin(userId));
    }
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to permanently delete user account "${userName}"?`)) {
      dispatch(deleteUser(userId));
    }
  };

  if (loading && (!users || users.length === 0)) return <UsersSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased p-4 sm:p-6 md:p-8 selection:bg-orange-500/20">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-1 pb-2 border-b border-slate-200">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            User Management Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            View registered customers, assign system roles, and manage system accounts.
          </p>
        </div>

        {/* EMPTY STATE */}
        {!users || users.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white shadow-sm max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <FaUsers className="text-xl" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Users Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              When new customers sign up for your platform, their database files will appear here.
            </p>
          </div>
        ) : (
          /* MODERN RESPONSIVE CONTAINER CARD */
          <div className="border border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
            
            {/* DESKTOP TABLE INTERFACE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Account Type</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr 
                      key={user._id} 
                      className="group transition-colors hover:bg-slate-50/60"
                    >
                      {/* Name / Avatar Initials */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 uppercase shadow-sm">
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <span className="font-bold text-sm text-slate-800">
                            {user.name || "Anonymous Guest"}
                          </span>
                        </div>
                      </td>
                      
                      {/* Email Address */}
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                        {user.email}
                      </td>
                      
                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          user.role?.toLowerCase() === "admin" 
                            ? "bg-purple-50 border-purple-200 text-purple-700" 
                            : "bg-slate-50 border-slate-200 text-slate-600"
                        }`}>
                          {user.role?.toLowerCase() === "admin" && <FaUserShield className="text-[9px]" />}
                          {user.role || "User"}
                        </span>
                      </td>
                      
                      {/* Interactive Management Controls */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          {user.role?.toLowerCase() !== "admin" ? (
                            <button
                              onClick={() => handleMakeAdmin(user._id, user.name)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 hover:border-slate-300 transition-all active:scale-[0.98] shadow-sm flex items-center gap-1.5"
                            >
                              <FaUserPlus className="text-[11px]" />
                              <span>Promote Admin</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-bold select-none px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                              System Master
                            </span>
                          )}
                          
                          <button
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all active:scale-[0.95] shadow-sm"
                            title="Delete User Account"
                          >
                            <FaTrashAlt className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD LAYOUT INTERFACE */}
            <div className="block md:hidden divide-y divide-slate-100 p-2 bg-slate-50">
              {users.map((user) => (
                <div 
                  key={user._id} 
                  className="p-4 space-y-4 bg-white rounded-xl my-2 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase shrink-0">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="font-bold text-sm text-slate-800">
                          {user.name || "Anonymous Guest"}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium truncate max-w-[180px] sm:max-w-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    {/* Role Badge */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border shrink-0 ${
                      user.role?.toLowerCase() === "admin" 
                        ? "bg-purple-50 border-purple-100 text-purple-700" 
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}>
                      {user.role || "User"}
                    </span>
                  </div>

                  {/* Actions Console strip */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    {user.role?.toLowerCase() !== "admin" ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user.name)}
                        className="flex-1 text-center py-2 rounded-lg text-xs font-bold bg-white text-blue-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        Grant Admin
                      </button>
                    ) : (
                      <div className="flex-1 text-center py-2 rounded-lg text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-400 select-none">
                        Protected Root Account
                      </div>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      className="px-3 py-2 rounded-lg text-rose-600 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 hover:border-rose-200 transition-colors"
                      title="Delete User"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
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

export default Users;