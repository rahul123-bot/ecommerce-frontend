import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  updateProfile,
  changePassword,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../features/users/userSlice.js";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, addresses } = useSelector((state) => state.users);

  // States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [editingId, setEditingId] = useState(null);
  const [addrForm, setAddrForm] = useState({
    fullName: "", phone: "", houseNo: "", area: "", city: "", 
    state: "", pincode: "", landmark: "", type: "Home"
  });

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setAvatar(profile.avatar || "");
    }
  }, [profile]);

  // Handlers
  const handleProfileUpdate = (e) => { e.preventDefault(); dispatch(updateProfile({ name, phone, avatar })); };
  const handlePasswordChange = (e) => { e.preventDefault(); dispatch(changePassword({ currentPassword, newPassword })); setCurrentPassword(""); setNewPassword(""); };
  const handleAddrChange = (e) => setAddrForm({ ...addrForm, [e.target.name]: e.target.value });
  
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateAddress({ id: editingId, addressData: addrForm }));
      setEditingId(null);
    } else {
      dispatch(addAddress(addrForm));
    }
    setAddrForm({ fullName: "", phone: "", houseNo: "", area: "", city: "", state: "", pincode: "", landmark: "", type: "Home" });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Account</h1>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <img src={profile?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-slate-100" />
            <h2 className="text-xl font-bold">{profile?.name || "User"}</h2>
            <p className="text-slate-500 text-sm">{profile?.email}</p>
          </div>
        </div>

        {/* Settings Area */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Profile Form */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <form onSubmit={handleProfileUpdate} className="grid md:grid-cols-2 gap-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full border p-3 rounded-lg" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full border p-3 rounded-lg" />
              <button className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Update Profile</button>
            </form>
          </section>

          {/* Password Section */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6">Security Settings</h2>
            <form onSubmit={handlePasswordChange} className="grid md:grid-cols-2 gap-4">
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" className="w-full border p-3 rounded-lg" />
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="w-full border p-3 rounded-lg" />
              <button className="md:col-span-2 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-black">Update Password</button>
            </form>
          </section>

          {/* Address Management */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6">{editingId ? "Edit Address" : "Add New Address"}</h2>
            <form onSubmit={handleSaveAddress} className="grid md:grid-cols-2 gap-4 mb-8">
              {['fullName', 'phone', 'houseNo', 'area', 'city', 'state', 'pincode', 'landmark'].map((f) => (
                <input key={f} name={f} value={addrForm[f]} onChange={handleAddrChange} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} className="border p-3 rounded-lg" required />
              ))}
              <select name="type" value={addrForm.type} onChange={handleAddrChange} className="border p-3 rounded-lg">
                <option>Home</option><option>Office</option><option>Other</option>
              </select>
              <button className="md:col-span-2 bg-green-600 text-white py-3 rounded-lg font-bold">Save Address</button>
            </form>

            <div className="space-y-4">
              {addresses?.map((addr) => (
                <div key={addr._id} className={`p-5 rounded-xl border ${addr.isDefault ? 'border-green-500 bg-green-50' : 'border-slate-200'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{addr.fullName}</h3>
                      <p className="text-slate-600">{addr.houseNo}, {addr.area}, {addr.city}</p>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <button onClick={() => { setEditingId(addr._id); setAddrForm(addr); }} className="text-blue-600 font-bold">Edit</button>
                      <button onClick={() => dispatch(deleteAddress(addr._id))} className="text-red-600 font-bold">Delete</button>
                      {!addr.isDefault && <button onClick={() => dispatch(setDefaultAddress(addr._id))} className="text-green-600 font-bold">Set Default</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;