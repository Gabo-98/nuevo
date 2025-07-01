# Sistema de Control de Stock y Administración de Personal

Un sistema full stack moderno para la gestión de distribuidoras, desarrollado con Next.js, TypeScript, TailwindCSS y framer-motion.

![Dashboard](https://via.placeholder.com/800x400/4f46e5/ffffff?text=Sistema+de+Distribuidora)

## 🚀 Características

### ✨ Dashboard Principal
- **Estadísticas en tiempo real**: Productos, stock, empleados y movimientos
- **Alertas de stock bajo**: Identificación automática de productos con stock crítico
- **Actividad reciente**: Visualización de los últimos movimientos del inventario
- **Diseño responsivo**: Optimizado para desktop y móvil

### 📦 Gestión de Productos
- **Inventario completo**: Lista detallada de todos los productos
- **Filtros avanzados**: Por categoría, proveedor y nivel de stock
- **Alertas visuales**: Códigos de color para stock normal, bajo y crítico
- **Exportación**: Datos en formato CSV para análisis externos

### 👥 Administración de Personal
- **Base de datos de empleados**: Información completa del personal
- **Estados activos/inactivos**: Control del personal en servicio
- **Departamentos**: Organización por áreas de trabajo
- **Métricas de personal**: Estadísticas de empleados por departamento

### 📋 Control de Movimientos
- **Registro de entradas y salidas**: Tracking completo del inventario
- **Historial detallado**: Información de empleado, fecha y motivo
- **Filtros por tipo**: Separación entre entradas y salidas
- **Notas adicionales**: Información extra sobre cada movimiento

### 🏪 Gestión de Clientes
- **Base de datos de clientes**: Información completa de contacto
- **Tipos de cliente**: Diferenciación entre minoristas y mayoristas
- **Registro de fechas**: Control de cuándo se registró cada cliente
- **Vista adaptable**: Grid y lista para mejor visualización

### 🛒 Sistema de Órdenes
- **Gestión completa de pedidos**: Desde creación hasta entrega
- **Estados de orden**: Pendiente, Procesando, Completado, Cancelado
- **Detalles de productos**: Lista completa de items en cada orden
- **Seguimiento de fechas**: Pedido y entrega programada
- **Cálculo automático**: Totales y subtotales por orden

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **TailwindCSS** - Framework CSS para diseño moderno
- **framer-motion** - Animaciones fluidas y interactivas
- **Heroicons** - Iconografía consistente y profesional

### Características Técnicas
- **Static Export** - Optimizado para despliegue en Netlify
- **Responsive Design** - Adaptable a todos los dispositivos
- **Mock Data** - Datos de prueba realistas incluidos
- **TypeScript Strict** - Máxima seguridad de tipos
- **ESLint** - Código limpio y consistente

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd nuevo

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Scripts Disponibles
```bash
# Desarrollo con Turbopack
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Pages (App Router)
│   ├── customers/          # Gestión de clientes
│   ├── employees/          # Administración de personal
│   ├── movements/          # Control de movimientos
│   ├── orders/            # Sistema de órdenes
│   ├── products/          # Gestión de productos
│   ├── globals.css        # Estilos globales
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   └── Navigation.tsx     # Navegación principal
├── data/                  # Datos mock
│   └── mockData.ts        # Base de datos simulada
└── types/                 # Definiciones TypeScript
    └── index.ts           # Interfaces principales
```

## 🎨 Características de Diseño

### Sistema de Colores
- **Primarios**: Gradientes azul-púrpura para elementos principales
- **Secundarios**: Colores semánticos (verde, amarillo, rojo) para estados
- **Neutros**: Escalas de grises para texto y fondos

### Animaciones
- **Entrada progresiva**: Elementos aparecen con retraso escalonado
- **Hover effects**: Interactividad visual en cards y botones
- **Transiciones suaves**: Cambios de estado fluidos

## 📊 Datos de Demostración

El sistema incluye datos mock realistas:
- **15 productos** de diferentes categorías
- **4 empleados** de distintos departamentos  
- **5 movimientos** de entrada y salida
- **3 clientes** minoristas y mayoristas
- **3 órdenes** en diferentes estados

## 🌐 Despliegue en Netlify

### Configuración Automática
1. Conectar repositorio Git a Netlify
2. Configuración automática:
   - Build command: `npm run build`
   - Publish directory: `out`

### Optimizaciones Incluidas
- **Static Export**: Build completamente estático
- **Bundle Analysis**: Optimización automática de tamaños

## 🎯 Funcionalidades Implementadas

✅ **Dashboard con estadísticas**  
✅ **Gestión completa de productos**  
✅ **Administración de personal**  
✅ **Control de movimientos de stock**  
✅ **Base de datos de clientes**  
✅ **Sistema de órdenes**  
✅ **Exportación CSV**  
✅ **Diseño responsivo**  
✅ **Animaciones fluidas**  
✅ **Compatible con Netlify**  

---

**Desarrollado como ejemplo educativo para clase de programación III**

*Sistema completo, funcional y listo para producción* 
