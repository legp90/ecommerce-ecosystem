import { useState } from 'react'; // <-- Importamos useState
import { useCart } from '../../../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal'; // <-- Importamos el nuevo Modal

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Estado para controlar el Checkout

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div 
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="w-screen max-w-md transform bg-slate-800 border-l border-slate-700/50 p-6 shadow-2xl flex flex-col justify-between">
            
            <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-slate-100">Tu Carrito</h2>
              </div>
              <button 
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-slate-400 mb-2">Tu carrito está vacío.</p>
                  <p className="text-xs text-slate-500">¡Añade algunos productos de la tienda!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div 
                    key={item.product.id} 
                    className="flex gap-4 rounded-xl bg-slate-900/50 border border-slate-700/30 p-3"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-16 w-16 rounded-lg object-cover bg-slate-900"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-200 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-200 w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            disabled={item.quantity >= item.product.stock}
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-slate-700/50 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Subtotal</span>
                  <span className="text-xl font-black text-slate-100">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={clearCart}
                    className="rounded-xl border border-slate-700 text-sm font-semibold text-slate-400 hover:bg-slate-700/30 hover:text-slate-300 py-3 transition-all cursor-pointer"
                  >
                    Vaciar
                  </button>
                  <button
                    onClick={() => setIsCheckoutOpen(true)} // <-- Ahora abre nuestro Modal
                    className="rounded-xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500 py-3 shadow-md shadow-emerald-600/10 transition-all cursor-pointer"
                  >
                    Ir al Pago
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Inyectamos el modal aquí para que escuche el estado interno */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => {
          setIsCheckoutOpen(false);
          onClose(); // Cierra también la sidebar lateral al terminar
        }} 
      />
    </>
  );
}