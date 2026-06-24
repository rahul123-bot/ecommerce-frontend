import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../features/products/productSlice";
import { 
  FaThLarge, 
  FaLaptop, 
  FaTshirt, 
  FaRunning, 
  FaHome, 
  FaBriefcase, 
  FaHeartbeat, 
  FaGamepad, 
  FaCar, 
  FaEllipsisH, 
  FaShoppingBasket
} from "react-icons/fa";
const CategoryFilter = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("");

  // Categories bundled with matching visual icons for a premium UI look
  const categories = [
    { name: "All", value: "", icon: FaThLarge },
    { name: "Electronics", value: "Electronics", icon: FaLaptop },
    { name: "Apparel", value: "Apparel", icon: FaTshirt },
    { name: "Footwear & Fitness", value: "Fitness", icon: FaRunning },
    { name: "Home Decor", value: "Home Decor", icon: FaHome },
    { name: "Office", value: "Office Equipment", icon: FaBriefcase },
    { name: "Health & Beauty", value: "Beauty", icon: FaHeartbeat },
    { name: "Toys & Gaming", value: "Toys", icon: FaGamepad },
    { name: "Automotive", value: "Automotive", icon: FaCar },
    { name: "Groceries", value: "Groceries", icon: FaShoppingBasket },
    { name: "Others", value: "Others", icon: FaEllipsisH }
  ];

  const handleCategoryClick = (value) => {
    setActiveCategory(value);
    dispatch(
      getProducts({
        search: "",
        category: value,
      })
    );
  };

  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-sm mb-6 sticky top-[56px] sm:top-[64px] z-40 left-0">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* HORIZONTAL SCROLLABLE BAR (Matches Amazon/Flipkart mobile & desktop strips) */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-3 scroll-smooth snap-x">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.value;

            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.value)}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer snap-shrink-0 select-none border
                  ${isActive
                    ? "bg-[#2874f0] text-white border-[#2874f0] shadow-sm"
                    : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
              >
                <Icon className={`text-sm ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Global CSS injection to hide ugly scrollbars while keeping touch-swipe behavior functional */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default React.memo(CategoryFilter);