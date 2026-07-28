import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Banner */}
      <div className="bg-dark py-16 text-center">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Support</p>
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-surface">Contact Us</h1>
        <p className="text-ink-4 mt-4 max-w-md mx-auto">
          Have a question about our products, orders, or sizing? Our support team is here to help you.
        </p>
      </div>

      <div className="container-base py-16">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink mb-6">Get in Touch</h2>
              <p className="text-ink-3 text-sm leading-relaxed mb-6">
                Feel free to contact us via email, phone, or by visiting our retail flagship store. We aim to respond to all inquiries within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, title: "Phone", details: "+91 98765 43210", desc: "Monday – Sunday, 9am – 9pm" },
                { icon: Mail, title: "Email Support", details: "support@fitzonepro.com", desc: "For general or sales inquiries" },
                { icon: MapPin, title: "Flagship Retail Store", details: "42, Sector 15, Chandigarh, India", desc: "Pin: 160015" },
              ].map(({ icon: Icon, title, details, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-surface-2 border border-surface-4 rounded-xl flex items-center justify-center text-ink flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{title}</h3>
                    <p className="text-sm font-medium text-ink-2 mt-1">{details}</p>
                    <p className="text-xs text-ink-4 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Chat Prompt */}
            <div className="bg-surface-2 p-5 rounded-2xl border border-surface-4 text-center sm:text-left">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></span>
              <span className="text-xs font-semibold text-green-700">Live Chat Available</span>
              <p className="text-xs text-ink-4 mt-2">Chat with a wellness specialist now for personalized advice.</p>
              <button className="btn-primary w-full py-2 text-xs rounded-xl mt-4">Start Chat</button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card-base p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-ink mb-6">Send Us a Message</h2>

              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">Message sent successfully!</p>
                    <p className="text-xs text-green-700 mt-1">Thank you. We will get back to you shortly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-3 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-3 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="input-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-3 mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="input-base"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-3 mb-1.5">Message</label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="input-base resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary py-3.5 px-8 rounded-xl font-semibold justify-center text-sm w-full sm:w-auto"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>Send Message <Send size={15} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
