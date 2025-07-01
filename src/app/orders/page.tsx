'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockOrders } from '@/data/mockData';
import type { Order } from '@/types';
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CogIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredOrders = mockOrders.filter((order: Order) => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Cliente', 'Total', 'Estado', 'Fecha Pedido', 'Fecha Entrega', 'Productos'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map((order: Order) => [
        order.id,
        order.customerName,
        `$${order.total.toFixed(2)}`,
        order.status,
        new Date(order.createdAt).toLocaleDateString(),
        order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A',
        order.products.map(p => `${p.productName} (${p.quantity})`).join('; ')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ordenes.csv';
    a.click();
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PENDING':
        return { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon };
      case 'PROCESSING':
        return { label: 'Procesando', color: 'bg-blue-100 text-blue-800', icon: CogIcon };
      case 'COMPLETED':
        return { label: 'Completado', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon };
      case 'CANCELLED':
        return { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircleIcon };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800', icon: ClockIcon };
    }
  };

  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o: Order) => o.status === 'PENDING').length,
    processing: mockOrders.filter((o: Order) => o.status === 'PROCESSING').length,
    completed: mockOrders.filter((o: Order) => o.status === 'COMPLETED').length,
    totalRevenue: mockOrders.filter((o: Order) => o.status === 'COMPLETED').reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-6">
            <ShoppingCartIcon className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Órdenes</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500"
            >
              <div className="flex items-center">
                <ShoppingCartIcon className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Órdenes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500"
            >
              <div className="flex items-center">
                <ClockIcon className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
            >
              <div className="flex items-center">
                <CogIcon className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Procesando</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500"
            >
              <div className="flex items-center">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500"
            >
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-8 h-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ingresos</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar órdenes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-64"
                  />
                </div>

                <div className="relative">
                  <FunnelIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED')}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white w-full sm:w-auto"
                    aria-label="Filtrar por estado de orden"
                  >
                    <option value="ALL">Todos los estados</option>
                    <option value="PENDING">Pendiente</option>
                    <option value="PROCESSING">Procesando</option>
                    <option value="COMPLETED">Completado</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {viewMode === 'grid' ? 'Vista Lista' : 'Vista Grid'}
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Exportar CSV
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order: Order, index: number) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">#{order.id}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {order.customerName}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${statusInfo.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total:</span>
                      <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarDaysIcon className="w-4 h-4 mr-2" />
                      Pedido: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    
                    {order.deliveryDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarDaysIcon className="w-4 h-4 mr-2" />
                        Entrega: {new Date(order.deliveryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Productos ({order.products.length}):</h4>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-gray-600">
                          <span className="truncate mr-2">{product.productName}</span>
                          <span className="whitespace-nowrap">x{product.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orden
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fechas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order: Order, index: number) => {
                    const statusInfo = getStatusInfo(order.status);
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.customerName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-fit ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            Pedido: {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                          {order.deliveryDate && (
                            <div className="text-sm text-gray-500">
                              Entrega: {new Date(order.deliveryDate).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {order.products.length} producto{order.products.length !== 1 ? 's' : ''}
                            <div className="text-xs text-gray-500 mt-1 space-y-1">
                              {order.products.slice(0, 2).map((product, idx) => (
                                <div key={idx} className="truncate">
                                  {product.productName} (x{product.quantity})
                                </div>
                              ))}
                              {order.products.length > 2 && (
                                <div className="text-gray-400">
                                  +{order.products.length - 2} más...
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron órdenes</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
