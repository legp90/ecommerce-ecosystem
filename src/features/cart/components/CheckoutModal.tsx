import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { X, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  
  // Estados del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  
  // Estado de carga para simular una pasarela de pago real (Stripe/PayPal)
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica manual
    if (!name || !email || !address || !cardNumber) {
      addToast('Por favor, rellena todos los campos', 'info');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length < 16) {
      addToast('El número de tarjeta no es válido', 'info');
      return;
    }

    setIsProcessing(true);

    // Simulamos la respuesta asíncrona de un servidor/API de pagos
    setTimeout(() => {
      setIsProcessing(false);
      clearCart(); // Limpiamos el estado global del carrito
      addToast('¡Pago procesado con éxito! Gracias por tu compra.', 'success');
      onClose(); // Cerramos el modal
    }, 2500);
  };

  // Formateador simple para la tarjeta (agrega espacios cada 4 números)
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formattedValue.substring(0, 19)); // Máximo 16 números + 3 espacios
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop de fondo */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" onClick={onClose} />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-xl font-bold border-b border-slate-700 pb-3 flex items-center gap-2">
          <CreditCard className="text-indigo-400 h-5 w-5" />
          Finalizar Compra
        </h3>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Campo Nombre */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nombre Completo</label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-slate-200 focus:border-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Correo Electrónico</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-slate-200 focus:border-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Campo Dirección */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Dirección de Envío</label>
            <input 
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Av. Siempre Viva 742"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm text-slate-200 focus:border-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* Campo Tarjeta */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Número de Tarjeta</label>
            <div className="relative">
              <input 
                type="text"
                required
                value={cardNumber}
                onChange={handleCardChange}
                placeholder="0000 0000 0000 0000"
                className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-4 pr-10 py-2.5 text-sm text-slate-200 focus:border-indigo-500 focus:outline-hidden"
              />
              <CreditCard className="absolute right-3 top-3 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {/* Resumen del Total */}
          <div className="rounded-xl bg-slate-900/50 border border-slate-700/50 p-4 mt-6 flex items-center justify-between">
            <span className="text-sm text-slate-400">Total a pagar:</span>
            <span className="text-2xl font-black text-emerald-400">${cartTotal.toFixed(2)}</span>
          </div>

          {/* Botón de Envío / Estado Procesando */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-all cursor-pointer shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Procesando Pago...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Pagar de Forma Segura
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}