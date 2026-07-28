import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    const result = await register(form);
    if (result.success) navigate("/");
    else setError(result.message || "Registration failed. Please try again.");
  };

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ["", "bg-red-400", "bg-amber-400", "bg-green-500"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div className="min-h-screen bg-surface-2 flex">
      {/* Left – Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=1200&q=80"
          alt="Fitness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-ink font-display font-bold text-sm">FZ</span>
            </div>
            <span className="font-display font-bold text-xl text-surface">FitZone Pro</span>
          </div>
          <h2 className="font-display text-4xl font-bold text-surface mb-4">
            Start your<br />fitness journey.
          </h2>
          <p className="text-ink-4 max-w-sm">
            Join 50,000+ athletes who trust FitZone Pro for their fitness needs.
          </p>
          <div className="mt-6 space-y-2">
            {["Free delivery over ₹999", "Exclusive member discounts", "Early access to new products"].map((b) => (
              <div key={b} className="flex items-center gap-2 text-surface text-sm">
                <Check size={14} className="text-accent" />{b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center">
              <span className="text-accent font-display font-bold text-xs">FZ</span>
            </div>
            <span className="font-display font-bold text-ink">FitZone Pro</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-ink mb-2">Create account</h1>
          <p className="text-ink-4 mb-8">Join thousands of athletes today.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Full Name</label>
              <input name="name" type="text" value={form.name} onChange={handleChange} required placeholder="John Doe" className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="input-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Password</label>
              <div className="relative">
                <input name="password" type={showPwd ? "text" : "password"} value={form.password} onChange={handleChange} required placeholder="Min. 6 characters" className="input-base pr-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-4 hover:text-ink transition-colors">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColors[passwordStrength] : "bg-surface-4"}`} />
                    ))}
                  </div>
                  <p className="text-xs mt-1 text-ink-4">{strengthLabels[passwordStrength]}</p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Confirm Password</label>
              <input name="confirm" type="password" value={form.confirm} onChange={handleChange} required placeholder="Re-enter password" className="input-base" />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5 rounded-xl font-semibold mt-2 justify-center">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ink-4 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-ink font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
