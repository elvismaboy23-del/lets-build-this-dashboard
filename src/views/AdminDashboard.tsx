import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Users, Film, DollarSign, 
  TrendingUp, AlertTriangle, CheckCircle, 
  Settings, Search, ArrowUpRight, ArrowDownRight,
  UserCheck, UserX, Trash2, Edit3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const stats = [
    { label: 'Platform Revenue', value: 'GHS 84,200', icon: <DollarSign className="w-6 h-6 text-amber-500" />, trend: '+24%', color: 'amber' },
    { label: 'Active Producers', value: '1,204', icon: <Users className="w-6 h-6 text-blue-500" />, trend: '+12%', color: 'blue' },
    { label: 'Total Movies', value: '5,840', icon: <Film className="w-6 h-6 text-purple-500" />, trend: '+45%', color: 'purple' },
    { label: 'Pending Withdrawals', value: '18', icon: <AlertTriangle className="w-6 h-6 text-orange-500" />, trend: 'Action Needed', color: 'orange' },
  ];

  const pendingWithdrawals = [
    { id: '1', name: 'Akwasi Films', amount: 4200, wallet: '024 123 4567', date: '2 hours ago' },
    { id: '2', name: 'Dark Room', amount: 1550, wallet: '055 987 6543', date: '5 hours ago' },
    { id: '3', name: 'Future Sight', amount: 8900, wallet: '020 444 2222', date: 'Yesterday' },
  ];

  const handleApprove = (name: string) => {
    toast.success(`Withdrawal for ${name} approved and processed via Paystack.`);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter">Admin Control</h1>
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20 uppercase font-black italic tracking-widest px-4 py-1">Super Admin</Badge>
            </div>
            <p className="text-gray-400">System overview and platform governance.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 rounded-xl flex gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200 font-bold rounded-xl h-12 px-8">
              System Logs
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-[2rem] p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-black/50 rounded-2xl border border-white/5">{stat.icon}</div>
                <Badge className={`bg-${stat.color}-500/10 text-${stat.color}-500 border-none font-bold uppercase text-[10px]`}>
                   {stat.trend}
                </Badge>
              </div>
              <div className="text-3xl font-black italic mb-1 uppercase tracking-tighter leading-none">{stat.value}</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Withdrawal Approvals */}
           <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/30">
                 <h3 className="text-xl font-bold uppercase italic tracking-tighter flex items-center gap-3">
                   <AlertTriangle className="text-orange-500 w-6 h-6" />
                   Pending Withdrawals
                 </h3>
                 <Badge className="bg-orange-500/20 text-orange-500 border-none">18 REQUESTS</Badge>
              </div>
              <div className="p-0">
                 <div className="divide-y divide-white/5">
                    {pendingWithdrawals.map((req) => (
                      <div key={req.id} className="p-8 flex items-center justify-between hover:bg-white/5 transition-colors">
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10 font-bold text-lg italic text-amber-500">
                               {req.name.charAt(0)}
                            </div>
                            <div>
                               <div className="text-lg font-bold mb-1">{req.name}</div>
                               <div className="flex items-center gap-4 text-xs text-gray-500 font-medium uppercase tracking-widest">
                                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {req.wallet}</span>
                                  <span>•</span>
                                  <span>{req.date}</span>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-8">
                            <div className="text-right">
                               <div className="text-xl font-black italic uppercase tracking-tighter text-amber-500">GHS {req.amount}</div>
                               <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Payout Amount</div>
                            </div>
                            <div className="flex gap-2">
                               <Button 
                                 size="sm"
                                 onClick={() => handleApprove(req.name)}
                                 className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-10 px-6 rounded-xl"
                               >
                                 Approve
                               </Button>
                               <Button 
                                 size="sm"
                                 variant="outline"
                                 className="border-red-500/20 text-red-500 hover:bg-red-500/10 h-10 w-10 p-0 rounded-xl"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </Button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-6 bg-black/20 text-center">
                 <Button variant="link" className="text-gray-500 font-bold uppercase text-xs tracking-widest">View All Withdrawal History</Button>
              </div>
           </div>

           {/* Platform Health */}
           <div className="space-y-8">
              <div className="bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-8">
                 <h3 className="text-xl font-bold uppercase italic tracking-tighter mb-8">Platform Usage</h3>
                 <div className="space-y-8">
                    <div className="space-y-3">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <span className="text-gray-500">Momo Success Rate</span>
                          <span className="text-emerald-500">98.2%</span>
                       </div>
                       <Progress value={98} className="h-2 bg-black" />
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <span className="text-gray-500">Server Load</span>
                          <span className="text-amber-500">42%</span>
                       </div>
                       <Progress value={42} className="h-2 bg-black" />
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <span className="text-gray-500">Storage Capacity</span>
                          <span className="text-blue-500">65%</span>
                       </div>
                       <Progress value={65} className="h-2 bg-black" />
                    </div>
                 </div>
              </div>

              <div className="bg-amber-500 rounded-[2.5rem] p-8 text-black">
                 <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8" />
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Admin Alert</h3>
                 </div>
                 <p className="font-medium text-black/80 mb-6 leading-relaxed">
                    Subscription renewals for October have been processed. Total revenue generated from producer fees: <span className="font-bold underline">GHS 12,400</span>.
                 </p>
                 <Button className="w-full bg-black text-white hover:bg-zinc-900 font-bold h-12 rounded-xl">
                    Generate Report
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;