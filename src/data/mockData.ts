import { Product, Employee, Movement, Customer, Order } from '@/types';

export const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Arroz Premium 1kg",
    description: "Arroz de grano largo premium",
    price: 2.50,
    stock: 150,
    category: "Granos",
    supplier: "Distribuidora Central",
    minStock: 20,
    barcode: "7891234567890",
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01"
  },
  {
    id: "P002",
    name: "Aceite Vegetal 900ml",
    description: "Aceite vegetal refinado",
    price: 3.75,
    stock: 80,
    category: "Aceites",
    supplier: "Oleaginosas SA",
    minStock: 15,
    barcode: "7891234567891",
    createdAt: "2024-01-20",
    updatedAt: "2024-11-28"
  },
  {
    id: "P003",
    name: "Azúcar Blanca 1kg",
    description: "Azúcar refinada especial",
    price: 1.80,
    stock: 12,
    category: "Endulzantes",
    supplier: "Dulce Valle",
    minStock: 25,
    barcode: "7891234567892",
    createdAt: "2024-02-01",
    updatedAt: "2024-12-01"
  },
  {
    id: "P004",
    name: "Leche Entera 1L",
    description: "Leche entera pasteurizada",
    price: 1.25,
    stock: 200,
    category: "Lácteos",
    supplier: "Lácteos del Norte",
    minStock: 30,
    barcode: "7891234567893",
    createdAt: "2024-01-10",
    updatedAt: "2024-12-01"
  },
  {
    id: "P005",
    name: "Pasta Espagueti 500g",
    description: "Pasta de trigo durum",
    price: 1.50,
    stock: 95,
    category: "Pastas",
    supplier: "Molinos Italia",
    minStock: 20,
    barcode: "7891234567894",
    createdAt: "2024-01-25",
    updatedAt: "2024-11-30"
  }
];

export const mockEmployees: Employee[] = [
  {
    id: "E001",
    name: "María González",
    position: "Gerente de Ventas",
    email: "maria.gonzalez@distribuidora.com",
    phone: "+34 612 345 678",
    address: "Calle Mayor 123, Madrid",
    salary: 2800,
    hireDate: "2023-03-15",
    isActive: true,
    department: "Ventas"
  },
  {
    id: "E002",
    name: "Carlos Rodríguez",
    position: "Almacenero",
    email: "carlos.rodriguez@distribuidora.com",
    phone: "+34 698 765 432",
    address: "Avenida Central 456, Madrid",
    salary: 1800,
    hireDate: "2023-06-01",
    isActive: true,
    department: "Almacén"
  },
  {
    id: "E003",
    name: "Ana Martínez",
    position: "Cajera",
    email: "ana.martinez@distribuidora.com",
    phone: "+34 687 654 321",
    address: "Plaza España 789, Madrid",
    salary: 1600,
    hireDate: "2023-09-10",
    isActive: true,
    department: "Ventas"
  },
  {
    id: "E004",
    name: "Luis Fernández",
    position: "Repartidor",
    email: "luis.fernandez@distribuidora.com",
    phone: "+34 676 543 210",
    address: "Calle Nueva 321, Madrid",
    salary: 1700,
    hireDate: "2023-04-20",
    isActive: false,
    department: "Logística"
  }
];

export const mockMovements: Movement[] = [
  {
    id: "M001",
    productId: "P001",
    productName: "Arroz Premium 1kg",
    type: "IN",
    quantity: 50,
    reason: "Reposición de stock",
    employeeId: "E002",
    employeeName: "Carlos Rodríguez",
    date: "2024-12-01T10:30:00Z",
    notes: "Lote #ABC123"
  },
  {
    id: "M002",
    productId: "P002",
    productName: "Aceite Vegetal 900ml",
    type: "OUT",
    quantity: 15,
    reason: "Venta al por mayor",
    employeeId: "E001",
    employeeName: "María González",
    date: "2024-12-01T14:15:00Z",
    notes: "Cliente: Supermercado Central"
  },
  {
    id: "M003",
    productId: "P003",
    productName: "Azúcar Blanca 1kg",
    type: "OUT",
    quantity: 8,
    reason: "Venta al detalle",
    employeeId: "E003",
    employeeName: "Ana Martínez",
    date: "2024-12-01T16:45:00Z"
  },
  {
    id: "M004",
    productId: "P004",
    productName: "Leche Entera 1L",
    type: "IN",
    quantity: 100,
    reason: "Entrega programada",
    employeeId: "E002",
    employeeName: "Carlos Rodríguez",
    date: "2024-11-30T09:00:00Z",
    notes: "Entrega semanal"
  },
  {
    id: "M005",
    productId: "P005",
    productName: "Pasta Espagueti 500g",
    type: "OUT",
    quantity: 20,
    reason: "Pedido online",
    employeeId: "E001",
    employeeName: "María González",
    date: "2024-11-29T11:20:00Z",
    notes: "Pedido #WEB001"
  }
];

export const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "Supermercado Central",
    email: "compras@central.com",
    phone: "+34 911 222 333",
    address: "Gran Vía 100, Madrid",
    type: "WHOLESALE",
    createdAt: "2023-01-15"
  },
  {
    id: "C002",
    name: "Tienda El Rincón",
    email: "info@elrincon.com",
    phone: "+34 922 333 444",
    address: "Calle Comercio 25, Madrid",
    type: "RETAIL",
    createdAt: "2023-03-20"
  },
  {
    id: "C003",
    name: "Mercado San Miguel",
    email: "pedidos@sanmiguel.com",
    phone: "+34 933 444 555",
    address: "Plaza San Miguel 5, Madrid",
    type: "WHOLESALE",
    createdAt: "2023-05-10"
  }
];

export const mockOrders: Order[] = [
  {
    id: "O001",
    customerId: "C001",
    customerName: "Supermercado Central",
    products: [
      {
        productId: "P001",
        productName: "Arroz Premium 1kg",
        quantity: 20,
        price: 2.50,
        subtotal: 50.00
      },
      {
        productId: "P002",
        productName: "Aceite Vegetal 900ml",
        quantity: 15,
        price: 3.75,
        subtotal: 56.25
      }
    ],
    total: 106.25,
    status: "COMPLETED",
    createdAt: "2024-11-25",
    deliveryDate: "2024-11-27"
  },
  {
    id: "O002",
    customerId: "C002",
    customerName: "Tienda El Rincón",
    products: [
      {
        productId: "P003",
        productName: "Azúcar Blanca 1kg",
        quantity: 10,
        price: 1.80,
        subtotal: 18.00
      },
      {
        productId: "P004",
        productName: "Leche Entera 1L",
        quantity: 25,
        price: 1.25,
        subtotal: 31.25
      }
    ],
    total: 49.25,
    status: "PROCESSING",
    createdAt: "2024-12-01",
    deliveryDate: "2024-12-03"
  },
  {
    id: "O003",
    customerId: "C003",
    customerName: "Mercado San Miguel",
    products: [
      {
        productId: "P005",
        productName: "Pasta Espagueti 500g",
        quantity: 30,
        price: 1.50,
        subtotal: 45.00
      }
    ],
    total: 45.00,
    status: "PENDING",
    createdAt: "2024-12-01"
  }
];

// Funciones helper para estadísticas
export const getStatistics = () => {
  const totalProducts = mockProducts.length;
  const totalStock = mockProducts.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = mockProducts.filter(product => product.stock <= product.minStock);
  const activeEmployees = mockEmployees.filter(emp => emp.isActive).length;
  const totalEmployees = mockEmployees.length;
  const recentMovements = mockMovements.filter(mov => {
    const movDate = new Date(mov.date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - movDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }).length;

  return {
    totalProducts,
    totalStock,
    lowStockCount: lowStockProducts.length,
    lowStockProducts,
    activeEmployees,
    totalEmployees,
    recentMovements,
    pendingOrders: mockOrders.filter(order => order.status === 'PENDING').length,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0)
  };
};
