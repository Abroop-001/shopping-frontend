export const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Powerlifter",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
    rating: 5,
    review:
      "FitZone Pro is the only place I shop for all my supplements. The product quality is exceptional and delivery is always on time. Optimum Nutrition Gold Standard is my go-to.",
    product: "Gold Standard Whey",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "CrossFit Athlete",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    review:
      "I've been buying my pre-workout and accessories from FitZone Pro for 2 years now. The selection is unmatched and the prices are very competitive. Highly recommended.",
    product: "Ghost Legend Pre-Workout",
    verified: true,
  },
  {
    id: 3,
    name: "Ravi Kumar",
    role: "Bodybuilder",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    rating: 5,
    review:
      "The Gymshark clothing line here is amazing. Perfect fit, great quality, and looks professional in the gym. The checkout process was smooth and hassle-free.",
    product: "Gymshark Performance Tee",
    verified: true,
  },
  {
    id: 4,
    name: "Anika Singh",
    role: "Yoga Instructor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    rating: 5,
    review:
      "I love the Lululemon leggings available here at better prices. The Manduka yoga mat is also incredible — definitely worth the investment for any serious practitioner.",
    product: "Lululemon Align Leggings",
    verified: true,
  },
  {
    id: 5,
    name: "Dev Kapoor",
    role: "Personal Trainer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    review:
      "As a personal trainer, I recommend FitZone Pro to all my clients. The product authenticity and quality assurance gives everyone confidence. Best fitness store online.",
    product: "Various Products",
    verified: true,
  },
  {
    id: 6,
    name: "Meera Patel",
    role: "Marathon Runner",
    avatar: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=100&q=80",
    rating: 4,
    review:
      "The omega-3 and vitamin D3 I ordered arrived quickly. Great packaging and the products are exactly as described. Will definitely be a repeat customer.",
    product: "Omega-3 Fish Oil",
    verified: true,
  },
];

export const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-12-15",
    status: "Delivered",
    total: 7298,
    items: [
      { name: "Gold Standard Whey Protein", qty: 1, price: 4999 },
      { name: "C4 Original Pre-Workout", qty: 1, price: 2799 },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-12-20",
    status: "Processing",
    total: 4797,
    items: [
      { name: "Creapure Creatine Monohydrate", qty: 1, price: 1799 },
      { name: "Leather Lifting Straps", qty: 1, price: 1299 },
      { name: "BlenderBottle Classic 28oz", qty: 1, price: 999 },
      { name: "Vitamin D3 + K2", qty: 1, price: 999 },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-12-10",
    status: "Shipped",
    total: 6498,
    items: [
      { name: "Adjustable Dumbbell Set", qty: 1, price: 24999 },
    ],
  },
];
