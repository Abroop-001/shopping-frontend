import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      if (res.success && res.wishlist) {
        const mapped = res.wishlist.items.map((item) => {
          if (!item) return null;
          return {
            id: item._id,
            _id: item._id,
            name: item.name,
            slug: item.slug,
            brand: item.brand,
            price: item.discountPrice > 0 ? item.discountPrice : item.price,
            originalPrice: item.originalPrice,
            image: item.images[0] || "",
            stock: item.stock
          };
        }).filter(Boolean);
        setItems(mapped);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      const local = localStorage.getItem("fitzone_wishlist");
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
      localStorage.setItem("fitzone_wishlist", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const toggle = async (product) => {
    const prodId = product._id || product.id;
    if (isAuthenticated) {
      try {
        const res = await api.post("/wishlist/toggle", { productId: prodId });
        if (res.success) {
          await fetchWishlist();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === prodId);
        if (existing) {
          return prev.filter((item) => item.id !== prodId);
        } else {
          return [...prev, {
            id: prodId,
            _id: prodId,
            name: product.name,
            slug: product.slug,
            brand: product.brand,
            price: product.price,
            image: product.image || (product.images && product.images[0]) || "",
            stock: product.stock
          }];
        }
      });
    }
  };

  const isWishlisted = (id) => items.some((item) => item.id === id || item._id === id);

  const removeItem = async (id) => {
    if (isAuthenticated) {
      try {
        const res = await api.post("/wishlist/toggle", { productId: id });
        if (res.success) {
          await fetchWishlist();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, removeItem, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
