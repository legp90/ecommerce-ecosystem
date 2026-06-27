import { useState } from 'react';
import { CatalogView } from './features/catalog/CatalogView';
import { CartProvider, useCart } from './context/CartContext';
import { ToastProvider } from './context/ToastContext'; // <-- Importamos las alertas
import { CartSidebar } from './features/cart/components/CartSidebar';
import { ShoppingCart } from 'lucide-react';

function LayoutContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-xl font-black bg-linear-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            E-STORE ECOSYSTEM
          </span>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700/60 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-indigo-500/50 hover:bg-slate-700/50 transition-all cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4 text-indigo-400" />
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CatalogView />
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <ToastProvider> {/* <-- Las alertas envuelven todo */}
      <CartProvider>
        <LayoutContent />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;