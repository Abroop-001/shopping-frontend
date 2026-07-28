import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, Package } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-surface/95 glass shadow-sm border-b border-surface-4" : "bg-surface"
        }`}
      >
        <div className="container-base">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
                <span className="text-accent font-display font-bold text-sm">FZ</span>
              </div>
              <span className="font-display font-bold text-lg text-ink hidden sm:block">
                FitZone<span className="text-ink-4 font-normal"> Pro</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive ? "bg-surface-2 text-ink" : "text-ink-3 hover:text-ink hover:bg-surface-2"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2 animate-slideDown">
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      autoFocus
                      className="w-48 sm:w-64 input-base py-1.5 text-sm"
                    />
                    <button type="button" onClick={() => setSearchOpen(false)} className="btn-icon text-ink-3">
                      <X size={18} />
                    </button>
                  </form>
                ) : (
                  <button onClick={() => setSearchOpen(true)} className="btn-icon text-ink-3 hover:text-ink">
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="btn-icon relative text-ink-3 hover:text-ink hidden sm:flex">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-ink text-surface text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="btn-icon relative text-ink-3 hover:text-ink">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="btn-icon text-ink-3 hover:text-ink hidden sm:flex"
                >
                  {user ? (
                    user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-ink text-surface flex items-center justify-center font-bold text-xs uppercase">
                        {user.name.charAt(0)}
                      </div>
                    )
                  ) : (
                    <User size={20} />
                  )}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-surface border border-surface-4 rounded-xl shadow-card-hover z-50 animate-slideDown overflow-hidden">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-surface-4">
                          <p className="text-sm font-semibold text-ink truncate">{user.name}</p>
                          <p className="text-xs text-ink-4 truncate">{user.email}</p>
                        </div>
                        <div className="p-1">
                          <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink hover:bg-surface-2 transition-colors">
                            <User size={15} className="text-ink-4" /> My Profile
                          </Link>
                          <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink hover:bg-surface-2 transition-colors">
                            <Package size={15} className="text-ink-4" /> My Orders
                          </Link>
                          <Link to="/wishlist" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink hover:bg-surface-2 transition-colors">
                            <Heart size={15} className="text-ink-4" /> Wishlist
                          </Link>
                          {user.role === "admin" && (
                            <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink hover:bg-surface-2 transition-colors">
                              <Package size={15} className="text-ink-4" /> Admin Dashboard
                            </Link>
                          )}
                        </div>
                        <div className="p-1 border-t border-surface-4">
                          <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-1">
                        <Link to="/login" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink hover:bg-surface-2 transition-colors">
                          Sign In
                        </Link>
                        <Link to="/register" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink hover:bg-surface-2 transition-colors">
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="btn-icon text-ink-3 hover:text-ink lg:hidden ml-1">
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-surface border-t border-surface-4 animate-slideDown">
            <nav className="container-base py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? "bg-surface-2 text-ink" : "text-ink-2 hover:bg-surface-2"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="divider my-2" />
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-ink-2 hover:bg-surface-2 transition-colors">My Profile</Link>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-ink-2 hover:bg-surface-2 transition-colors">My Orders</Link>
                  <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-ink-2 hover:bg-surface-2 transition-colors">Wishlist ({wishlistCount})</Link>
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 text-left transition-colors">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-ink-2 hover:bg-surface-2 transition-colors">Sign In</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm text-ink-2 hover:bg-surface-2 transition-colors">Create Account</Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
