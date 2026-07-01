import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTag, FaStar, FaShieldAlt, FaTruck, FaRegClock, FaChevronRight, FaCompass, FaUserCircle } from "react-icons/fa";
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
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <Loader />
      </div>
    );
  }

  const heroProduct = products && products.length > 0 ? products[0] : null;
  const placeholderImg = "https://placehold.co/800x500/ffffff/2874f0?text=Featured+Deals";

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 font-sans antialiased selection:bg-blue-600/10">
      
      {/* ENTERPRISE RETAIL NAVIGATION BAR */}
      <header className="bg-blue-600 text-white py-3 px-4 sticky top-0 z-30 shadow-md backdrop-blur-md bg-blue-600/95 border-b border-blue-700/50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <div className="flex items-center justify-between w-full md:w-auto shrink-0 select-none">
            <span className="text-2xl font-black tracking-tight italic text-white flex items-center gap-1 group cursor-pointer">
               Nexa<span className="text-yellow-400 not-italic">Cart</span>
              <span className="text-[10px] font-bold bg-yellow-400 text-blue-900 not-italic px-1.5 py-0.5 rounded-md ml-1.5 shadow-sm tracking-wide uppercase">Plus</span>
            </span>
            
            {/* Mobile View Navigation Toggle link */}
            <a href="#products" className="text-xs font-bold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg block md:hidden hover:bg-white/20 transition-all">
              All Items
            </a>
          </div>

          {/* FLIPKART CONTEXT SEARCH SYSTEM BLOCK */}
          <div className="w-full max-w-2xl bg-white rounded-xl flex items-center justify-between overflow-hidden shadow-inner border border-slate-200/20 focus-within:ring-4 focus-within:ring-white/20 transition-all duration-300">
            <div className="w-full [&_input]:w-full [&_input]:px-5 [&_input]:py-3 [&_input]:text-xs sm:[&_input]:text-sm [&_input]:text-slate-900 [&_input]:bg-transparent [&_input]:border-none [&_input]:outline-none [&_input]:placeholder-slate-400">
              <SearchBar />
            </div>
          </div>

          {/* RIGHT SIDE UTILITIES */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide shrink-0">
            <a href="#products" className="hover:text-yellow-400 flex items-center gap-1.5 transition-colors duration-200">
              <FaCompass className="text-sm opacity-90" /> Explore Deals
            </a>
            <div className="flex items-center gap-2 cursor-pointer group bg-white/10 px-4 py-2 rounded-xl hover:bg-white/15 border border-white/5 transition-all duration-200">
              <FaUserCircle className="text-base text-white/90" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] text-blue-100/80 font-normal">Welcome, Sign In</span>
                <span className="text-white font-bold mt-0.5">Account Hub</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* HORIZONTAL CATEGORY NAVIGATION STRIP */}
      <nav className="w-full bg-white border-b border-slate-200/80 shadow-sm overflow-x-auto scrollbar-none sticky top-[116px] md:top-[69px] z-20">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-start lg:justify-center min-w-max">
          <div className="w-full [&_ul]:flex [&_ul]:items-center [&_ul]:gap-6 sm:[&_ul]:gap-10 md:[&_ul]:gap-12 [&_li]:cursor-pointer [&_button]:border-none [&_button]:bg-transparent [&_button]:p-0 [&_span]:text-xs [&_span]:font-bold [&_span]:text-slate-600 hover:[&_span]:text-blue-600 [&_span]:transition-colors [&_span]:tracking-wide">
            <CategoryFilter />
          </div>
        </div>
      </nav>

      {/* CORE CONTENT LAYOUT */}
      <main className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-20 pt-4 space-y-6">
        
        {/* PREMIUM RETAIL BANNER HERO CONTEXT */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20 border border-slate-200/60 shadow-md shadow-slate-100 grid grid-cols-1 md:grid-cols-12 items-center min-h-[260px] sm:min-h-[320px] transition-all duration-300">
          <div className="md:col-span-7 p-6 sm:p-10 md:p-12 space-y-4 text-left z-10">
            <div className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm shadow-rose-500/10 animate-pulse">
              <FaRegClock className="text-[9px]" /> Deal Of The Day
            </div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Premium Electronic Systems <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Up to 50% Off Instant Savings</span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-xl leading-relaxed hidden sm:block">
              Upgrade your setup with high-performance computing components, cutting-edge peripherals, and certified hardware tech with authentic fulfillment guarantees.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={heroProduct ? `/products/${heroProduct._id}` : "/"} className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all duration-200 active:scale-[0.98]">
                Shop Deal
              </a>
              <a href="#products" className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm transition-all duration-200 active:scale-[0.98]">
                View All
              </a>
            </div>
          </div>

          <div className="md:col-span-5 w-full h-full p-6 flex items-center justify-center bg-white/40 backdrop-blur-sm border-t md:border-t-0 md:border-l border-slate-100">
            <img
              src={heroProduct?.image || placeholderImg}
              alt={heroProduct?.name || "Premium Campaign Visual"}
              className="max-h-[180px] sm:max-h-[250px] object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        </section>

        {/* ECOSYSTEM TRUST METRICS ROW */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { metric: `${products?.length || 0}+ Live Offers`, tag: "Curated Selections", color: "text-blue-600", bg: "bg-blue-50/50", icon: <FaTag /> },
            { metric: "100% Secured", tag: "Payment Protection", color: "text-emerald-600", bg: "bg-emerald-50/50", icon: <FaShieldAlt /> },
            { metric: "Express Shipping", tag: "Fast Local Delivery", color: "text-amber-600", bg: "bg-amber-50/50", icon: <FaTruck /> },
            { metric: "Top Rated Tiers", tag: "Certified Warranties", color: "text-rose-600", bg: "bg-rose-50/50", icon: <FaStar /> },
          ].map((stat, index) => (
            <div key={index} className="bg-white border border-slate-200/70 rounded-xl p-4 flex items-center gap-3.5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 pl-5 sm:pl-6">
              <div className={`text-lg sm:text-xl ${stat.color} ${stat.bg} w-10 h-10 rounded-xl shrink-0 flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className="text-left leading-tight">
                <h3 className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-900">
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
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
            <span className="text-5xl block select-none animate-bounce">ðŸ“¦</span>
            <h3 className="text-base font-bold text-slate-800">No Active Offers Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Our catalog indices are currently updating. Please refresh your browser window to display our incoming product inventory lines.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* SHELF SEGMENT 1: CHOSEN SELECTIONS */}
            <section className="bg-white border border-slate-200/70 rounded-2xl shadow-sm p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="space-y-0.5 text-left">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    Featured Selections 
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md tracking-wide uppercase">Top Offers</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">Handpicked premium products matching rigorous quality matrices.</p>
                </div>
                <a href="#products" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group shrink-0 transition-all">
                  View All <FaChevronRight className="text-[8px] transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {products.slice(0, 8).map((product) => (
                  <div key={product._id} className="transition-all duration-300 hover:translate-y-[-2px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>

            {/* SHELF SEGMENT 2: TOP RATED HOVERS */}
            <section className="bg-white border border-slate-200/70 rounded-2xl shadow-sm p-5 sm:p-6 space-y-5">
              <div className="border-b border-slate-100 pb-3.5 text-left">
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  Top Rated Selections 
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md tracking-wide uppercase">Highly Reviewed</span>
                </h2>
                <p className="text-xs text-slate-400 font-medium">Verified customer-favorite catalog items curated by community star scores.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[...products]
                  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                  .slice(0, 4)
                  .map((product) => (
                    <div key={product._id} className="transition-all duration-300 hover:translate-y-[-2px]">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
            </section>

            {/* SHELF SEGMENT 3: COMPREHENSIVE OVERALL ENGINE */}
            <section id="products" className="bg-white border border-slate-200/70 rounded-2xl shadow-sm p-5 sm:p-6 space-y-5">
              <div className="border-b border-slate-100 pb-3.5 text-left">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Complete Product Catalog</h2>
                <p className="text-xs text-slate-400 font-medium">Examine our overarching, elite marketplace inventory collection list.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {products.map((product) => (
                  <div key={product._id} className="transition-all duration-300 hover:translate-y-[-2px]">
                    <ProductCard product={product} />
                  </div>
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
