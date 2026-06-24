import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeFromCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FaTrashAlt, FaLock, FaChevronRight } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <Loader />
      </div>
    );
  }

  const totalItems =
    cart?.items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  const totalPrice =
    cart?.items?.reduce(
      (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
      0
    ) || 0;

  // Handles safe redirection bypassing technical route parameters
  const handleCheckoutRedirect = () => {
    localStorage.setItem("paymentAmount", totalPrice);
    navigate("/checkout/:id");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans selection:bg-orange-500/20 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Shopping Cart
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              You have <span className="text-orange-600 font-bold">{totalItems}</span> item(s) in your cart
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto text-center px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.99] shadow-sm"
          >
            Continue Shopping
          </button>
        </div>

        {/* EMPTY STATE PATTERN */}
        {!cart?.items?.length ? (
          <div className="max-w-md mx-auto border border-slate-200 rounded-2xl bg-white p-8 sm:p-12 text-center shadow-sm space-y-5 mt-12">
            <div className="text-5xl select-none filter drop-shadow-sm">🛒</div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">Your Cart is Empty</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Add items to your cart to explore special deals, fast shipping, and secure global payment routes.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/10 text-white transition-all active:scale-[0.99]"
            >
              Shop Today's Deals
            </button>
          </div>
        ) : (
          
          /* CART SPLIT CONTAINER MAPPING */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* ITEMS REPEATER LISTING (Left 2/3 Column) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-sm overflow-hidden">
              {cart.items.map((item) => {
                if (!item.product) return null; // Defensive layer handling orphaned database rows safely
                
                return (
                  <div
                    key={`${item.product._id}-${item.quantity}`}
                    className="p-4 sm:p-5 flex gap-4 items-start justify-between transition-colors hover:bg-slate-50/30 group"
                  >
                    {/* Media Item Wrapper */}
                    <div className="flex gap-4 items-center min-w-0 flex-1">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-white border border-slate-100 p-1 shrink-0 relative flex items-center justify-center shadow-sm">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                        />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="inline-block text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase tracking-wider">
                          {item.product.category || "In Stock"}
                        </span>
                        <h2 className="text-sm sm:text-base font-bold text-slate-800 line-clamp-2 pr-2 hover:text-orange-600 cursor-pointer transition-colors leading-tight">
                          {item.product.name}
                        </h2>
                        
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-400 pt-0.5 font-medium">
                          <p>
                            Price: <span className="text-slate-700 font-semibold">₹{item.product.price?.toLocaleString("en-IN")}</span>
                          </p>
                          <div className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
                          <p className="text-emerald-600 font-bold">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Financial Blocks & Mutators */}
                    <div className="flex flex-col items-end justify-between self-stretch shrink-0 pl-2">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Subtotal</p>
                        <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight mt-0.5">
                          ₹{((item.product.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.product._id))}
                        className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-100 group/btn"
                      >
                        <FaTrashAlt className="text-[10px] text-slate-300 group-hover/btn:text-rose-500 transition-colors" />
                        <span>Delete</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* ORDER VALUATION PANEL (Right 1/3 Column) */}
            <div className="lg:sticky lg:top-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
                
                <h2 className="text-base font-bold text-slate-800 tracking-tight pb-3 border-b border-slate-100">
                  Price Details
                </h2>

                <div className="space-y-3.5 text-xs font-medium">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Price ({totalItems} items)</span>
                    <span className="text-slate-800 font-semibold">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-500">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-500">
                    <span>Estimated Tax</span>
                    <span className="text-slate-800 font-semibold">₹0</span>
                  </div>

                  <hr className="border-slate-100 my-1" />

                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-slate-800 font-bold text-sm">Total Amount</span>
                    <span className="text-xl font-black text-slate-900 tracking-tight">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutRedirect}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl text-sm tracking-wide transition-all active:scale-[0.99] shadow-md shadow-orange-500/10 flex items-center justify-center gap-1.5 group"
                >
                  <span>Proceed to Buy</span>
                  <FaChevronRight className="text-[10px] mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="text-center text-slate-400 text-[10px] font-bold tracking-wider uppercase select-none flex items-center justify-center gap-1.5 pt-1">
                  <FaLock className="text-slate-300" /> Secure Purchase Guarantee
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;