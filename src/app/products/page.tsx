"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = mockProducts.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['ALL', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const exportCSV = () => {
    if (!filtered.length) return;
    const headers = ["ID", "Producto", "Categoría", "Stock", "Precio", "Stock Mínimo"];
    const rows = filtered.map((p: Product) => [
      p.id, p.name, p.category, p.stock.toString(), p.price.toFixed(2), p.minStock.toString()
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "productos.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStockColor = (product: Product) => {
    if (product.stock <= product.minStock) return "from-red-500 to-pink-500";
    if (product.stock <= product.minStock * 2) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-500";
  };

  const getStockIcon = (product: Product) => {
    if (product.stock <= product.minStock) return "🔴";
    if (product.stock <= product.minStock * 2) return "🟡";
    return "🟢";
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Granos': '🌾',
      'Aceites': '🫒',
      'Lácteos': '🥛',
      'Endulzantes': '🍯',
      'Pastas': '🍝',
      'Bebidas': '🥤',
      'Carnes': '🥩',
      'Verduras': '🥬',
      'Enlatados': '🥫',
    };
    return icons[category] || '📦';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg border-b border-white/20 mb-8"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              📦
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gestión de Productos
              </h1>
              <p className="text-gray-600 mt-1">Administra tu inventario completo</p>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  📦
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{filtered.length}</div>
                  <div className="text-sm text-gray-600">Total Productos</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  📊
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {filtered.reduce((sum, p) => sum + p.stock, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Stock Total</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  ⚠️
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {filtered.filter(p => p.stock <= p.minStock).length}
                  </div>
                  <div className="text-sm text-gray-600">Stock Bajo</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  🏷️
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {categories.length - 1}
                  </div>
                  <div className="text-sm text-gray-600">Categorías</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6">
        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all w-full sm:w-80"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                aria-label="Filtro de categoría"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'ALL' ? 'Todas las categorías' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
              >
                {viewMode === "grid" ? "📋 Lista" : "🔲 Cuadrícula"}
              </button>
              
              <button
                onClick={exportCSV}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-medium"
              >
                📥 Exportar CSV
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getStockColor(product)} flex items-center justify-center text-2xl shadow-lg`}>
                    {getCategoryIcon(product.category)}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-2xl">{getStockIcon(product)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.stock <= product.minStock ? 'bg-red-100 text-red-800' :
                      product.stock <= product.minStock * 2 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Precio</span>
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Categoría</span>
                    <span className="text-sm font-medium text-gray-700">{product.category}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Proveedor</span>
                    <span className="text-sm font-medium text-gray-700">{product.supplier}</span>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium">
                      ✏️ Editar
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all text-sm">
                      📊
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Producto</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Categoría</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-700">Precio</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">Stock</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Proveedor</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product, i) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getStockColor(product)} flex items-center justify-center text-lg`}>
                            {getCategoryIcon(product.category)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-700">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-green-600">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg">{getStockIcon(product)}</span>
                          <span className="font-semibold">{product.stock}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {product.supplier}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.stock <= product.minStock ? 'bg-red-100 text-red-800' :
                          product.stock <= product.minStock * 2 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {product.stock <= product.minStock ? 'Crítico' :
                           product.stock <= product.minStock * 2 ? 'Bajo' : 'Normal'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            ✏️
                          </button>
                          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                            📊
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta cambiar los filtros de búsqueda</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
