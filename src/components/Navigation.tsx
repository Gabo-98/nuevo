"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/products', label: 'Productos', icon: '📦' },
    { href: '/employees', label: 'Personal', icon: '👥' },
    { href: '/movements', label: 'Movimientos', icon: '📋' },
    { href: '/customers', label: 'Clientes', icon: '🏪' },
    { href: '/orders', label: 'Órdenes', icon: '🛒' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Distribuidora Digital
              </h1>
              <p className="text-xs text-gray-600">Sistema de Gestión Inteligente</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden md:flex gap-2"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link href={item.href}>
                  <div className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium
                    ${pathname === item.href 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }
                  `}>
                    <span className="text-lg">{item.icon}</span>
                    <span className="hidden lg:block">{item.label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden mt-4 space-y-2"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                ${pathname === item.href 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'text-gray-700 hover:bg-blue-50'
                }
              `}>
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navigation;
