import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash, FaStar, FaShoppingBag, FaHeart, FaChevronRight,FaShoppingCart } from "react-icons/fa";
import { getWishlist, removeWishlist } from "../features/wishlist/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist, isLoading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-slate-800 py-4 sm:py-8 px-2 sm:px-4 antialiased font-sans">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        
        {/* DESKTOP/MOBILE HEADER ACCENT HUB */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="space-y-0.5">
            <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FaHeart className="text-rose-500 text-sm" /> My Wishlist 
              <span className="text-xs text-slate-400 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">
                {wishlist?.products?.length || 0} {wishlist?.products?.length === 1 ? 'Item' : 'Items'}
              </span>
            </h1>
          </div>
          <Link to="/" className="text-xs font-bold text-[#2874f0] hover:underline flex items-center gap-0.5">
            Continue Shopping <FaChevronRight className="text-[9px]" />
          </Link>
        </div>

        {/* LOADING SHIM VECTOR MATRIX */}
        {isLoading ? (
          <div className="divide-y divide-slate-100 bg-white">
            {[1, 2].map((n) => (
              <div key={n} className="p-6 flex gap-6 animate-pulse">
                <div className="w-24 h-24 bg-slate-100 rounded-sm shrink-0" />
                <div className="flex-grow space-y-3 pt-1">
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/4" />
                  <div className="h-5 bg-slate-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : !wishlist?.products?.length ? (
          
          /* AUTHENTIC EMPTY DATA BENCHMARK PLATFORM */
          <div className="p-12 sm:p-16 text-center bg-white flex flex-col items-center justify-center space-y-4">
            <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 text-3xl">
              <FaHeart className="opacity-80" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-800">Empty Wishlist Dashboard</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                You haven't saved any items to your wishlist hub yet. Tap the heart icons on product landing pages to synchronize favorites.
              </p>
            </div>
            <Link
              to="/"
              className="inline-block bg-[#fb641b] hover:bg-[#e15613] text-white font-black text-xs uppercase tracking-wider px-10 py-3 shadow-sm rounded-sm transition-colors cursor-pointer"
            >
              Explore Products Now
            </Link>
          </div>

        ) : (

          /* PREMIUM HIGH-DENSITY PRODUCT LISTING GRID */
          <div className="divide-y divide-slate-200 bg-white">
            {wishlist.products.map((product) => {
              const originalPrice = Math.floor(product.price * 1.2);
              const discountPct = 16; 

              return (
                <div
                  key={product._id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 hover:bg-slate-50/40 transition-colors duration-150 relative group"
                >
                  
                  {/* ASSET CANVAS METRIC BOX */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center border border-slate-100 rounded-sm overflow-hidden p-1.5 bg-white mix-blend-multiply mx-auto sm:mx-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* METADATA CORE INFRASTRUCTURE SHEET */}
                  <div className="flex-grow space-y-1 w-full text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 sm:gap-4">
                      <Link 
                        to={`/products/${product._id}`}
                        className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#2874f0] line-clamp-2 sm:line-clamp-1 transition-colors leading-tight"
                      >
                        {product.name}
                      </Link>
                      
                      {/* TRASH DISPOSAL MODULE */}
                      <button
                        onClick={() => dispatch(removeWishlist(product._id))}
                        className="text-slate-300 hover:text-rose-600 transition-colors p-1.5 absolute top-4 right-4 sm:static cursor-pointer rounded-full hover:bg-slate-100"
                        title="Remove from wishlist"
                      >
                        <FaTrash className="text-xs sm:text-sm" />
                      </button>
                    </div>

                    {/* LIVE REVENUE RATING SUB-ROW */}
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] pt-0.5">
                      <span className="bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded-[3px] inline-flex items-center gap-0.5 text-[10px]">
                        4.3 <FaStar className="text-[8px]" />
                      </span>
                      <span className="text-slate-400 font-semibold">(2,148 Reviews Verified)</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1 hidden sm:block font-medium">
                      {product.description}
                    </p>

                    {/* PRICING ENGINES GRID LINKAGE */}
                    <div className="flex items-baseline justify-center sm:justify-start gap-2 pt-1">
                      <span className="text-lg sm:text-xl font-black text-slate-900">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-400 line-through font-semibold">
                        ₹{Number(originalPrice).toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 tracking-tight">
                        {discountPct}% Off Special
                      </span>
                    </div>

                    {/* DELIVERY STATUS AND TRANSACTION CTA CONTROLS */}
                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-50 mt-2">
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        <span>Delivery Option: <strong className="text-slate-700 font-bold">Free Next-Day Drop</strong></span>
                      </div>
                      
                      <Link
                        to={`/products/${product._id}`}
                        className="w-full sm:w-auto bg-[#fb641b] hover:bg-[#e15613] text-white text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-sm shadow-sm transition-colors text-center inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FaShoppingCart className="text-[10px]" /> Move To Bag
                      </Link>
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

export default Wishlist;