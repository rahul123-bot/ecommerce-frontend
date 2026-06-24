import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { getProducts, getSuggestions } from "../features/products/productSlice";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  // Safely grab backend items
  const suggestions = useSelector((state) => state.products.suggestions) || [];

  // Live suggestions debounce loop - Clean text pass down directly to your Redux parsing slice
  useEffect(() => {
    if (!search || search.trim().length < 2) return;

    const timer = setTimeout(() => {
      // FIX: Passing raw text string down rather than an object layout configuration
      dispatch(getSuggestions(search)); 
    }, 300);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  const executeSearch = (searchTerm = search) => {
    dispatch(
      getProducts({
        search: searchTerm,
        category: "",
      })
    );
  };

  const clearSearch = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSearch("");
    dispatch(getProducts({ search: "", category: "" }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-0">
      <Combobox 
        value="" 
        onChange={(val) => {
          if (val) {
            setSearch(val);
            executeSearch(val);
          }
        }}
      >
        <div className="relative">
          {/* Input container window */}
          <div className="flex items-center bg-white rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:shadow-md transition-all duration-200 h-11">
            <ComboboxInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  executeSearch();
                }
              }}
              placeholder="Search for products, brands and more"
              className="w-full bg-transparent pl-4 pr-16 text-sm text-gray-900 placeholder-gray-500 outline-none h-full"
            />

            {/* Right Interactive Icon Actions */}
            <div className="absolute right-3 top-0 bottom-0 flex items-center gap-3">
              {search && (
                <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600 p-1" type="button">
                  <FaTimes className="w-3.5 h-3.5" />
                </button>
              )}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  executeSearch();
                }} 
                className="text-blue-600 hover:text-blue-700 p-1" 
                type="button"
              >
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Flipkart Premium Recommendation Menu Rendering Window */}
          {search && search.trim().length >= 2 && suggestions.length > 0 && (
            <ComboboxOptions
              anchor="bottom start"
              className="w-[var(--input-width)] bg-white border border-gray-200 shadow-2xl rounded-xl mt-1 max-h-[420px] overflow-y-auto z-[99999] [--anchor-gap:4px]"
            >
              {suggestions.map((item) => (
                <ComboboxOption
                  key={item._id}
                  value={item.name}
                  className="flex items-center gap-4 px-4 py-3 cursor-pointer select-none data-[focus]:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  {/* Image Container block */}
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center p-0.5 flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Information Area info text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate group-data-[focus]:text-blue-600">
                      {item.name}
                    </p>
                    <p className="text-xs font-semibold text-gray-900 mt-0.5">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="text-gray-400">
                    <FaSearch className="w-3 h-3" />
                  </div>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default SearchBar;