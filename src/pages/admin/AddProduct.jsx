import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { getProductBySlug } from '../../data/products';
import { categories } from '../../data/categories';

export default function AddProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = !!slug;

  const [form, setForm] = useState({
    name: '', brand: '', category: 'protein', price: '', originalPrice: '',
    rating: '4.5', reviewCount: '0', stock: '20', image: '', description: '',
    servings: '', proteinPerServing: '', calories: '', flavor: '', weight: '',
    tags: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const p = getProductBySlug(slug);
      if (p) {
        setForm({
          name: p.name || '',
          brand: p.brand || '',
          category: p.category || 'protein',
          price: p.price?.toString() || '',
          originalPrice: p.originalPrice?.toString() || '',
          rating: p.rating?.toString() || '4.5',
          reviewCount: p.reviewCount?.toString() || '0',
          stock: p.stock?.toString() || '20',
          image: p.image || '',
          description: p.description || '',
          servings: p.specs?.servings?.toString() || '',
          proteinPerServing: p.specs?.proteinPerServing || '',
          calories: p.specs?.calories?.toString() || '',
          flavor: p.specs?.flavor || '',
          weight: p.specs?.weight || '',
          tags: p.tags?.join(', ') || '',
        });
      }
    }
  }, [slug, isEditing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert(isEditing ? "Product updated successfully (Simulated)" : "New product added successfully (Simulated)");
      navigate('/admin/products');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Navigation Header */}
      <div className="flex items-center gap-3">
        <Link to="/admin/products" className="w-8 h-8 rounded-lg border border-surface-4 flex items-center justify-center text-ink-3 hover:text-ink hover:bg-surface-2 transition-all">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="font-display text-xl font-bold text-ink">{isEditing ? "Edit Product" : "Add New Product"}</h1>
          <p className="text-xs text-ink-4 mt-0.5">{isEditing ? "Modify existing inventory details." : "Publish a new product to the storefront."}</p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="card-base p-6 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Product Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-ink-3 mb-1.5">Product Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Gold Standard Whey Protein"
              className="input-base"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-semibold text-ink-3 mb-1.5">Brand</label>
            <input
              type="text"
              name="brand"
              required
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. Optimum Nutrition"
              className="input-base"
            />
          </div>

          {/* Category selection */}
          <div>
            <label className="block text-xs font-semibold text-ink-3 mb-1.5">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input-base"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-ink-3 mb-1.5">Selling Price (₹)</label>
            <input
              type="number"
              name="price"
              required
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 4999"
              className="input-base"
            />
          </div>

          {/* Original Price */}
          <div>
            <label className="block text-xs font-semibold text-ink-3 mb-1.5">Original Market Price (₹)</label>
            <input
              type="number"
              name="originalPrice"
              value={form.originalPrice}
              onChange={handleChange}
              placeholder="e.g. 6499"
              className="input-base"
            />
          </div>

          {/* Initial Stock */}
          <div>
            <label className="block text-xs font-semibold text-ink-3 mb-1.5">Inventory Stock Level</label>
            <input
              type="number"
              name="stock"
              required
              value={form.stock}
              onChange={handleChange}
              placeholder="e.g. 50"
              className="input-base"
            />
          </div>

          {/* Main Image URL */}
          <div>
            <label className="block text-xs font-semibold text-ink-3 mb-1.5">Image URL</label>
            <input
              type="text"
              name="image"
              required
              value={form.image}
              onChange={handleChange}
              placeholder="Paste unsplash or static image path"
              className="input-base"
            />
          </div>
        </div>

        {/* Product description */}
        <div>
          <label className="block text-xs font-semibold text-ink-3 mb-1.5">Description</label>
          <textarea
            name="description"
            rows="4"
            required
            value={form.description}
            onChange={handleChange}
            placeholder="Provide a detailed layout of the product description, benefits, and instructions..."
            className="input-base resize-none"
          ></textarea>
        </div>

        {/* Product specifications */}
        <div className="border-t border-surface-4 pt-6 space-y-4">
          <h3 className="font-semibold text-ink text-sm flex items-center gap-1.5">
            <Sparkles size={16} className="text-accent-dark" /> Product Specifications (Optional)
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-4 mb-1">Servings</label>
              <input type="text" name="servings" value={form.servings} onChange={handleChange} placeholder="e.g. 74" className="input-base text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-4 mb-1">Protein Per Serving</label>
              <input type="text" name="proteinPerServing" value={form.proteinPerServing} onChange={handleChange} placeholder="e.g. 24g" className="input-base text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-4 mb-1">Calories</label>
              <input type="text" name="calories" value={form.calories} onChange={handleChange} placeholder="e.g. 120" className="input-base text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-4 mb-1">Flavor</label>
              <input type="text" name="flavor" value={form.flavor} onChange={handleChange} placeholder="e.g. Double Rich Chocolate" className="input-base text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-4 mb-1">Weight</label>
              <input type="text" name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 2.27kg" className="input-base text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-4 mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. whey, recovery, bulk" className="input-base text-xs" />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-surface-4">
          <Link to="/admin/products" className="btn-outline py-2.5 px-6 rounded-xl text-xs font-semibold">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary py-2.5 px-8 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            {saving ? (
              <>Saving...</>
            ) : (
              <><Save size={14} /> {isEditing ? "Update Product" : "Publish Product"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
