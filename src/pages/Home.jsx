import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ addToCart, cart, setIsCartOpen }) {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Check if user is logged in
  const userName = localStorage.getItem("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthChecked(true); 
    }
  }, [navigate]);


  if (!isAuthChecked) return null;

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  const dishes = [
    {
      id: 1,
      name: "Butter Chicken",
      desc: "Rich tomato-based curry with tender chicken.",
      price: 299,
      img: "https://i.pinimg.com/1200x/82/5c/01/825c01786eead0aa450390265a1a704a.jpg",
    },
    {
      id: 2,
      name: "Paneer Tikka",
      desc: "Grilled paneer cubes with spicy marination.",
      price: 249,
      img: "https://i.pinimg.com/736x/61/c6/5d/61c65dd404656dd6e126739732de522e.jpg",
    },
    {
      id: 3,
      name: "Biryani",
      desc: "Aromatic basmati rice cooked with flavorful spices.",
      price: 199,
      img: "https://i.pinimg.com/736x/ca/bf/cc/cabfcc101fa6f6d99b3c07e9997f7c47.jpg",
    },
    {
      id: 4,
      name: "Masala Dosa",
      desc: "Crispy dosa stuffed with spiced potato filling.",
      price: 149,
      img: "https://i.pinimg.com/736x/76/98/c3/7698c35478a01b3a90075c9af7388e5e.jpg",
    },
    {
      id: 5,
      name: "Pav Bhaji",
      desc: "Spicy mashed vegetables served with buttered pav.",
      price: 129,
      img: "https://i.pinimg.com/736x/10/d7/48/10d7485fa9bac4a6f1b85d9f47407ac4.jpg",
    },
    {
      id: 6,
      name: "Chole Bhature",
      desc: "Tangy chickpeas curry with fluffy bhature.",
      price: 159,
      img: "https://i.pinimg.com/736x/33/78/b9/3378b99fdb71d83ccd2204fe4d7fdcb8.jpg",
    },
    {
      id: 7,
      name: "Momos",
      desc: "Steamed dumplings served with spicy chutney.",
      price: 99,
      img: "https://i.pinimg.com/736x/e8/35/ed/e835ed89023c2a6d2d1933321d59efc4.jpg",
    },
    {
      id: 8,
      name: "Rajma Chawal",
      desc: "Red kidney beans curry with steamed rice.",
      price: 149,
      img: "https://i.pinimg.com/736x/c4/51/89/c45189825c235214ab860d8ef15dbf02.jpg",
    },
  ];

  return (
    <div className="font-sans text-[#293132]">
      {/* Header with Logout and Cart */}
      <header className="flex justify-between items-center p-6 bg-[#FFF7E6] sticky top-0 z-50">
        <h2 className="text-2xl font-bold text-[#FF9B00]">
          Welcome, {userName || "Guest"}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-[#FF9B00] text-white px-4 py-2 rounded hover:bg-[#e08600] transition-colors"
          >
            🛒 Cart ({cart.length})
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#FF9B00] text-white px-4 py-2 rounded hover:bg-[#e08600] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Landing Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/03/a3/70/03a370a93b429a30451122ab436f25a2.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative z-10 px-6 md:px-20">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-[#FFF0BD]">
            Taste the <span className="text-[#FF9B00]">Flavors</span>
            <br /> Delivered Fresh
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#FFF0BD]">
            Authentic Indian dishes crafted to perfection, bringing joy to every
            bite.
          </p>
          <a
            href="#menu"
            className="bg-[#FF9B00] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#e08600] hover:shadow-[#FF9B00]/40 hover:scale-105 transition-all duration-300"
          >
            Order Now 🍴
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 px-6 md:px-20 bg-[#FFF7E6]">
        <h2 className="text-4xl font-bold text-center text-[#FF9B00] mb-10">
          Our Authentic Indian Menu
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-[#FF9B00]/20"
            >
              <img
                src={dish.img}
                alt={dish.name}
                className="w-28 h-28 mx-auto mt-6 rounded-xl shadow-md"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2 text-[#FF9B00]">
                  {dish.name}
                </h3>
                <p className="text-[#293132] mb-3">{dish.desc}</p>
                <p className="font-bold text-[#FF9B00] mb-3">₹{dish.price}</p>
                <button
                  onClick={() => addToCart(dish)}
                  className="bg-[#FF9B00] text-white px-5 py-2 rounded-lg hover:bg-[#e08600] transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#FFF7E6] py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl font-bold text-[#FF9B00] mb-4">
              About Foodify
            </h2>
            <p className="text-[#293132] text-lg mb-4">
              Foodify brings vibrant Indian flavors to your home, crafted with
              love and premium ingredients.
            </p>
            <p className="text-[#293132] text-md mb-6">
              Experience restaurant-quality meals with fast delivery and
              unmatched taste. Every dish is a celebration of flavor!
            </p>
            <a
              href="#menu"
              className="inline-block bg-[#FF9B00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e08600] transition-all"
            >
              Order Now
            </a>
          </div>

          <div className="md:w-1/3 flex justify-center">
            <img
              src="https://i.pinimg.com/736x/0b/bb/e8/0bbbe8435a1373f6564377a6059cb710.jpg"
              alt="About Foodify"
              className="w-72 h-auto md:w-80 lg:w-96 mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FF9B00] text-white py-8 text-center">
        <p className="text-sm">© 2025 Foodify. All Rights Reserved.</p>
        <p className="text-xs mt-1">Made with ❤️ by Team Foodify</p>
      </footer>
    </div>
  );
}
