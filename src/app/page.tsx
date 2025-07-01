"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getStatistics } from '@/data/mockData';

export default function Home() {
  const [time, setTime] = useState(new Date());
  const stats = getStatistics();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const statsCards = [
    {
      title: "Total Productos",
      value: stats.totalProducts.toString(),
      unit: "items",
      icon: "📦",
      gradient: "from-violet-600 via-purple-600 to-blue-600",
      shadowColor: "shadow-purple-500/25",
      change: "+2",
      changeType: "positive"
    },
    {
      title: "Stock Total",
      value: stats.totalStock.toString(),
      unit: "unidades",
      icon: "📊",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      shadowColor: "shadow-emerald-500/25",
      change: "+150",
      changeType: "positive"
    },
    {
      title: "Personal Activo",
      value: stats.activeEmployees.toString(),
      unit: "empleados",
      icon: "👥",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      shadowColor: "shadow-pink-500/25",
      change: "0",
      changeType: "neutral"
    },
    {
      title: "Stock Bajo",
      value: stats.lowStockCount.toString(),
      unit: "productos",
      icon: "⚠️",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      shadowColor: "shadow-orange-500/25",
      change: "-1",
      changeType: "positive"
    },
  ];

  const recentActivities = [
    { time: "10:30", action: "Stock repuesto", product: "Arroz Premium 1kg", quantity: "+100", type: "in" },
    { time: "11:15", action: "Venta realizada", product: "Aceite Vegetal 900ml", quantity: "-25", type: "out" },
    { time: "12:00", action: "Nuevo empleado", product: "Ana García", quantity: "+1", type: "employee" },
    { time: "14:30", action: "Stock crítico", product: "Azúcar Blanca 1kg", quantity: "12", type: "warning" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg border-b border-white/20 mb-8"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard Principal
              </h1>
              <p className="text-gray-600 mt-1">Resumen ejecutivo del sistema</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                {time.toLocaleTimeString('es-ES')}
              </div>
              <div className="text-sm text-gray-600">
                {time.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-2xl ${stat.shadowColor} group cursor-pointer`}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/10 rounded-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    className="text-5xl filter drop-shadow-lg"
                  >
                    {stat.icon}
                  </motion.span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    stat.changeType === 'positive' ? 'bg-green-500/20 text-green-100' :
                    stat.changeType === 'negative' ? 'bg-red-500/20 text-red-100' :
                    'bg-gray-500/20 text-gray-100'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 opacity-90">{stat.title}</h3>
                
                <div className="flex items-baseline space-x-2">
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    className="text-4xl font-bold"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-sm opacity-80">{stat.unit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="xl:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              Actividad Reciente
            </h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                    activity.type === 'in' ? 'bg-green-100 text-green-600' :
                    activity.type === 'out' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'employee' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {activity.type === 'in' ? '📈' : 
                     activity.type === 'out' ? '📉' :
                     activity.type === 'employee' ? '👤' : '⚠️'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {activity.action}
                    </div>
                    <div className="text-gray-600 text-sm">{activity.product}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold text-lg ${
                      activity.type === 'in' ? 'text-green-600' :
                      activity.type === 'out' ? 'text-blue-600' :
                      activity.type === 'employee' ? 'text-purple-600' :
                      'text-orange-600'
                    }`}>
                      {activity.quantity}
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Side Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  Acciones Rápidas
                </h3>
                
                <div className="space-y-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all text-left"
                  >
                    <div className="font-semibold">📦 Nuevo Producto</div>
                    <div className="text-sm opacity-90">Agregar al inventario</div>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all text-left"
                  >
                    <div className="font-semibold">👤 Nuevo Empleado</div>
                    <div className="text-sm opacity-90">Registrar personal</div>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all text-left"
                  >
                    <div className="font-semibold">📋 Nueva Orden</div>
                    <div className="text-sm opacity-90">Crear pedido</div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                Resumen Semanal
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Ventas</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ delay: 1, duration: 1 }}
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Stock</span>
                    <span className="font-semibold text-blue-600">72%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{ delay: 1.2, duration: 1 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-500"
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Eficiencia</span>
                    <span className="font-semibold text-purple-600">91%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "91%" }}
                      transition={{ delay: 1.4, duration: 1 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
