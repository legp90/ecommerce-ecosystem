export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    stock: number;
  }
  
  export type FilterCategory = 'all' | 'Tech' | 'Apparel' | 'Accessories';
  
  export interface FilterOptions {
    category: FilterCategory;
    minPrice: number;
    maxPrice: number;
    sortBy: 'price-asc' | 'price-desc' | 'rating';
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  // Nueva interfaz para el sistema de alertas
  export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'info';
  }