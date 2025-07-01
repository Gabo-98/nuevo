// Tipos para el sistema de distribuidora

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  supplier: string;
  minStock: number;
  barcode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  salary: number;
  hireDate: string;
  isActive: boolean;
  department: string;
}

export interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: 'IN' | 'OUT';
  quantity: number;
  reason: string;
  employeeId: string;
  employeeName: string;
  date: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'RETAIL' | 'WHOLESALE';
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: OrderItem[];
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  deliveryDate?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}
