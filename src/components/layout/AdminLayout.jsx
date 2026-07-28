import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, Tag, ShoppingBag, Users, Plus, Home, ChevronRight, X
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Package, label: "Products", to: "/admin/products" },
  { icon: Tag, label: "Categories", to: "/admin/categories" },
  { icon: ShoppingBag, label: "Orders", to: "/admin/orders" },
  { icon: Users, label: "Users", to: "/admin/users" },
];

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-2 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-dark min-h-screen flex flex-col flex-shrink-0 hidden lg:flex">
        <div className="p-5 border-b border-dark-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center">
              <span className="text-ink font-display font-bold text-xs">FZ</span>
            </div>
            <span className="font-display font-bold text-surface text-sm">FitZone Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {sidebarLinks.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-dark-3 text-surface"
                    : "text-ink-4 hover:text-surface hover:bg-dark-3"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
          <div className="pt-3 mt-3 border-t border-dark-4">
            <NavLink
              to="/admin/products/add"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-accent text-ink hover:bg-accent-dark transition-colors"
            >
              <Plus size={17} />
              Add Product
            </NavLink>
          </div>
        </nav>
        <div className="p-4 border-t border-dark-4">
          <Link to="/" className="flex items-center gap-2 text-ink-4 hover:text-surface text-sm transition-colors">
            <Home size={15} />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-surface border-b border-surface-4 flex items-center px-6 gap-3">
          <Breadcrumb />
          <div className="ml-auto flex items-center gap-3">
            <Link to="/" className="text-xs text-ink-3 hover:text-ink transition-colors flex items-center gap-1">
              <Home size={13} /> View Store
            </Link>
          </div>
        </header>
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  return (
    <nav className="flex items-center gap-1 text-xs text-ink-3">
      {paths.map((segment, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={12} />}
          <span className={i === paths.length - 1 ? "text-ink font-medium capitalize" : "capitalize"}>
            {segment}
          </span>
        </span>
      ))}
    </nav>
  );
}
