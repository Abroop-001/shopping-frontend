import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Facebook, ArrowRight } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", to: "/products" },
    { label: "Categories", to: "/categories" },
    { label: "New Arrivals", to: "/products?filter=new" },
    { label: "Best Sellers", to: "/products?filter=bestseller" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Careers", to: "/about" },
    { label: "Press", to: "/about" },
  ],
  Support: [
    { label: "Help Center", to: "/contact" },
    { label: "Track Order", to: "/orders" },
    { label: "Returns", to: "/contact" },
    { label: "Shipping Info", to: "/contact" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-surface">
      {/* Newsletter */}
      <div className="border-b border-dark-4">
        <div className="container-base py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">
                Level up your training.
              </h3>
              <p className="text-ink-4 text-sm">
                Get exclusive deals, training tips, and new arrivals delivered weekly.
              </p>
            </div>
            <form
              className="flex gap-2 w-full lg:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-72 bg-dark-3 border border-dark-4 rounded-lg px-4 py-2.5 text-sm text-surface placeholder:text-ink-4 focus:outline-none focus:border-ink-5 transition-colors"
              />
              <button type="submit" className="btn-accent whitespace-nowrap">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-base py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-ink font-display font-bold text-sm">FZ</span>
              </div>
              <span className="font-display font-bold text-lg text-surface">
                FitZone<span className="text-ink-4 font-normal"> Pro</span>
              </span>
            </Link>
            <p className="text-ink-4 text-sm leading-relaxed mb-6 max-w-xs">
              Premium fitness supplements, apparel, and equipment for athletes who refuse to settle for ordinary.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-dark-3 flex items-center justify-center text-ink-4 hover:text-surface hover:bg-dark-4 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-surface text-sm font-semibold mb-4">{group}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-ink-4 text-sm hover:text-surface transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-4">
        <div className="container-base py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-4 text-xs">
            © {new Date().getFullYear()} FitZone Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-ink-4 text-xs hover:text-surface transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
