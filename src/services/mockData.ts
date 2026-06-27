import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Quantum Mechanical Keyboard',
    description: 'Hot-swappable switches, dynamic RGB backlighting, and aluminum frame for ultimate tactile feedback.',
    price: 129.99,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    stock: 14
  },
  {
    id: 'prod-2',
    name: 'Minimalist Leather Backpack',
    description: 'Water-resistant premium full-grain leather with dedicated 16-inch laptop compartment.',
    price: 89.50,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    stock: 8
  },
  {
    id: 'prod-3',
    name: 'Noise-Canceling Wireless Headphones',
    description: 'Active noise cancellation, 40-hour battery life, and high-fidelity spatial audio profile.',
    price: 249.99,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    stock: 5
  },
  {
    id: 'prod-4',
    name: 'Over-Sized Heavyweight Hoodie',
    description: '100% organic cotton, 450gsm loopback terry fabric. Designed for maximum comfort and durability.',
    price: 65.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    rating: 4.2,
    stock: 22
  },
  {
    id: 'prod-5',
    name: 'Ergonomic Precision Mouse',
    description: '4000 DPI optical sensor, thumb scroll wheel, and ergonomic shape to reduce wrist strain.',
    price: 79.99,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    stock: 0
  }
];