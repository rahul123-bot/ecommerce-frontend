import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTag, FaBoxOpen, FaImage, FaPen, FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import {
  getProductsById,
  updateProducts,
} from "../../features/products/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector((state) => state.products);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "", // Can safely hold an existing URL string or a local File Object
    category: "",
    stock: "",
  });

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || "",
        category: product.category || "",
        stock: product.stock !== undefined ? product.stock : "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file, // Directly store the file object in state
      }));
    }
  };

  // Helper function to resolve image display source dynamically
  const getImagePreviewUrl = () => {
    if (!form.image) return "";
    if (typeof form.image === "object" && form.image instanceof File) {
      return URL.createObjectURL(form.image); // Generated preview path for local files
    }
    return form.image; // Extracted web URL string directly
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalForm = { ...form };

      // Check if the user uploaded a physical file
      if (form.image && typeof form.image === "object" && form.image instanceof File) {
        // Convert the binary file into a clean base64 data URL string
        const base64String = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(form.image);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        
        // Replace the file object with the string version
        finalForm.image = base64String;
      }

      // Send the clean text payload to your backend
      await dispatch(
        updateProducts({
          id,
          data: finalForm,
        }),
      ).unwrap();

      alert("Listing Updated Successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Error updating product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !form.name) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 gap-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold tracking-wider uppercase text-slate-400">
          Syncing Master Inventory File...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased p-4 sm:p-6 lg:p-8 flex items-start justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SELLER CONTROL CONSOLE MAIN SHEET */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          {/* Dashboard Header Bar */}
          <div className="bg-white px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors mb-2 cursor-pointer"
              >
                <FaArrowLeft className="text-[10px]" /> Back to Dashboard
              </button>
              <h1 className="text-xl font-black tracking-tight text-slate-800 flex items-center gap-2">
                Edit Offer Listing
              </h1>
              <p className="text-xs text-slate-400 font-medium font-mono">
                System Reference SKU: {id}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* PRODUCT TITLE ENTRY */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <FaPen className="text-slate-400 text-[10px]" /> Product Title{" "}
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Include key features like brand, model, color, size specifications"
                className="w-full border border-slate-200 text-sm font-medium rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 bg-white transition-all placeholder:text-slate-300"
              />
            </div>

            {/* DESCRIPTION RICH ENTRY */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                Product Specifications & Core Highlights{" "}
                <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                required
                value={form.description}
                onChange={handleChange}
                placeholder="Provide clean product specifications or bullet points detailing dimensions, warranties, and inclusions..."
                className="w-full border border-slate-200 text-sm font-medium rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 h-36 resize-none bg-white transition-all placeholder:text-slate-300"
              />
            </div>

            {/* SEGMENTED TRANSACTION METRICS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* TARGET METRIC: PRICING LOG */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  Your Selling Price <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-[11px] text-slate-400 text-sm font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="price"
                    required
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border border-slate-200 text-sm font-bold rounded-lg pl-8 pr-3.5 py-2.5 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 bg-white transition-all"
                  />
                </div>
              </div>

              {/* TARGET METRIC: CATEGORY NODE */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <FaTag className="text-slate-400 text-[10px]" /> Category Block <span className="text-rose-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-slate-200 text-sm font-bold rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 bg-white transition-all cursor-pointer"
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

              {/* TARGET METRIC: ALLOCATED UNITS */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <FaBoxOpen className="text-slate-400 text-[11px]" /> Stock Balance <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full border border-slate-200 text-sm font-bold rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 bg-white transition-all"
                />
              </div>
            </div>

            {/* ASSET MEDIALINK FILE OR URL HYBRID CONTAINER */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <FaImage className="text-slate-400 text-[11px]" /> Product Image Location <span className="text-rose-500">*</span>
              </label>
              
              <div className="flex flex-col md:flex-row items-stretch gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                {/* Thumb Box Container */}
                <div className="w-20 h-20 rounded-md border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-inner self-center">
                  {form.image ? (
                    <img 
                      src={getImagePreviewUrl()} 
                      alt="Active Media Attachment" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/100?text=Invalid+URL"; 
                      }}
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Empty</span>
                  )}
                </div>

                {/* Dual Option Layout */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Device File Upload Wrapper */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Option 1: Upload File</span>
                    <label className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-md cursor-pointer hover:bg-slate-700 transition-colors shadow-sm select-none w-full justify-center">
                      <FaCloudUploadAlt /> Choose System File
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-slate-400 truncate max-w-[240px] font-medium">
                      {typeof form.image === "object" ? `📄 ${form.image.name}` : "No file chosen"}
                    </p>
                  </div>

                  {/* Remote URL Clipboard Paste */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Option 2: Paste Image URL</span>
                    <input
                      type="text"
                      name="image"
                      value={typeof form.image === "string" ? form.image : ""}
                      onChange={handleChange}
                      placeholder="https://example.com/sku-image.jpg"
                      className="w-full border border-slate-200 text-xs font-medium rounded-lg px-3 py-2.5 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 bg-white transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SELLER SAVE/CANCEL COMMAND CONSOLE */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Discard
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#fb641b] hover:bg-[#e15613] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? "Updating Network..." : "Save and Sync Offer"}
              </button>
            </div>
          </form>
        </div>

        {/* SIDE PREVIEW MONITOR PANEL */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4 h-fit sticky top-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              Storefront Preview
            </h3>
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              title="Live Preview Sync Active"
            />
          </div>

          <div className="border border-slate-100 rounded-lg p-3 bg-white hover:shadow-md transition-shadow flex flex-col">
            <div className="w-full aspect-square bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
              {form.image ? (
                <img
                  src={getImagePreviewUrl()}
                  alt="Marketplace Sync Visual"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="text-center text-slate-300 space-y-1">
                  <FaImage className="text-3xl mx-auto opacity-40" />
                  <span className="text-[11px] block font-semibold uppercase tracking-wide">
                    Image Box
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-1.5">
              <span className="text-[9px] uppercase font-black tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded w-fit block">
                {form.category || "Unassigned"}
              </span>

              <h4 className="text-sm font-bold text-slate-800 truncate">
                {form.name || (
                  <span className="text-slate-300 italic">
                    Untitled Listing
                  </span>
                )}
              </h4>

              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="text-lg font-black text-slate-900">
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

              {/* Storage Availability Indicator Row */}
              <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between text-[11px] font-semibold">
                <span className="text-slate-400">Warehouse Allocation:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase border ${
                    !form.stock || Number(form.stock) === 0
                      ? "bg-rose-50 border-rose-100 text-rose-600"
                      : Number(form.stock) <= 5
                        ? "bg-amber-50 border-amber-100 text-amber-600"
                        : "bg-emerald-50 border-emerald-100 text-emerald-600"
                  }`}
                >
                  {form.stock !== ""
                    ? `${form.stock} In Stock`
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

export default EditProduct;