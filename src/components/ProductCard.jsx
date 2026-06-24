import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaSpinner, FaCheck, FaShoppingBag, FaEdit, FaTrash } from "react-icons/fa";
import { addToCart } from "../features/cart/cartSlice";
import { deleteProducts } from "../features/products/productSlice";
import { addWishlist } from "../features/wishlist/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const placeholderImg = "https://placehold.co/600x400?text=Product";

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCartClick = async () => {
    if (isAdding) return;
    
    setIsAdding(true);
    try {
      await dispatch(addToCart(product._id));
      
      setIsAdding(false);
      setIsAdded(true);
      
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      setIsAdding(false);
      setIsAdded(false);
    }
  };

  return (
    <div className="bg-white rounded-sm overflow-hidden border border-slate-200/80 hover:shadow-md transition-shadow duration-200 group h-full flex flex-col relative text-left">
      
      {/* MEDIA CONTAINER WITH MIX-BLEND BACKGROUND FIX */}
      <div className="relative overflow-hidden aspect-[4/5] w-full bg-white shrink-0 p-4 flex items-center justify-center">
        <Link to={`/products/${product._id}`} className="block w-full h-full flex items-center justify-center mix-blend-multiply">
          <img
            src={product.image || placeholderImg}
            loading="lazy"
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-102 transition-transform duration-300 ease-out"
          />
        </Link>

        {/* SALE BADGE */}
        <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[9px] font-black tracking-wider px-1.5 py-0.5 rounded-sm shadow-sm uppercase select-none pointer-events-none">
          DEAL
        </div>

        {/* WISHLIST BUTTON */}
        <button
          onClick={() => dispatch(addWishlist(product._id))}
          className="absolute top-2.5 right-2.5 bg-white/90 text-slate-300 hover:text-rose-500 border border-slate-200 w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-all active:scale-95 cursor-pointer z-10"
          title="Add to Wishlist"
        >
          <FaHeart className="text-xs" />
        </button>

        {/* CATEGORY METADATA DISPLAY */}
        {product.category && (
          <div className="absolute bottom-2.5 left-2.5 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm max-w-[140px] truncate pointer-events-none border border-slate-200/40">
            {product.category}
          </div>
        )}
      </div>

      {/* RETAIL METADATA HUB */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 space-y-2 border-t border-slate-100">
        
        {/* BRAND & NAME SEGMENT */}
        <div className="space-y-0.5 flex-1">
          <Link to={`/products/${product._id}`} className="inline-block max-w-full">
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 hover:text-[#2874f0] transition-colors line-clamp-1 tracking-tight">
              {product.name}
            </h2>
          </Link>
          
          <p className="text-[11px] text-slate-400 line-clamp-1 font-medium leading-normal">
            {product.description}
          </p>
        </div>

        {/* SOCIAL ENGINE RATING METRICS */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded-[3px] inline-flex items-center gap-0.5 text-[10px]">
            {product.rating || 5} <FaStar className="text-[8px]" />
          </span>
          <span className="text-slate-400 font-semibold">({product.numReviews || 0})</span>
        </div>

        {/* PRICING SCHEME ENGINE */}
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-slate-900">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-slate-400 line-through font-semibold">
              ₹{Number(Math.floor(product.price * 1.2)).toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] font-bold text-emerald-600 tracking-tight">
              20% off
            </span>
          </div>
        </div>

        {/* STOCK INVENTORY METRIC LEGEND */}
        <div>
          {product.stock > 0 ? (
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              Out Of Stock
            </span>
          )}
        </div>

        {/* TRANSACTION ACTION CONTROLS */}
        <div className="pt-1.5 space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            
            {/* INTERACTIVE ADD TO CART MODULE */}
            <button
              onClick={handleAddToCartClick}
              disabled={product.stock <= 0 || isAdding}
              className={`w-full py-2.5 px-1.5 rounded-sm text-[11px] font-bold tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-1 border cursor-pointer
                ${isAdded 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300 disabled:opacity-40 disabled:pointer-events-none"
                }`}
            >
              {isAdding ? (
                <>
                  <FaSpinner className="animate-spin text-[#fb641b] text-xs" />
                  <span>Adding...</span>
                </>
              ) : isAdded ? (
                <>
                  <FaCheck className="text-emerald-600 text-[9px]" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <FaShoppingBag className="text-[9px] text-slate-400 group-hover:text-slate-600" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {/* INSTANT CHECKOUT TRIGGER */}
            <button
              onClick={() => {
                localStorage.setItem("paymentAmount", product.price);
                navigate(`/checkout/${product._id}`);
              }}
              className="w-full bg-[#fb641b] hover:bg-[#e15613] text-white py-2.5 px-1.5 rounded-sm text-[11px] font-black tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-0.5 cursor-pointer shadow-sm"
            >
              Buy Now
            </button>
          </div>

          {/* ADMIN SUPERUSER MANAGEMENT HUD */}
          {user?.role === "admin" && (
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-1.5">
              <Link to={`/admin/edit-product/${product._id}`} className="block w-full">
                <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center gap-1">
                  <FaEdit className="text-[10px] text-slate-400" /> Edit
                </button>
              </Link>

              <button
                onClick={() => {
                  const ok = window.confirm("Delete Product?");
                  if (ok) {
                    dispatch(deleteProducts(product._id));
                  }
                }}
                className="w-full bg-slate-50 hover:bg-rose-50 text-rose-600 border border-slate-200 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center gap-1"
              >
                <FaTrash className="text-[9px] text-rose-400" /> Delete
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default React.memo(ProductCard);