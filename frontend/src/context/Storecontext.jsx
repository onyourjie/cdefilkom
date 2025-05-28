import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);
  const [foodList, setFoodList] = useState([]); 

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = foodList.find((p) => p._id == item);
        if (product) total += product.price * cartItems[item];
      }
    }
    return total;
  };

  const resetCart = () => {
    setCartItems({});
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://cdefilkom.up.railway.app/products");
        const data = await res.json();

        const formatted = data.map((item) => ({
          _id: item.id, 
          name: item.nama,
          price: item.harga,
          image: item.gambarUrl,
          description: item.jenis, 
          category: item.jenis,
        }));

        setFoodList(formatted);
      } catch (error) {
        console.error("❌ Gagal ambil produk dari backend:", error);
      }
    };

    fetchProducts();
  }, []);

  const contextValue = {
    food_list: foodList, 
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    resetCart,
    user,
    setUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
