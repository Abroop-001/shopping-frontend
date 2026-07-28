import React, { useState } from 'react';
import { Plus, Tag, Trash2 } from 'lucide-react';
import { categories as initialCategories } from '../../data/categories';

export default function AdminCategories() {
  const [categoriesList, setCategoriesList] = useState(initialCategories);
  const [form, setForm] = useState({ name: '', slug: '', description: '', image: '', icon: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCat = {
      id: form.slug,
      name: form.name,
      slug: form.slug,
      description: form.description,
      image: form.image || "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80",
      icon: form.icon || "💪",
      productCount: 0
    };
    setCategoriesList([...categoriesList, newCat]);
    setForm({ name: '', slug: '', description: '', image: '', icon: '' });
    alert("Category created successfully (Simulated)");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategoriesList(categoriesList.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Manage Categories</h1>
        <p className="text-xs text-ink-4 mt-0.5">Organize your shop catalog by adding or adjusting product categories.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Category List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card-base p-6 space-y-4">
            <h2 className="font-semibold text-ink flex items-center gap-1.5">
              <Tag size={16} /> Shop Catalog Categories
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {categoriesList.map((cat) => (
                <div key={cat.id} className="border border-surface-4 rounded-xl overflow-hidden hover:border-ink-5 transition-colors">
                  <div className="relative aspect-video bg-surface-2 overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-dark/40" />
                    <span className="absolute bottom-2.5 left-3 text-xl bg-surface/90 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                      {cat.icon}
                    </span>
                  </div>
                  <div className="p-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-sm text-ink">{cat.name}</h3>
                      <p className="text-[10px] text-ink-4 mt-0.5 line-clamp-1">{cat.description}</p>
                      <p className="text-[10px] font-medium text-ink-3 mt-2">{cat.productCount} active items</p>
                    </div>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="w-7 h-7 rounded-lg border border-surface-4 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 transition-all flex-shrink-0"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="card-base p-6 sticky top-24 space-y-4">
            <h2 className="font-semibold text-ink">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-3 mb-1.5">Category Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="e.g. Mass Gainers"
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-3 mb-1.5">Category Slug</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g. mass-gainers"
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-3 mb-1.5">Icon / Emoji</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="e.g. 💪"
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-3 mb-1.5">Image URL (Optional)</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Paste cover URL"
                  className="input-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-3 mb-1.5">Description</label>
                <textarea
                  required
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Summary of products under this category..."
                  className="input-base resize-none text-xs"
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5">
                <Plus size={14} /> Create Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
