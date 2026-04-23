import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Film, Wallet, Users, Plus, 
  ArrowUpRight, ArrowDownLeft, Clock, 
  CheckCircle2, AlertCircle, Download, ExternalLink,
  ChevronRight, MoreVertical, ShieldCheck, Smartphone
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

const ProducerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const stats = [
    { label: 'Total Sales', value: 'GHS 12,450', icon: <BarChart3 className="w-6 h-6 text-amber-500" />, trend: '+12%' },
    { label: 'Movies Sold', value: '284', icon: <Film className="w-6 h-6 text-purple-500" />, trend: '+5%' },
    { label: 'Wallet Balance', value: 'GHS 4,200', icon: <Wallet className="w-6 h-6 text-emerald-500" />, trend: 'Ready' },
    { label: 'Unique Buyers', value: '156', icon: <Users className="w-6 h-6 text-blue-500" />, trend: '+8%' },
  ];

  const movies = [
    { id: '1', title: 'The Romantic Comedy', sales: 124, revenue: 5580, status: 'Active' },
    { id: '5', title: 'The Last Producer', sales: 82, revenue: 4510, status: 'Active' },
    { id: '10', title: 'Under Review Movie', sales: 0, revenue: 0, status: 'Pending' },
  ];

  const handleWithdraw = () => {
    toast.success("Withdrawal request of GHS 4,200 sent via Momo. Pending admin approval.");
    setShowWithdrawModal(false);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter">Producer Dashboard</h1>
              <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">PREMIUM PLAN</Badge>
            </div>
            <p className="text-gray-400">Manage your films and track your revenue growth.</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl h-12 flex gap-2">
              <Plus className="w-5 h-5" />
              Upload Movie
            </Button>
            <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 rounded-xl" onClick={() => setShowWithdrawModal(true)}>
              <Wallet className="w-5 h-5 mr-2" />
              Withdraw Funds
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-black/50 rounded-2xl">{stat.icon}</div>
                <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-3xl font-black italic mb-1 uppercase tracking-tighter">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
             {/* Active Movies */}
             <div className="bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                   <h3 className="text-xl font-bold uppercase italic tracking-tighter">Your Movies</h3>
                   <Button variant="ghost" className="text-amber-500 font-bold">View All</Button>
                </div>
                <div className="divide-y divide-white/5">
                   {movies.map((movie) => (
                     <div key={movie.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-20 bg-zinc-800 rounded-lg overflow-hidden border border-white/10">
                              <div className="w-full h-full flex items-center justify-center">
                                <Film className="w-8 h-8 text-gray-700" />
                              </div>
                           </div>
                           <div>
                              <div className="font-bold text-lg mb-1">{movie.title}</div>
                              <div className="flex items-center gap-3">
                                 <Badge className={movie.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-none' : 'bg-amber-500/10 text-amber-500 border-none'}>
                                   {movie.status}
                                 </Badge>
                                 <span className="text-sm text-gray-500">{movie.sales} Sales</span>
                              </div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="font-black italic text-lg uppercase tracking-tighter">GHS {movie.revenue}</div>
                           <button className="text-gray-500 hover:text-white transition-colors">
                             <MoreVertical className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Recent Transactions */}
             <div className="bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                   <h3 className="text-xl font-bold uppercase italic tracking-tighter">Recent Sales</h3>
                </div>
                <div className="p-0">
                   <table className="w-full">
                     <thead className="bg-black/30">
                        <tr className="text-left text-xs uppercase tracking-widest text-gray-500">
                           <th className="px-6 py-4 font-bold">Customer</th>
                           <th className="px-6 py-4 font-bold">Movie</th>
                           <th className="px-6 py-4 font-bold">Date</th>
                           <th className="px-6 py-4 font-bold text-right">Amount</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {[1, 2, 3].map((_, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-medium">customer_{i+1}@gmail.com</td>
                             <td className="px-6 py-4 text-gray-400">The Last Producer</td>
                             <td className="px-6 py-4 text-sm text-gray-500">24 Oct, 2024</td>
                             <td className="px-6 py-4 text-right font-black italic text-amber-500 uppercase">GHS 55</td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
             </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
             {/* Subscription Card */}
             <div className="bg-amber-500 rounded-3xl p-8 text-black relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                   <ShieldCheck className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                   <h4 className="text-sm font-black uppercase tracking-widest mb-1 opacity-60">Your Plan</h4>
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Premium Monthly</h3>
                   <div className="space-y-2 mb-8">
                      <div className="flex justify-between text-sm font-bold border-b border-black/10 pb-2">
                        <span>Status</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Active</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-b border-black/10 pb-2">
                        <span>Renews On</span>
                        <span>Nov 15, 2024</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold">
                        <span>Payment Method</span>
                        <span>Momo (****23)</span>
                      </div>
                   </div>
                   <Button className="w-full bg-black text-white hover:bg-zinc-900 font-bold h-12 rounded-xl">
                      Manage Subscription
                   </Button>
                </div>
             </div>

             {/* Storage Info */}
             <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
                <h3 className="text-lg font-bold uppercase italic tracking-tighter mb-6">Storage Usage</h3>
                <div className="space-y-4">
                   <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Used (12.4 GB)</span>
                      <span className="text-white font-bold">50 GB Total</span>
                   </div>
                   <Progress value={25} className="h-2 bg-black" />
                   <p className="text-xs text-gray-500 leading-relaxed">
                      You are using 25% of your storage. Upgrade to Yearly plan for unlimited storage.
                   </p>
                   <Button variant="link" className="text-amber-500 p-0 h-auto font-bold flex items-center gap-1">
                      Upgrade Storage <ExternalLink className="w-3 h-3" />
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-md"
           >
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Withdraw Earnings</h3>
              <p className="text-gray-400 mb-8">Available balance: <span className="text-white font-bold">GHS 4,200</span></p>
              
              <div className="space-y-4 mb-8">
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-500 ml-1">Withdrawal Amount</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">GHS</span>
                       <Input defaultValue="4200" className="pl-14 h-14 bg-black/50 border-white/10 rounded-2xl text-xl font-bold" />
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-500 ml-1">Momo Wallet Number</label>
                    <div className="relative">
                       <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                       <Input defaultValue="024 123 4567" className="pl-14 h-14 bg-black/50 border-white/10 rounded-2xl font-bold" />
                    </div>
                    <p className="text-[10px] text-gray-500 ml-1 italic">* 2% processing fee applies to Momo withdrawals.</p>
                 </div>
              </div>
              
              <div className="flex gap-4">
                 <Button variant="ghost" onClick={() => setShowWithdrawModal(false)} className="flex-1 h-14 rounded-2xl font-bold">Cancel</Button>
                 <Button onClick={handleWithdraw} className="flex-1 h-14 bg-amber-500 hover:bg-amber-600 text-black font-black text-lg rounded-2xl">
                    Request
                 </Button>
              </div>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProducerDashboard;