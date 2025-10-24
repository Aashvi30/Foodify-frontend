import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const addToCart = (dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...dish, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (dish) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteItem = (dish) => {
    setCart((prev) => prev.filter((item) => item.id !== dish.id));
  };

  const cancelOrder = () => {
    setCart([]);
    toast.info("Order cancelled.", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
      style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
    });
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
      });
      return;
    }

    setIsPlacingOrder(true);

    setTimeout(() => {
      setIsPlacingOrder(false);
      setCart([]);
      setIsCartOpen(false);
      toast.success("Order has been placed successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        style: { backgroundColor: "#FF9B00", color: "#fffdfd" },
      });
    }, 2000);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Custom component to render Cart button **only on Home page**
  const CartButtonWrapper = () => {
    const location = useLocation();
    if (location.pathname !== "/" || cart.length === 0) return null;
    return (
      <button
        className="fixed top-4 right-4 bg-[#FF9B00] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#e68a00] z-50 transition-colors"
        onClick={() => setIsCartOpen(true)}
      >
        🛒 Cart ({cart.length})
      </button>
    );
  };

  return (
    <Router>
      <ToastContainer />

      <CartButtonWrapper />

      {/* Cart Popup */}
      {isCartOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50">
          <div className="bg-[#fffdfd] rounded-xl w-96 max-h-[80vh] overflow-y-auto p-6 relative shadow-2xl border-2 border-[#FF9B00]">
            <button
              className="absolute top-3 right-3 text-[#FF9B00] hover:text-[#e08600] font-bold text-lg"
              onClick={() => setIsCartOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#FF9B00]">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-[#FF9B00]/30 pb-2"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 ml-4 flex flex-col justify-between">
                      <span className="font-semibold text-[#FF9B00]">{item.name}</span>
                      <span className="text-[#FF9B00]">₹{item.price}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => removeFromCart(item)}
                          className="bg-[#FF9B00]/20 text-[#FF9B00] px-2 rounded hover:bg-[#FF9B00]/40 transition-colors"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-[#FF9B00]/20 text-[#FF9B00] px-2 rounded hover:bg-[#FF9B00]/40 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => deleteItem(item)}
                          className="text-[#FF9B00] px-2 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <span className="font-semibold ml-2 text-[#FF9B00]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}

                <div className="mt-4 font-bold text-lg flex justify-between text-[#FF9B00]">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={placeOrder}
                    disabled={isPlacingOrder}
                    className={`flex-1 bg-[#FF9B00] text-white px-4 py-2 rounded-lg hover:bg-[#e08600] transition-colors ${
                      isPlacingOrder ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isPlacingOrder ? "Placing..." : "Place Order"}
                  </button>

                  <button
                    onClick={cancelOrder}
                    className="flex-1 bg-gray-200 text-[#FF9B00] px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

     <Routes>
  <Route
    path="/"
    element={
      <Home
        addToCart={addToCart}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />
    }
  />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

    </Router>
  );
}
