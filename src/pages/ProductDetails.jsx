import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaTrashAlt,
  FaTruck,
  FaSyncAlt,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  getProductsById,
  addReview,
  deleteReview,
} from "../features/products/productSlice.js";
import { addToCart } from "../features/cart/cartSlice.js";
import Loader from "../components/Loader.jsx";
import { addWishlist } from "../features/wishlist/wishlistSlice.js";

const ProductDetails = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);

  const handleReview = async () => {
    if (!comment.trim()) return alert("Please enter a comment before submitting.");
    
    await dispatch(
      addReview({
        id,
        data: {
          rating: Number(rating),
          comment,
        },
      })
    );

    setComment("");
    setRating(5);
    alert("Review added successfully! 🎉");
  };

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="text-slate-800 font-bold p-16 text-center bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          Product not found
        </div>
      </div>
    );
  }

  const renderStars = (ratingValue) => {
    const rounded = Math.round(ratingValue || 5);
    return (
      <div className="flex items-center gap-0.5 text-amber-500">
        {[...Array(5)].map((_, i) =>
          i < rounded ? <FaStar key={i} className="text-xs" /> : <FaRegStar key={i} className="text-xs" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* TOP LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm items-start">
          
          {/* LEFT COLUMN: HERO IMAGE STICKY MEDIA CONTAINER */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-6 space-y-4">
            <div className="relative bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden group aspect-square flex items-center justify-center p-4">
              <img
                src={product.image}
                loading="lazy"
                alt={product.name}
                className="max-w-full max-h-[450px] sm:max-h-[500px] object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Quality Assured Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-orange-500 text-white text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-md shadow-sm select-none">
                  🔥 Bestseller
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CORE COMMERCE INFO MATRICES */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-block bg-slate-100 border border-slate-200 text-slate-600 px-3 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase">
                {product.category}
              </span>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug text-slate-900">
                {product.name}
              </h1>

              {/* Customer Feedback Summary Metrics */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-black shadow-sm">
                  <span>{product.rating || 0}</span>
                  <FaStar className="text-[10px] mb-0.5" />
                </div>
                {renderStars(product.rating)}
                <span className="text-xs font-semibold text-slate-400">
                  ({product.numReviews || 0} Verified Reviews)
                </span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* FINANCIAL SEGMENT COST VALUE STRIP */}
            <div className="space-y-1 bg-slate-50 border border-slate-200/60 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400 line-through text-xs font-semibold">
                <span>M.R.P.:</span>
                <span>₹{(product.price * 1.2).toLocaleString("en-IN")}</span>
              </div>
              
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-baseline gap-2.5">
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </h2>
                  <span className="text-xs font-bold text-emerald-600 tracking-wide bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                    Save 20% off retail
                  </span>
                </div>

                <div>
                  {product.stock > 0 ? (
                    <span className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md font-bold text-xs tracking-wide text-emerald-700 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      In Stock ({product.stock} left)
                    </span>
                  ) : (
                    <span className="bg-rose-50 border border-rose-200 px-3 py-1 rounded-md font-bold text-xs tracking-wide text-rose-700 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Out Of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* PRODUCT SPECIFICATION BLOCK */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Product Details</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                {product.description}
              </p>
            </div>

            {/* ACTION DIRECT BUTTON CONSOLE ARRANGEMENT */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => {
                  dispatch(addToCart(product._id));
                  alert("Product added to cart! 🛒");
                }}
                disabled={product.stock <= 0}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-100 disabled:text-slate-400 text-slate-950 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.99] shadow-sm disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 group border border-amber-600/10"
              >
                <FaShoppingCart className="text-xs group-hover:scale-110 transition-transform" />
                <span>Add To Cart</span>
              </button>

              <button
                onClick={() => {
                  localStorage.setItem("paymentAmount", product.price);
                  navigate(`/checkout/${product._id}`);
                }}
                disabled={product.stock <= 0}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-extrabold text-sm tracking-wide transition-all active:scale-[0.99] shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                <FaBolt className="text-xs group-hover:animate-bounce" />
                <span>Buy Now</span>
              </button>

              <button
                onClick={() => {
                  dispatch(addWishlist(product._id));
                  alert("Added to Wishlist! ❤️");
                }}
                className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-[0.99] shadow-sm flex items-center justify-center gap-2 group"
              >
                <FaHeart className="text-xs text-rose-500 group-hover:scale-120 transition-transform" />
                <span>Wishlist</span>
              </button>
            </div>

            {/* ASSURANCE TRIDENT FOOTER STRIP */}
            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] font-bold text-slate-500">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-slate-400 text-sm" /> Free Delivery
                </div>
                <div className="flex items-center gap-2">
                  <FaSyncAlt className="text-slate-400 text-sm" /> 7-Day Returns
                </div>
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-slate-400 text-sm" /> 1 Year Warranty
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-slate-400 text-sm" /> 100% Authentic
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: FEEDBACK LOGISTICS */}
        <div className="mt-10 grid lg:grid-cols-3 gap-8 items-start">
          
          {/* CRITIQUE SUBMISSION COMPONENT CONTAINER */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 lg:sticky lg:top-6">
            <div className="space-y-1">
              <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                Review this product
              </h2>
              <p className="text-xs text-slate-400 font-medium">Share your thoughts with other customers</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  Select Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl p-3 text-xs font-bold tracking-wide focus:outline-none focus:border-orange-500/60 transition-colors"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Excellent)</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars (Good)</option>
                  <option value="3">⭐⭐⭐ 3 Stars (Average)</option>
                  <option value="2">⭐⭐ 2 Stars (Fair)</option>
                  <option value="1">⭐ 1 Star (Poor)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  Add a written review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like or dislike? How was the quality?"
                  className="w-full h-28 bg-slate-50 text-slate-800 border border-slate-200 rounded-xl p-3 text-xs font-medium placeholder-slate-400 transition-all focus:outline-none focus:border-orange-500/60 resize-none leading-relaxed"
                />
              </div>

              <button
                onClick={handleReview}
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all active:scale-[0.99] shadow-sm"
              >
                Submit Review
              </button>
            </div>
          </div>

          {/* VERIFIED COMMUNITY FEEDBACK LISTING */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
            <div className="space-y-1 pb-3 border-b border-slate-100">
              <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                Customer Reviews
              </h2>
              <p className="text-xs text-slate-400 font-medium">Ratings and text feedback configurations left by buyers</p>
            </div>

            {product.reviews?.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 border-dashed p-10 rounded-xl text-center text-xs font-bold text-slate-400 tracking-wide uppercase select-none">
                No reviews found yet. Be the first to rate it!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {product.reviews.map((review) => (
                  <div key={review._id} className="py-5 first:pt-0 last:pb-0 space-y-2 group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase border border-slate-200">
                            {review.name?.charAt(0) || "U"}
                          </div>
                          <h3 className="font-bold text-xs text-slate-800 tracking-wide">
                            {review.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-0.5">
                          {renderStars(review.rating)}
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded border border-emerald-100 tracking-wide uppercase">
                            Verified Purchase
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this review?")) {
                            dispatch(
                              deleteReview({
                                productId: product._id,
                                reviewId: review._id,
                              })
                            );
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 p-2 rounded-lg transition-all active:scale-[0.95]"
                        title="Delete Review"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium pl-8">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;