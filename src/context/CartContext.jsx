import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      if (res.success && res.cart) {
        const mapped = res.cart.items.map((item) => {
          if (!item.product) return null;
          return {
            id: item.product._id,
            _id: item.product._id,
            name: item.product.name,
            slug: item.product.slug,
            brand: item.product.brand,
            price: item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price,
            originalPrice: item.product.originalPrice,
            image: item.product.images[0] || "",
            quantity: item.quantity,
            stock: item.product.stock
          };
        }).filter(Boolean);
        setItems(mapped);
        setTotalPrice(res.cart.totalPrice);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      const local = localStorage.getItem("fitzone_cart");
      if (local) {
        try {
          setItems(JSON.parse(local));
        } catch (e) {
          setItems([]);
        }
      } else {
        setItems([]);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("fitzone_cart", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const addItem = async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        const res = await api.post("/cart/add", { productId: product._id || product.id, quantity });
        if (res.success) {
          await fetchCart();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id || item.id === product._id);
        if (existing) {
          return prev.map((item) =>
            (item.id === product.id || item.id === product._id)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, {
          id: product.id || product._id,
          _id: product._id || product.id,
          name: product.name,
          slug: product.slug,
          brand: product.brand,
          price: product.price,
          image: product.image || (product.images && product.images[0]) || "",
          quantity,
          stock: product.stock
        }];
      });
    }
  };

  const removeItem = async (id) => {
    if (isAuthenticated) {
      try {
        const res = await api.delete(`/cart/remove/${id}`);
        if (res.success) {
          await fetchCart();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      await removeItem(id);
      return;
    }
    if (isAuthenticated) {
      try {
        const res = await api.put("/cart/update", { productId: id, quantity });
        if (res.success) {
          await fetchCart();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await api.delete("/cart/clear");
        setItems([]);
        setTotalPrice(0);
      } catch (err) {
        console.error(err);
      }
    } else {
      setItems([]);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = isAuthenticated ? totalPrice : items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isInCart = (id) => items.some((item) => item.id === id || item._id === id);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
