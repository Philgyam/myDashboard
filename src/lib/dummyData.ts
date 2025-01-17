// Types
export interface User {
  id: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

// Dummy Data
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 199.99,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand',
    price: 49.99,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
  },
];

export const orders: Order[] = [
  {
    id: '1',
    userId: '1',
    status: 'completed',
    total: 299.99,
    items: [
      {
        id: '1',
        productId: '1',
        quantity: 1,
        price: 299.99,
      },
    ],
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    status: 'processing',
    total: 249.98,
    items: [
      {
        id: '2',
        productId: '2',
        quantity: 1,
        price: 199.99,
      },
      {
        id: '3',
        productId: '3',
        quantity: 1,
        price: 49.99,
      },
    ],
    createdAt: '2024-03-14T15:30:00Z',
  },
];

export const customers: Customer[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    totalOrders: 2,
    totalSpent: 549.97,
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    totalOrders: 1,
    totalSpent: 199.99,
    createdAt: '2024-02-15T00:00:00Z',
  },
];

// Mock Auth Functions
let currentUser: User | null = null;

export const auth = {
  signIn: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email === 'demo@example.com' && password === 'password') {
      currentUser = { id: '1', email };
      return { user: currentUser, error: null };
    }
    
    return { user: null, error: 'Invalid email or password' };
  },

  signUp: async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (email && password.length >= 6) {
      currentUser = { id: Date.now().toString(), email };
      return { user: currentUser, error: null };
    }
    
    return { user: null, error: 'Invalid email or password' };
  },

  signOut: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    currentUser = null;
  },

  resetPassword: async (email: string): Promise<{ error: string | null }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { error: null };
  },

  getCurrentUser: (): User | null => currentUser,
};