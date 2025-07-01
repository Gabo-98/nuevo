"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { mockEmployees } from '@/data/mockData';
import { Employee } from '@/types';

const EmployeesPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = mockEmployees.filter((employee: Employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || 
      (statusFilter === 'ACTIVE' && employee.isActive) ||
      (statusFilter === 'INACTIVE' && !employee.isActive);
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    if (!filtered.length) return;
    const headers = ["ID", "Nombre", "Posición", "Departamento", "Email", "Estado"];
    const rows = filtered.map((e: Employee) => [
      e.id, e.name, e.position, e.department, e.email, e.isActive ? "Activo" : "Inactivo"
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "empleados.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPositionIcon = (position: string) => {
    if (position.toLowerCase().includes('gerente')) return "👔";
    if (position.toLowerCase().includes('vendedor')) return "🛍️";
    if (position.toLowerCase().includes('almacén') || position.toLowerCase().includes('almacen')) return "📦";
    if (position.toLowerCase().includes('repartidor')) return "🚚";
    if (position.toLowerCase().includes('cajero')) return "💰";
    if (position.toLowerCase().includes('contador')) return "📊";
    return "👤";
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      'Ventas': 'from-blue-500 to-cyan-500',
      'Logística': 'from-green-500 to-emerald-500',
      'Administración': 'from-purple-500 to-pink-500',
      'Contabilidad': 'from-orange-500 to-red-500',
    };
    return colors[department] || 'from-gray-500 to-slate-500';
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              👥
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Gestión de Personal
              </h1>
              <p className="text-gray-600 mt-1">Administra tu equipo de trabajo</p>
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
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  👥
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{filtered.length}</div>
                  <div className="text-sm text-gray-600">Total Empleados</div>
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
                  ✅
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {filtered.filter(e => e.isActive).length}
                  </div>
                  <div className="text-sm text-gray-600">Activos</div>
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
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  ⏸️
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-600">
                    {filtered.filter(e => !e.isActive).length}
                  </div>
                  <div className="text-sm text-gray-600">Inactivos</div>
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
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  📊
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {filtered.length > 0 ? Math.round((filtered.filter(e => e.isActive).length / filtered.length) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Tasa Actividad</div>
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
                  placeholder="Buscar empleados..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all w-full sm:w-80"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                aria-label="Filtro de estado"
              >
                <option value="ALL">Todos los empleados</option>
                <option value="ACTIVE">Solo activos</option>
                <option value="INACTIVE">Solo inactivos</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-medium"
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

        {/* Employees Grid/List */}
        {viewMode === "grid" ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((employee, i) => (
              <motion.div
                key={employee.id}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getDepartmentColor(employee.department)} flex items-center justify-center text-2xl shadow-lg`}>
                    {getPositionIcon(employee.position)}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    employee.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {employee.isActive ? 'Activo' : 'Inactivo'}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                  {employee.name}
                </h3>
                
                <p className="text-gray-600 text-lg font-semibold mb-4">
                  {employee.position}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">🏢</span>
                    <span className="text-gray-700">{employee.department}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">📧</span>
                    <span className="text-gray-700 text-sm">{employee.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">📞</span>
                    <span className="text-gray-700">{employee.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">💰</span>
                    <span className="text-gray-700 font-semibold">${employee.salary.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-medium">
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
                <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Empleado</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Posición</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Departamento</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-700">Salario</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">Estado</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((employee, i) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getDepartmentColor(employee.department)} flex items-center justify-center text-lg`}>
                            {getPositionIcon(employee.position)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{employee.name}</div>
                            <div className="text-sm text-gray-600">{employee.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-700">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-green-600">
                        ${employee.salary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          employee.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {employee.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
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
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No se encontraron empleados</h3>
            <p className="text-gray-500">Intenta cambiar los filtros de búsqueda</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
