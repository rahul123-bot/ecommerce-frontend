import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTag, FaStar, FaShieldAlt, FaTruck, FaRegClock, FaChevronRight } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import AIChatBox from "../components/AIChatBox";
import { getProducts } from "../features/products/productSlice";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f1f3f6]">
        <Loader />
      </div>
    );
  }

  const heroProduct = products && products.length > 0 ? products[0] : null;
  const placeholderImg = "https://placehold.co/800x500/ffffff/2874f0?text=Featured+Deals";

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-slate-800 font-sans antialiased selection:bg-[#2874f0]/10">
      
      {/* ENTERPRISE RETAIL NAVIGATION BAR */}
      <header className="bg-[#2874f0] text-white py-2.5 px-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3.5">
          
          {/* Brand Engine Identity */}
          <div className="flex items-center justify-between w-full md:w-auto shrink-0 select-none">
            <span className="text-xl font-black tracking-tight italic text-white flex items-center gap-0.5">
              AI<span className="text-amber-400">Shop</span>
              <div className="flex flex-col items-start pl-1 font-sans not-italic leading-none">
                <span className="text-[9px] font-bold text-amber-300 italic tracking-wide">Plus</span>
              </div>
            </span>
            
            {/* Mobile Utility View Link */}
            <a href="#products" className="text-xs font-semibold text-white/90 underline block md:hidden">
              All Items
            </a>
          </div>

          {/* FLIPKART CONTEXT SEARCH SYSTEM BLOCK */}
          <div className="w-full max-w-2xl bg-white rounded-sm flex items-center justify-between overflow-hidden shadow-sm">
            <div className="w-full [&_input]:w-full [&_input]:px-4 [&_input]:py-2 [&_input]:text-xs sm:[&_input]:text-sm [&_input]:text-slate-900 [&_input]:bg-transparent [&_input]:border-none [&_input]:outline-none [&_input]:placeholder-slate-400">
              <SearchBar />
            </div>
            <div className="h-full px-4 text-slate-400 shrink-0 flex items-center justify-center pointer-events-none">
            </div>
          </div>

          {/* RIGHT SIDE UTILITIES */}
          <div className="hidden md:flex items-center gap-7 text-xs font-bold tracking-wide shrink-0">
            <a href="#products" className="hover:text-amber-300 transition-colors">
              Explore Deals
            </a>
            <div className="flex flex-col items-start leading-none cursor-pointer group bg-white/10 px-3 py-1.5 rounded-sm hover:bg-white/15 transition-colors">
              <span className="text-[9px] text-white/80 font-normal">Welcome, Sign In</span>
              <span className="text-white font-extrabold mt-0.5">Account Hub</span>
            </div>
          </div>

        </div>
      </header>

      {/* HORIZONTAL CATEGORY NAVIGATION STRIP */}
      <nav className="w-full bg-white border-b border-slate-200 shadow-sm overflow-x-auto scrollbar-none sticky top-[53px] sm:top-[51px] md:top-[57px] z-20">
        <div className="max-w-[1300px] mx-auto px-4 py-2.5 flex items-center justify-start lg:justify-center min-w-max">
          <div className="w-full [&_ul]:flex [&_ul]:items-center [&_ul]:gap-6 sm:[&_ul]:gap-10 md:[&_ul]:gap-12 [&_li]:cursor-pointer [&_button]:border-none [&_button]:bg-transparent [&_button]:p-0 [&_span]:text-xs [&_span]:font-bold [&_span]:text-slate-600 hover:[&_span]:text-[#2874f0] [&_span]:transition-colors">
            <CategoryFilter />
          </div>
        </div>
      </nav>

      {/* CORE CONTENT LAYOUT */}
      <main className="max-w-[1300px] mx-auto px-2 sm:px-4 pb-16 pt-3 space-y-4">
        
        {/* PREMIUM RETAIL BANNER HERO CONTEXT */}
        <section className="relative overflow-hidden rounded-sm bg-white border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 items-center min-h-[220px] sm:min-h-[280px]">
          <div className="md:col-span-7 p-6 sm:p-8 md:p-10 space-y-3 text-left z-10">
            <div className="inline-flex items-center gap-1 bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              <FaRegClock className="text-[9px]" /> Deal Of The Day
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
              Premium Electronic Systems & Infrastructure <br />
              <span className="text-[#2874f0]">Up to 50% Off Extra Savings</span>
            </h1>
            <p className="text-slate-500 text-xs font-medium max-w-xl leading-relaxed hidden sm:block">
              Explore high-performance computing arrays, immersive mechanical architectures, monitors, and elite gear accessories with guaranteed authentic fulfillment tracking.
            </p>
            <div className="flex items-center gap-2.5 pt-1.5">
              <a href={heroProduct ? `/products/${heroProduct._id}` : "/"} className="px-5 py-2 rounded-sm text-xs font-black uppercase tracking-wide bg-[#fb641b] hover:bg-[#e15613] text-white shadow-sm transition-colors">
                Shop Deal
              </a>
              <a href="#products" className="px-5 py-2 rounded-sm text-xs font-black uppercase tracking-wide bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 transition-colors">
                View All
              </a>
            </div>
          </div>

          <div className="md:col-span-5 w-full h-full p-4 flex items-center justify-center bg-white border-t md:border-t-0 md:border-l border-slate-100">
            <img
              src={heroProduct?.image || placeholderImg}
              alt={heroProduct?.name || "Premium Campaign Visual"}
              className="max-h-[160px] sm:max-h-[220px] object-contain transition-transform duration-300 hover:scale-102"
            />
          </div>
        </section>

        {/* ECOSYSTEM TRUST METRICS ROW */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { metric: `${products?.length || 0}+ Live Hubs`, tag: "Active Inventory Units", color: "text-[#2874f0]", icon: <FaTag /> },
            { metric: "100% Secure", tag: "Payment Guardrails", color: "text-emerald-600", icon: <FaShieldAlt /> },
            { metric: "Express Shipping", tag: "Fulfillment Nodes", color: "text-amber-500", icon: <FaTruck /> },
            { metric: "Top Rated Tiers", tag: "Certified Warranties", color: "text-rose-600", icon: <FaStar /> },
          ].map((stat, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-sm p-3 flex items-center gap-3 shadow-sm pl-4 sm:pl-6">
              <div className={`text-base sm:text-lg ${stat.color} opacity-80 shrink-0`}>
                {stat.icon}
              </div>
              <div className="text-left leading-tight">
                <h3 className={`text-xs sm:text-sm font-extrabold tracking-tight ${stat.color}`}>
                  {stat.metric}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                  {stat.tag}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CONDITIONAL SYSTEM ROW FOR DATA RENDERS */}
        {!products || products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-sm shadow-sm space-y-3">
            <span className="text-4xl block select-none">📦</span>
            <h3 className="text-sm font-bold text-slate-800">No Inventory Nodes Active</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Catalog indexes are running hot updates. Please refresh your browser matrix to capture incoming data arrays.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* SHELF SEGMENT 1: CHOSEN SELECTIONS */}
            <section className="bg-white border border-slate-200 rounded-sm shadow-sm p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="space-y-0.5 text-left">
                  <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                    Featured Selections 
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">Top Offers</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">Handpicked premium products matching rigorous performance matrices.</p>
                </div>
                <a href="#products" className="text-xs font-bold text-[#2874f0] hover:underline shrink-0 hidden sm:flex items-center gap-0.5">
                  View All <FaChevronRight className="text-[8px]" />
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>

            {/* SHELF SEGMENT 2: TOP RATED HOVERS */}
            <section className="bg-white border border-slate-200 rounded-sm shadow-sm p-4 sm:p-5 space-y-4">
              <div className="border-b border-slate-100 pb-2.5 text-left">
                <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                  Top Rated Architectures 
                  <span className="text-[10px] font-extrabold text-[#2874f0] bg-blue-50 px-1.5 py-0.5 rounded-sm">Highly Reviewed</span>
                </h2>
                <p className="text-xs text-slate-400 font-medium">Overwhelmingly verified peer-reviewed item selections with top star tiers.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5">
                {[...products]
                  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </section>

            {/* SHELF SEGMENT 3: COMPREHENSIVE OVERALL ENGINE */}
            <section id="products" className="bg-white border border-slate-200 rounded-sm shadow-sm p-4 sm:p-5 space-y-4">
              <div className="border-b border-slate-100 pb-2.5 text-left">
                <h2 className="text-base font-black text-slate-900 tracking-tight">Complete Component Catalog</h2>
                <p className="text-xs text-slate-400 font-medium">Examine our overarching retail collection indices unfiltered.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>

          </div>
        )}

        {/* AI INTERACTIVE FLOATING BOX CONTROLLER */}
        <AIChatBox />
      </main>
    </div>
  );
};

export default Home;