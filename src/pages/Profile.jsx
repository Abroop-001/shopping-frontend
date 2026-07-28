import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, Heart, MapPin, Bell, Edit2, Camera, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "address", label: "Address", icon: MapPin },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const { itemCount } = useCart();
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="font-display text-2xl font-bold mb-4">Please sign in</h2>
        <Link to="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-2">
      <div className="container-base py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Avatar Card */}
            <div className="card-base p-6 text-center">
              <div className="relative inline-block mb-4">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover mx-auto" />
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-ink rounded-full flex items-center justify-center text-surface hover:bg-ink-2 transition-colors">
                  <Camera size={13} />
                </button>
              </div>
              <h2 className="font-semibold text-ink text-base">{user.name}</h2>
              <p className="text-xs text-ink-4 mt-1">{user.email}</p>
              <p className="text-xs text-ink-4 mt-0.5">Member since {user.joinedDate}</p>
            </div>

            {/* Stats */}
            <div className="card-base p-5 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Orders", value: 3 },
                { label: "Wishlist", value: wishlistCount },
                { label: "Cart", value: itemCount },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-bold text-xl text-ink">{s.value}</p>
                  <p className="text-xs text-ink-4 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Nav */}
            <div className="card-base overflow-hidden">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors border-b border-surface-4 last:border-0 ${
                    activeTab === id ? "bg-ink text-surface" : "text-ink-2 hover:bg-surface-2"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            <Link to="/orders" className="card-base flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-ink-2 hover:bg-surface-2 transition-colors">
              <Package size={16} /> My Orders
            </Link>
            <button onClick={logout} className="w-full text-left card-base flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              Logout
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="card-base p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg font-bold text-ink">Personal Information</h3>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="btn-outline py-1.5 px-4 text-xs flex items-center gap-1.5"
                  >
                    <Edit2 size={13} /> {editing ? "Cancel" : "Edit"}
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", key: "name" },
                    { label: "Email Address", key: "email" },
                    { label: "Phone Number", key: "phone" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-ink-4 mb-1.5">{label}</label>
                      {editing ? (
                        <input
                          type="text"
                          value={form[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="input-base"
                        />
                      ) : (
                        <p className="text-sm text-ink font-medium">{user[key] || "—"}</p>
                      )}
                    </div>
                  ))}
                </div>
                {editing && (
                  <button className="mt-5 btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2">
                    <Save size={15} /> Save Changes
                  </button>
                )}
              </div>
            )}

            {activeTab === "address" && (
              <div className="card-base p-6">
                <h3 className="font-display text-lg font-bold text-ink mb-6">Saved Addresses</h3>
                <div className="border-2 border-surface-4 rounded-xl p-5 relative">
                  <span className="badge bg-ink text-surface absolute top-4 right-4 text-[10px]">Default</span>
                  <p className="font-semibold text-ink text-sm">{user.name}</p>
                  <p className="text-sm text-ink-3 mt-1">{user.address.line1}</p>
                  <p className="text-sm text-ink-3">{user.address.city}, {user.address.state} — {user.address.pincode}</p>
                  <p className="text-sm text-ink-3">{user.address.country}</p>
                  <p className="text-sm text-ink-3 mt-1">{user.phone}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="btn-outline py-1.5 px-4 text-xs">Edit</button>
                    <button className="text-xs text-red-500 hover:text-red-600 transition-colors">Remove</button>
                  </div>
                </div>
                <button className="mt-4 btn-outline py-2 px-5 text-sm">+ Add New Address</button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="card-base p-6">
                <h3 className="font-display text-lg font-bold text-ink mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: "Order Updates", desc: "Get notified about your order status" },
                    { label: "Promotional Offers", desc: "Deals, discounts and special offers" },
                    { label: "New Arrivals", desc: "Be the first to know about new products" },
                    { label: "Newsletter", desc: "Weekly fitness tips and supplement guides" },
                  ].map((n, i) => (
                    <div key={n.label} className="flex items-center justify-between py-3 border-b border-surface-4 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-ink">{n.label}</p>
                        <p className="text-xs text-ink-4 mt-0.5">{n.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                        <div className="w-10 h-5 bg-surface-4 peer-checked:bg-ink rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all peer-checked:after:translate-x-5" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
