import type { FilterOptions, FilterCategory } from '../../../types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const categories: FilterCategory[] = ['all', 'Tech', 'Apparel', 'Accessories'];

  const handleCategoryChange = (category: FilterCategory) => {
    onFilterChange({ ...filters, category });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'minPrice' | 'maxPrice') => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/40 p-6 backdrop-blur-md flex flex-col gap-6 lg:w-64 shrink-0">
      <div>
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
          Categorías
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all text-left cursor-pointer ${
                filters.category === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todos los productos' : cat}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-slate-700/50" />

      <div>
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
          Rango de Precio
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange(e, 'minPrice')}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-hidden"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange(e, 'maxPrice')}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-hidden"
          />
        </div>
      </div>

      <hr className="border-slate-700/50" />

      <div>
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">
          Ordenar por
        </h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:border-indigo-500 focus:outline-hidden cursor-pointer"
        >
          <option value="rating">Mejor Calificación</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
}