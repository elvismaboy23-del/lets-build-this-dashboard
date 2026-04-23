import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Download, Clock, Star, 
  Search, Filter, ShoppingBag, 
  ChevronRight, Heart, MoreVertical,
  History, Wallet
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const CustomerDashboard = () => {
  const { user } = useAuth();

  const purchasedMovies = [
    { 
      id: '2', 
      title: 'Neon Odyssey', 
      date: 'Oct 20, 2024', 
      poster: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-2-bcf6b7b0-1776967973756.webp',
      price: 60,
      size: '2.8 GB'
    },
    { 
      id: '4', 
      title: 'Forest Adventure', 
      date: 'Oct 15, 2024', 
      poster: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-4-d722f2de-1776967973643.webp',
      price: 50,
      size: '1.4 GB'
    },
  ];

  const handleDownload = (title: string) => {
    toast.success(`Starting download: ${title}...`, {
      description: "Keep the tab open for faster download speed."
    });
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">My Library</h1>
            <p className="text-gray-400">Welcome back, {user?.name}. Your collection is safe with us.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-zinc-900 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-3">
               <Wallet className="w-5 h-5 text-amber-500" />
               <div className="text-sm">
                  <div className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Balance</div>
                  <div className="font-black italic text-lg uppercase">GHS 25.00</div>
               </div>
            </div>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-2xl h-full px-8">
              Top Up
            </Button>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="flex gap-6 border-b border-white/5 mb-12 overflow-x-auto scrollbar-hide">
           {['Purchased', 'Watchlist', 'History', 'Profile Settings'].map((tab, i) => (
             <button 
               key={tab} 
               className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${i === 0 ? 'text-amber-500' : 'text-gray-500 hover:text-white'}`}
             >
               {tab}
               {i === 0 && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-full" />}
             </button>
           ))}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {purchasedMovies.map((movie) => (
             <motion.div 
               key={movie.id}
               whileHover={{ y: -5 }}
               className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden group"
             >
                <div className="relative aspect-[3/4] overflow-hidden">
                   <img src={movie.poster} className="w-full h-full object-cover" alt={movie.title} />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 gap-4">
                      <Button className="w-full bg-white text-black font-bold h-12 rounded-xl flex gap-2">
                        <Play className="fill-black w-4 h-4" />
                        Watch Now
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleDownload(movie.title)}
                        className="w-full border-white text-white font-bold h-12 rounded-xl flex gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download ({movie.size})
                      </Button>
                   </div>
                   <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 backdrop-blur-md border-white/10 text-xs font-bold px-3 py-1">PURCHASED</Badge>
                   </div>
                </div>
                <div className="p-6">
                   <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors uppercase italic tracking-tighter leading-none">{movie.title}</h3>
                   <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-1"><History className="w-3 h-3" /> {movie.date}</div>
                      <span className="font-bold text-amber-500/80">4K HDR</span>
                   </div>
                </div>
             </motion.div>
           ))}

           {/* Add New CTA */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="bg-zinc-900/20 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-12 text-center group cursor-pointer"
           >
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-amber-500/50 transition-colors">
                 <ShoppingBag className="w-8 h-8 text-gray-700 group-hover:text-amber-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tighter">Expand Library</h3>
              <p className="text-sm text-gray-500 mb-6">Discover thousands of new movies from local producers.</p>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:border-amber-500 text-amber-500">
                Browse Movies
              </Button>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;