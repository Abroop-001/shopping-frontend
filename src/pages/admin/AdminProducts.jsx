import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { products as initialProducts } from '../../data/products';
import { formatPrice } from '../../utils/helpers';

export default function AdminProducts() {
  const [productsList, setProductsList] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProductsList(productsList.filter(p => p.id !== id));
    }
  };

  const filteredProducts = productsList.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Manage Products</h1>
          <p className="text-xs text-ink-4 mt-0.5">Add, edit, or delete items from the storefront inventory.</p>
        </div>
        <Link to="/admin/products/add" className="btn-primary py-2.5 px-5 rounded-xl text-xs font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <Plus size={15} /> Add New Product
        </Link>
      </div>

      {/* Filter and Search controls */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products by name, brand, or category..."
            className="input-base pl-10 py-2.5 text-xs"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-4" />
        </div>
      </div>

      {/* Products Table Card */}
      <div className="card-base">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2 border-b border-surface-4 text-xs font-semibold text-ink-4 uppercase">
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Price</th>
                <th className="py-3.5 px-6">Stock Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-4 text-ink-2">
              {paginatedProducts.map((p) => {
                const isOutOfStock = p.stock === 0;
                const isLowStock = p.stock > 0 && p.stock <= 10;
                return (
                  <tr key={p.id} className="hover:bg-surface-2/50 transition-colors">
                    {/* Product Name & Brand */}
                    <td className="py-3.5 px-6 flex items-center gap-3.5">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-surface-2 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-ink truncate max-w-xs">{p.name}</p>
                        <p className="text-[10px] text-ink-4">{p.brand}</p>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="py-3.5 px-6 text-xs capitalize">{p.category}</td>
                    {/* Price */}
                    <td className="py-3.5 px-6 text-xs font-semibold text-ink">{formatPrice(p.price)}</td>
                    {/* Stock level status */}
                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isOutOfStock ? "bg-red-50 text-red-700" :
                        isLowStock ? "bg-amber-50 text-amber-700" :
                        "bg-green-50 text-green-700"
                      }`}>
                        {isOutOfStock ? (
                          <>Out of Stock</>
                        ) : isLowStock ? (
                          <><AlertCircle size={10} /> Low Stock ({p.stock})</>
                        ) : (
                          <>In Stock ({p.stock})</>
                        )}
                      </span>
                    </td>
                    {/* Action buttons */}
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/products/edit/${p.slug}`}
                          className="w-8 h-8 rounded-lg border border-surface-4 flex items-center justify-center text-ink-3 hover:text-ink hover:bg-surface-2 transition-all"
                        >
                          <Edit2 size={13} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="w-8 h-8 rounded-lg border border-surface-4 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-xs text-ink-4">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-surface-4 flex items-center justify-between gap-4">
            <span className="text-xs text-ink-4">
              Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="w-8 h-8 border border-surface-4 rounded-lg flex items-center justify-center text-ink-3 hover:bg-surface-2 disabled:opacity-40 transition-all"
              >
                <ChevronLeft size={15} />
              </button>
              <span className="text-xs font-semibold text-ink px-3">{page} / {totalPages}</span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="w-8 h-8 border border-surface-4 rounded-lg flex items-center justify-center text-ink-3 hover:bg-surface-2 disabled:opacity-40 transition-all"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
