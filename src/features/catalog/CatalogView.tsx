import { useState, useMemo } from 'react';
import type { FilterOptions } from '../../types';
import { MOCK_PRODUCTS } from '../../services/mockData';
import { ProductFilters } from './components/ProductFilters';
import { ProductCard } from './components/ProductCard';

export function CatalogView() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    minPrice: 0,
    maxPrice: 0,
    sortBy: 'rating',
  });

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchCategory = filters.category === 'all' || product.category === filters.category;
      const matchMinPrice = product.price >= filters.minPrice;
      const matchMaxPrice = filters.maxPrice === 0 || product.price <= filters.maxPrice;
      
      return matchCategory && matchMinPrice && matchMaxPrice;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [filters]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <ProductFilters filters={filters} onFilterChange={setFilters} />

      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
          <span>
            Mostrando <strong className="text-slate-200">{filteredProducts.length}</strong> productos
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
            <p className="text-slate-400">No hay productos que coincidan con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}