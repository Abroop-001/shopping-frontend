import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ChevronRight, CreditCard, Truck, MapPin } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";
import api from "../utils/api";

const STEPS = ["Address", "Payment", "Review"];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "", phone: "", email: "", line1: "", line2: "", city: "", state: "", pincode: "",
  });
  const [payMethod, setPayMethod] = useState("cod");

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!address.fullName || !address.line1 || !address.city || !address.state || !address.pincode || !address.phone) {
      alert("Please complete the shipping address fields.");
      setStep(0);
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        shippingAddress: {
          fullName: address.fullName,
          address: address.line1 + (address.line2 ? ", " + address.line2 : ""),
          city: address.city,
          state: address.state,
          postalCode: address.pincode,
          phone: address.phone
        },
        paymentMethod: payMethod === "cod" ? "COD" : "ONLINE"
      };

      const res = await api.post("/orders", orderData);
      if (res.success) {
        setPlaced(true);
        clearCart();
        setTimeout(() => navigate("/orders"), 3000);
      }
    } catch (err) {
      alert(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-display text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check size={36} className="text-green-600" />
        </div>
        <h2 className="font-display text-3xl font-bold text-ink mb-3">Order Placed!</h2>
        <p className="text-ink-4 mb-2">Thank you for shopping with FitZone Pro.</p>
        <p className="text-ink-4 text-sm mb-8">
          Your order has been received and is being processed. Redirecting to orders...
        </p>
        <div className="w-48 h-1 bg-surface-3 rounded-full overflow-hidden">
          <div className="h-full bg-ink rounded-full" style={{ width: "100%", transition: "width 3s linear" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-2">
      <div className="container-base py-10">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < step ? "bg-ink text-surface" : i === step ? "bg-ink text-surface" : "bg-surface-3 text-ink-4"
              }`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === step ? "text-ink" : "text-ink-4"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`w-8 sm:w-16 h-px ${i < step ? "bg-ink" : "bg-surface-4"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Step Content */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="card-base p-6 space-y-4 animate-fadeIn">
                <h2 className="font-semibold text-ink flex items-center gap-2">
                  <MapPin size={17} className="text-ink-4" /> Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: "fullName", label: "Full Name", span: 1 },
                    { key: "phone", label: "Phone Number", span: 1 },
                    { key: "email", label: "Email Address", span: 2 },
                    { key: "line1", label: "Address Line 1", span: 2 },
                    { key: "line2", label: "Address Line 2 (Optional)", span: 2 },
                    { key: "city", label: "City", span: 1 },
                    { key: "state", label: "State", span: 1 },
                    { key: "pincode", label: "PIN Code", span: 1 },
                  ].map(({ key, label, span }) => (
                    <div key={key} className={span === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-medium text-ink-3 mb-1.5">{label}</label>
                      <input
                        type="text"
                        value={address[key]}
                        onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                        className="input-base"
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="btn-primary py-3 px-8 rounded-xl mt-2 flex items-center gap-1">
                  Continue to Payment <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="card-base p-6 animate-fadeIn">
                <h2 className="font-semibold text-ink flex items-center gap-2 mb-5">
                  <CreditCard size={17} className="text-ink-4" /> Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: "💵" },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: "💳" },
                    { id: "upi", label: "UPI / Net Banking", desc: "PhonePe, GPay, Paytm", icon: "📱" },
                  ].map(({ id, label, desc, icon }) => (
                    <label
                      key={id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        payMethod === id ? "border-ink bg-surface-2" : "border-surface-4 hover:border-ink-5"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={payMethod === id}
                        onChange={() => setPayMethod(id)}
                        className="accent-ink"
                      />
                      <span className="text-lg">{icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{label}</p>
                        <p className="text-xs text-ink-4">{desc}</p>
                      </div>
                      {payMethod === id && (
                        <div className="ml-auto w-5 h-5 bg-ink rounded-full flex items-center justify-center">
                          <Check size={11} className="text-surface" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
                {payMethod === "card" && (
                  <div className="mt-5 p-4 bg-surface-2 rounded-xl space-y-3">
                    <input type="text" placeholder="Card Number" className="input-base" maxLength={19} />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM / YY" className="input-base" />
                      <input type="text" placeholder="CVV" className="input-base" />
                    </div>
                    <input type="text" placeholder="Name on Card" className="input-base" />
                  </div>
                )}
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setStep(0)} className="btn-outline py-3 px-6 rounded-xl">
                    Back
                  </button>
                  <button onClick={() => setStep(2)} className="btn-primary py-3 px-8 rounded-xl flex-1 flex items-center justify-center gap-1">
                    Review Order <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card-base p-6 animate-fadeIn space-y-5">
                <h2 className="font-semibold text-ink">Review Your Order</h2>
                {/* Address Summary */}
                <div className="bg-surface-2 rounded-xl p-4 text-sm text-ink-2">
                  <p className="font-medium text-ink mb-1">Shipping to:</p>
                  <p>{address.fullName || "Your Name"}, {address.phone || "+91 XXXXXXXXXX"}</p>
                  <p>{address.line1 || "Address Line 1"}{address.line2 ? ", " + address.line2 : ""}</p>
                  <p>{address.city || "City"}, {address.state || "State"} — {address.pincode || "XXXXXX"}</p>
                </div>
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-surface-2" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                        <p className="text-xs text-ink-4">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-ink">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(1)} className="btn-outline py-3 px-6 rounded-xl">
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="btn-accent py-3 px-8 rounded-xl flex-1 font-bold flex items-center justify-center gap-2"
                  >
                    {loading ? "Placing Order..." : `Place Order — ${formatPrice(total)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="card-base p-5">
              <h3 className="font-semibold text-ink mb-4">Summary</h3>
              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-ink-3">
                    <span className="truncate mr-2">{item.name} ×{item.quantity}</span>
                    <span className="font-medium text-ink flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="divider my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-ink-3">
                  <span>Subtotal</span>
                  <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-3">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="divider my-4" />
              <div className="flex justify-between font-bold text-ink">
                <span>Total</span>
                <span className="text-lg">{formatPrice(total)}</span>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-ink-4 bg-surface-2 rounded-lg px-3 py-2">
                <Truck size={13} />
                Estimated delivery: 3–5 business days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
