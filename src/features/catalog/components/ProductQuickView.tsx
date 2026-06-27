import type { Product } from '../../../types';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { X, Star, ShoppingCart, Shield, Truck } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  if (!product) return null;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    addToCart(product);
    addToast(`¡${product.name} añadido correctamente!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Fondo oscuro con desenfoque */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" onClick={onClose} />

      {/* Contenedor Principal del Modal */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-6">
        
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-700 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Columna Izquierda: Imagen */}
        <div className="w-full md:w-1/2 aspect-square rounded-xl overflow-hidden bg-slate-900 relative shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70">
              <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-400 tracking-wide uppercase">
                Agotado
              </span>
            </div>
          )}
        </div>

        {/* Columna Derecha: Información extendida */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              {product.category}
            </span>
            <h3 className="text-2xl font-black text-slate-100 mt-1 leading-tight">
              {product.name}
            </h3>

            {/* Calificación */}
            <div className="mt-2 flex items-center gap-1 text-sm text-slate-400">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-200">{product.rating}</span>
              <span>• Calificación de usuarios</span>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Extras informativos de valor para el usuario */}
            <div className="mt-5 space-y-2 border-t border-b border-slate-700/50 py-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-400" />
                <span>Envío gratuito inmediato a todo el país.</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-400" />
                <span>Garantía oficial de fábrica de 12 meses.</span>
              </div>
            </div>
          </div>

          {/* Precio y Añadir al Carrito */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Precio</span>
              <span className="text-3xl font-black text-slate-100">${product.price.toFixed(2)}</span>
            </div>

            <button
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all cursor-pointer ${
                isOutOfStock
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {isOutOfStock ? 'Sin stock' : 'Añadir al carrito'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}