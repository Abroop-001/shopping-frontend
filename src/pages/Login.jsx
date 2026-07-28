import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.success) navigate("/");
    else setError("Invalid credentials. Please try again.");
  };

  return (
    <div className="min-h-screen bg-surface-2 flex">
      {/* Left – Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
          alt="Gym"
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
            Train harder.<br />Recover smarter.
          </h2>
          <p className="text-ink-4 max-w-sm">
            Access exclusive deals, track your orders, and manage your fitness journey all in one place.
          </p>
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

          <h1 className="font-display text-3xl font-bold text-ink mb-2">Welcome back</h1>
          <p className="text-ink-4 mb-8">Sign in to your account to continue.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-3 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="input-base"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-ink-3">Password</label>
                <a href="#" className="text-xs text-ink-3 hover:text-ink transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input-base pr-10"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-4 hover:text-ink transition-colors">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3.5 rounded-xl font-semibold mt-2 justify-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ink-4 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-ink font-medium hover:underline">
              Create one
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-6 p-3 bg-surface-2 rounded-lg border border-surface-4 text-xs text-ink-4 text-center">
            Demo: any email + any password will work
          </div>
        </div>
      </div>
    </div>
  );
}
