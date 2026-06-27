import { useState } from 'react'; // <-- Importamos useState
import type { Product } from '../../../types';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { ProductQuickView } from './ProductQuickView'; // <-- Importamos el nuevo modal

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false); // Estado para controlar este modal específico
  
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que al dar clic al botón se abra también el modal por accidente
    addToCart(product);
    addToast(`¡${product.name} añadido correctamente!`, 'success');
  };

  return (
    <>
      <div 
        onClick={() => setIsQuickViewOpen(true)} // Al dar clic a la tarjeta se abre la Vista Rápida
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-800 border border-slate-700/50 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer"
      >
        {/* Contenedor Imagen */}
        <div className="aspect-square w-full overflow-hidden bg-slate-900 relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Capa decorativa que dice "Ver detalles" al pasar el mouse */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
            <span className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 px-4 py-2 text-xs font-bold text-slate-200 border border-slate-700/60 shadow-xl">
              <Eye className="h-3.5 w-3.5 text-indigo-400" />
              Vista Rápida
            </span>
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70">
              <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-400 tracking-wide uppercase">
                Agotado
              </span>
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <div className="flex flex-1 flex-col p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {product.category}
          </span>
          
          <h3 className="mt-1 text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          <p className="mt-2 text-sm text-slate-400 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Rating y Stock */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-200">{product.rating}</span>
            </div>
            <span>
              {isOutOfStock ? 'Sin unidades' : `${product.stock} disponibles`}
            </span>
          </div>

          {/* Precio y Acción */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-700/50 pt-4">
            <span className="text-2xl font-black text-slate-100">
              ${product.price.toFixed(2)}
            </span>
            
            <button
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                isOutOfStock
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/10 hover:shadow-indigo-500/20'
            }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Añadir
            </button>
          </div>
        </div>
      </div>

      {/* Renderizado condicional del modal pasándole el estado local */}
      <ProductQuickView 
        product={isQuickViewOpen ? product : null} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}