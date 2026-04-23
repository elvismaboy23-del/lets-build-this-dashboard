import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, X, CreditCard, Smartphone, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeItem, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please sign in to complete your purchase");
      navigate('/auth');
      return;
    }
    toast.success("Redirecting to Paystack secure payment...");
    // Mock successful payment
    setTimeout(() => {
      toast.success("Payment successful! Movies added to your library.");
      clearCart();
      navigate('/dashboard/customer');
    }, 2000);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-12">Your Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-zinc-900/50 rounded-[2.5rem] p-20 text-center border border-white/5">
            <div className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 uppercase italic tracking-tighter">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Explore our catalog and find your next favorite movie.</p>
            <Button onClick={() => navigate('/browse')} className="bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 px-8 rounded-xl">
              Browse Movies
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-zinc-900/50 border border-white/5 p-4 rounded-3xl flex items-center gap-6"
                  >
                    <div className="w-20 h-28 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                      <img src={item.posterUrl} className="w-full h-full object-cover" alt={item.title} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold uppercase italic tracking-tighter mb-1">{item.title}</h3>
                      <div className="text-sm text-gray-500 mb-2">by {item.producer}</div>
                      <div className="text-amber-500 font-black italic">GHS {item.price}</div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem]">
                <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-6">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">GHS {total}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span className="text-white font-bold">GHS 0.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-black italic uppercase tracking-tighter pt-4 border-t border-white/5">
                    <span>Total</span>
                    <span className="text-amber-500 font-bold">GHS {total}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-black/50 rounded-2xl border border-white/5">
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Pay with</div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-white">
                        <Smartphone className="w-4 h-4 text-amber-500" /> Momo
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-white">
                        <CreditCard className="w-4 h-4 text-amber-500" /> Card
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-black font-black text-lg rounded-2xl group"
                  >
                    Checkout Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl text-center">
                <p className="text-xs text-amber-500/80 font-medium">
                  Secure checkout powered by Paystack. All downloads are encrypted and permanent.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;