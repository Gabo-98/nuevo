"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { mockMovements } from '@/data/mockData';
import { Movement } from '@/types';

const MovementsPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filtered = mockMovements.filter((movement: Movement) => {
    const matchesSearch = movement.productName.toLowerCase().includes(search.toLowerCase()) ||
      movement.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      movement.reason.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'ALL' || movement.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    return type === 'IN' ? '📈' : '📉';
  };

  const getTypeColor = (type: string) => {
    return type === 'IN' ? 'text-green-600' : 'text-blue-600';
  };

  const getTypeBg = (type: string) => {
    return type === 'IN' ? 'bg-green-100' : 'bg-blue-100';
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              📋
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Movimientos de Stock
              </h1>
              <p className="text-gray-600 mt-1">Historial de entradas y salidas</p>
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
                  📋
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{filtered.length}</div>
                  <div className="text-sm text-gray-600">Total Movimientos</div>
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
                  📈
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {filtered.filter(m => m.type === 'IN').length}
                  </div>
                  <div className="text-sm text-gray-600">Entradas</div>
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
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  📉
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {filtered.filter(m => m.type === 'OUT').length}
                  </div>
                  <div className="text-sm text-gray-600">Salidas</div>
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
                  📦
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {filtered.reduce((sum, m) => sum + m.quantity, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Unidades</div>
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
                  placeholder="Buscar movimientos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all w-full sm:w-80"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                aria-label="Filtro de tipo de movimiento"
              >
                <option value="ALL">Todos los movimientos</option>
                <option value="IN">Solo entradas</option>
                <option value="OUT">Solo salidas</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Movements List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Producto</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Cantidad</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Motivo</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Empleado</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((movement, i) => (
                  <motion.tr
                    key={movement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getTypeBg(movement.type)} w-fit`}>
                        <span className="text-lg">{getTypeIcon(movement.type)}</span>
                        <span className={`font-semibold text-sm ${getTypeColor(movement.type)}`}>
                          {movement.type === 'IN' ? 'Entrada' : 'Salida'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{movement.productName}</div>
                      <div className="text-sm text-gray-600">{movement.productId}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold text-lg ${getTypeColor(movement.type)}`}>
                        {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {movement.reason}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{movement.employeeName}</div>
                      <div className="text-sm text-gray-600">{movement.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(movement.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No se encontraron movimientos</h3>
            <p className="text-gray-500">Intenta cambiar los filtros de búsqueda</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MovementsPage;
