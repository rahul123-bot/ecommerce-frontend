import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaArrowLeft,
  FaCloudUploadAlt,
  FaTags,
  FaDolly,
} from "react-icons/fa";
import { addProducts } from "../../features/products/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      if (form.image) {
        formData.append("imageUrl", form.image);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await dispatch(addProducts(formData)).unwrap();

      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
      });
      setImageFile(null);
      setImagePreview("");
      alert("Product onboarding successful!");
      navigate("/");
    } catch (error) {
      console.error("Failed to add product:", error);
      alert(
        "Something went wrong. Please check your data variables and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-slate-800 font-sans antialiased p-4 sm:p-6 lg:p-8 flex items-start justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PRIMARY SUBMISSION SHEET */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
          {/* Header Action Row */}
          <div className="bg-white px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors mb-1.5 cursor-pointer"
              >
                <FaArrowLeft className="text-[10px]" /> Control Panel Overview
              </button>
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FaBox className="text-slate-400 text-base" /> Add New
                Marketplace Listing
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                Submit accurate fulfillment and media parameters to avoid offer
                suppression.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* ITEM TITLE */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                Product Title / Core Label{" "}
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                placeholder="e.g. Sony WH-1000XM4 Wireless Noise Cancelling Headphones (Black)"
                onChange={handleChange}
                className="w-full border border-slate-300 text-sm rounded-md px-3.5 py-2.5 focus:outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100 bg-white transition-all placeholder:text-slate-300"
              />
            </div>

            {/* CATALOG DESCRIPTION */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                Detailed Product Overview & Specs{" "}
                <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                required
                value={form.description}
                placeholder="Include box contents, dimension metrics, processing powers, structural compositions, and warranty terms..."
                onChange={handleChange}
                className="w-full border border-slate-300 text-sm rounded-md px-3.5 py-2.5 focus:outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100 h-28 resize-none bg-white transition-all placeholder:text-slate-300"
              />
            </div>

            {/* THREE-COLUMN PRICING AND QUANTITY DATA FIELD GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
                  Selling Price <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="price"
                    required
                    value={form.price}
                    placeholder="0"
                    onChange={handleChange}
                    className="w-full border border-slate-300 text-sm font-bold rounded-md pl-7 pr-3.5 py-2.5 focus:outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100 bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                  <FaTags className="text-slate-400 text-[10px]" /> Category
                  Block <span className="text-rose-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-slate-300 text-sm font-bold rounded-md px-3 py-2.5 focus:outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100 bg-white transition-all cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics & Gadgets</option>
                  <option value="Apparel">Clothing & Apparel</option>
                  <option value="Footwear">Footwear & Shoes</option>
                  <option value="Fitness">Sports & Fitness</option>
                  <option value="Home Decor">Home & Kitchen Decor</option>
                  <option value="Office Equipment">Office & Stationery</option>
                  <option value="Beauty">Beauty & Personal Care</option>
                  <option value="Health">Health & Wellness</option>
                  <option value="Toys">Toys & Games</option>
                  <option value="Automotive">Automotive Accessories</option>
                  <option value="Groceries">Groceries & Essentials</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                  <FaDolly className="text-slate-400 text-[11px]" /> Initial
                  Stock Units <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  value={form.stock}
                  placeholder="0"
                  onChange={handleChange}
                  className="w-full border border-slate-300 text-sm font-bold rounded-md px-3.5 py-2.5 focus:outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100 bg-white transition-all"
                />
              </div>
            </div>

            {/* DUAL FILE/URL ASSET STREAM SELECTION */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide block">
                Catalog Media Assets
              </label>

              <div className="relative border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 p-5 flex flex-col items-center justify-center transition-colors hover:bg-slate-100/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {imagePreview ? (
                  <div className="flex items-center gap-4 z-20 pointer-events-none">
                    <img
                      src={imagePreview}
                      alt="Local Asset Sync"
                      className="w-14 h-14 object-cover rounded border border-slate-200 bg-white shadow-sm"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {imageFile?.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold">
                        {(imageFile?.size / 1024 / 1024).toFixed(2)} MB Payload
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center pointer-events-none space-y-1">
                    <FaCloudUploadAlt className="text-2xl text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-700 font-bold">
                      Upload Local High-Res Photo
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Supports pure white background 1:1 image formats
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3 py-0.5">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  OR
                </span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <input
                type="text"
                name="image"
                value={form.image}
                disabled={!!imageFile}
                placeholder="Alternative: Paste raw content delivery network image URL link..."
                onChange={handleChange}
                className="w-full border border-slate-300 text-sm rounded-md px-3.5 py-2.5 focus:outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100 bg-white transition-all placeholder:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>

            {/* REVENUE ACTION CONTROLS */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#fb641b] hover:bg-[#e15613] disabled:opacity-60 disabled:pointer-events-none text-white font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-md transition-all cursor-pointer shadow-sm"
              >
                {isSubmitting ? "Syncing Offer Node..." : "Onboard Listing"}
              </button>
            </div>
          </form>
        </div>

        {/* REPLICATED FRONTEND BRAND SANDBOX DISPLAY */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-4 h-fit sticky top-6">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              Live Storefront Validation
            </h3>
          </div>

          <div className="border border-slate-100 rounded bg-white flex flex-col p-2">
            <div className="w-full aspect-square bg-slate-50 rounded border border-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
              {imagePreview || form.image ? (
                <img
                  src={imagePreview || form.image}
                  alt="Sandbox Preview Image"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="text-center text-slate-300 space-y-1">
                  <span className="text-3xl block">🖼️</span>
                  <span className="text-[10px] block font-bold uppercase tracking-wide">
                    Media Missing
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 space-y-1">
              <span className="text-[9px] uppercase font-black text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded w-fit block">
                {form.category || "Uncategorized Item"}
              </span>

              <h4 className="text-sm font-semibold text-slate-900 truncate">
                {form.name || (
                  <span className="text-slate-300 italic">
                    Untitled Listing SKU
                  </span>
                )}
              </h4>

              <div className="flex items-baseline gap-1.5 pt-0.5">
                <span className="text-base font-black text-slate-900">
                  ₹
                  {form.price
                    ? Number(form.price).toLocaleString("en-IN")
                    : "0"}
                </span>
                <span className="text-xs text-slate-400 line-through font-semibold">
                  ₹
                  {form.price
                    ? Number(Math.floor(form.price * 1.2)).toLocaleString(
                        "en-IN",
                      )
                    : "0"}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-400 font-medium">
                  Warehouse Status:
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] uppercase border ${
                    !form.stock || Number(form.stock) === 0
                      ? "bg-rose-50 border-rose-100 text-rose-600"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600"
                  }`}
                >
                  {form.stock && Number(form.stock) > 0
                    ? `${form.stock} Units Available`
                    : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
