import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, ShoppingCart, Star, Clock, User, ArrowLeft, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';

const MOVIES = [
  {
    id: '1',
    title: 'The Romantic Comedy',
    description: "A hilarious take on modern dating in Accra. Follow Esi and Kofi as they navigate the chaotic world of digital love and traditional expectations.",
    price: 45,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-1-b095d3bf-1776967973639.webp',
    producer: 'Akwasi Films',
    category: 'Comedy',
    rating: 4.5,
    duration: '1h 45m',
    year: '2023'
  },
  {
    id: '2',
    title: 'Neon Odyssey',
    description: "In the year 2088, Accra has become a tech hub. A young hacker discovers a secret that could change the world forever.",
    price: 60,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-2-bcf6b7b0-1776967973756.webp',
    producer: 'Future Sight',
    category: 'Sci-Fi',
    rating: 4.8,
    duration: '2h 10m',
    year: '2024'
  },
  {
    id: '3',
    title: 'Shadows of Fear',
    description: "An ancient legend comes to life in a small village. A group of friends must survive the night as they are hunted by something they do not understand.",
    price: 40,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-3-cf4bb544-1776967973961.webp',
    producer: 'Dark Room',
    category: 'Horror',
    rating: 4.2,
    duration: '1h 55m',
    year: '2023'
  },
  {
    id: '4',
    title: 'Forest Adventure',
    description: "An animated journey for the whole family. Join Pippin the squirrel and his friends as they go on a quest to save their home from the Great Drought.",
    price: 50,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-4-d722f2de-1776967973643.webp',
    producer: 'Animax Ghana',
    category: 'Animation',
    rating: 4.9,
    duration: '1h 30m',
    year: '2024'
  },
  {
    id: '5',
    title: 'The Last Producer',
    description: "A gritty drama about the film industry in West Africa. One man fights against all odds to tell his story while dealing with personal demons and financial ruin.",
    price: 55,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/hero-movie-poster-3251420b-1776967973646.webp',
    producer: 'CinePro Studios',
    category: 'Action',
    rating: 4.7,
    duration: '2h 45m',
    year: '2023'
  }
];

const MovieDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [showTrailer, setShowTrailer] = useState(false);

  const movie = MOVIES.find(m => m.id === id);

  if (!movie) return <div className="pt-24 text-center">Movie not found</div>;

  const handleStartTrailer = () => {
    setShowTrailer(true);
    toast.info("Trailer is limited to 5 minutes", { duration: 5000 });
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Link to="/browse" className="fixed top-24 left-8 z-40 bg-zinc-900/50 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
        <ArrowLeft className="w-6 h-6 text-white" />
      </Link>

      <div className="relative h-[70vh]">
        <img src={movie.posterUrl} className="w-full h-full object-cover" alt={movie.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-amber-500 text-black font-bold uppercase">{movie.category}</Badge>
              <span className="text-white/60 font-medium">{movie.year}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                {movie.rating}
              </div>
              <div className="flex items-center gap-1 text-white/60">
                <Clock className="w-4 h-4" />
                {movie.duration}
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">{movie.title}</h1>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleStartTrailer} className="bg-white text-black hover:bg-gray-200 h-14 px-8 text-lg font-bold rounded-xl flex gap-2">
                <Play className="fill-black" />
                Watch Trailer
              </Button>
              <Button onClick={() => addItem(movie)} className="bg-amber-500 hover:bg-amber-600 text-black h-14 px-8 text-lg font-bold rounded-xl flex gap-2">
                <ShoppingCart />
                Buy Full Movie (GHS {movie.price})
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 italic uppercase tracking-wider text-amber-500">Storyline</h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {movie.description}
            </p>
            
            <div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-black" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Produced by</div>
                  <div className="text-xl font-bold">{movie.producer}</div>
                </div>
              </div>
              <Button variant="outline" className="border-white/10 hover:bg-white/5">Follow Producer</Button>
            </div>
          </div>
          
          <div className="bg-zinc-900/30 rounded-3xl p-8 border border-white/5">
            <h3 className="text-xl font-bold mb-6 italic uppercase">Movie Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-gray-500">Format</span>
                <span className="font-bold">4K Ultra HD</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-gray-500">Audio</span>
                <span className="font-bold">English (Ghanian dialect)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-gray-500">Subtitle</span>
                <span className="font-bold">English, French</span>
              </div>
              <div className="flex justify-between pb-4">
                <span className="text-gray-500">Size</span>
                <span className="font-bold">2.4 GB</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <p className="text-sm text-amber-500 font-medium text-center">
                Download will be available in your library immediately after purchase.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTrailer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <div className="relative w-full max-w-5xl aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-white/10">
              <button 
                onClick={() => setShowTrailer(false)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="w-full h-full bg-zinc-800 flex flex-col items-center justify-center gap-6">
                    <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
                      <Play className="w-10 h-10 text-black fill-black ml-1" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">Streaming Trailer...</h3>
                      <div className="flex items-center gap-3">
                         <div className="w-64 h-2 bg-zinc-700 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 10, ease: "linear" }}
                              className="h-full bg-amber-500"
                              onAnimationComplete={() => {
                                setShowTrailer(false);
                                toast.error("Trailer finished. Buy the movie to watch more!");
                              }}
                            />
                         </div>
                         <span className="text-sm text-gray-400">5:00 limit</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieDetail;