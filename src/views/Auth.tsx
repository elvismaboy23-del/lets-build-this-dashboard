import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Mail, Lock, User, ShieldCheck, ArrowRight, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as 'producer' | 'customer') || 'customer';
  const [role, setRole] = useState<'producer' | 'customer'>(initialRole);
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    toast.success(`Successfully logged in as ${role}`);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
            <Play className="fill-black text-black ml-1" />
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400">Join the ultimate West African cinema community</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <Tabs defaultValue={role} onValueChange={(v) => setRole(v as any)} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 bg-black/50 p-1 rounded-xl">
              <TabsTrigger value="customer" className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-black font-bold">
                Customer
              </TabsTrigger>
              <TabsTrigger value="producer" className="rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-black font-bold">
                Producer
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input placeholder="John Doe" className="pl-10 h-12 bg-black/50 border-white/10 rounded-xl focus:border-amber-500" required />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input type="email" placeholder="name@example.com" className="pl-10 h-12 bg-black/50 border-white/10 rounded-xl focus:border-amber-500" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input type="password" placeholder="••••••••" className="pl-10 h-12 bg-black/50 border-white/10 rounded-xl focus:border-amber-500" required />
              </div>
            </div>

            {role === 'producer' && !isLogin && (
              <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/20 mb-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-amber-500 uppercase text-xs tracking-widest">Subscription Plan</span>
                </div>
                <div className="text-sm text-gray-400 mb-3">Choose how you want to pay your subscription:</div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="p-3 rounded-xl bg-amber-500 text-black font-bold text-center border-2 border-amber-500">
                    <div className="text-xs opacity-70">Monthly</div>
                    <div>GHS 100</div>
                  </button>
                  <button type="button" className="p-3 rounded-xl bg-black border-2 border-white/10 text-white font-bold text-center hover:border-amber-500/50 transition-colors">
                    <div className="text-xs opacity-70">Yearly</div>
                    <div>GHS 1000</div>
                  </button>
                </div>
                <div className="mt-4 flex gap-4 justify-center">
                  <Smartphone className="w-6 h-6 text-amber-500 opacity-50" />
                  <CreditCard className="w-6 h-6 text-amber-500 opacity-50" />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-black font-black text-lg rounded-2xl mt-6 group">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;