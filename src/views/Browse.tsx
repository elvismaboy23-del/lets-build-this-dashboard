import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Play, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const MOVIES = [
  {
    id: '1',
    title: 'The Romantic Comedy',
    price: 45,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-1-b095d3bf-1776967973639.webp',
    producer: 'Akwasi Films',
    category: 'Comedy',
    rating: 4.5
  },
  {
    id: '2',
    title: 'Neon Odyssey',
    price: 60,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-2-bcf6b7b0-1776967973756.webp',
    producer: 'Future Sight',
    category: 'Sci-Fi',
    rating: 4.8
  },
  {
    id: '3',
    title: 'Shadows of Fear',
    price: 40,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-3-cf4bb544-1776967973961.webp',
    producer: 'Dark Room',
    category: 'Horror',
    rating: 4.2
  },
  {
    id: '4',
    title: 'Forest Adventure',
    price: 50,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/movie-poster-4-d722f2de-1776967973643.webp',
    producer: 'Animax Ghana',
    category: 'Animation',
    rating: 4.9
  },
  {
    id: '5',
    title: 'The Last Producer',
    price: 55,
    posterUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/hero-movie-poster-3251420b-1776967973646.webp',
    producer: 'CinePro Studios',
    category: 'Action',
    rating: 4.7
  }
];

const Browse = () => {
  const [search, setSearch] = useState('');
  const { addItem } = useCart();

  const filteredMovies = MOVIES.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) || 
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Explore Movies</h1>
            <p className="text-gray-400">Watch trailers for free, buy full movies for download.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input 
              placeholder="Search by title, genre..." 
              className="pl-10 bg-zinc-900 border-white/10 rounded-xl h-12 text-white focus:border-amber-500 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Animation'].map((cat) => (
            <button 
              key={cat}
              className="px-6 py-2 bg-zinc-900 border border-white/5 rounded-full text-sm font-semibold hover:bg-amber-500 hover:text-black transition-all whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie, i) => (
            <motion.div 
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:border-amber-500/50 transition-colors">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                  <Link to={`/movie/${movie.id}`} className="w-full">
                    <Button className="w-full bg-white text-black font-bold hover:bg-amber-500 rounded-lg flex gap-2">
                      <Play className="w-4 h-4 fill-black" />
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full border-white text-white font-bold hover:bg-white/10 rounded-lg flex gap-2"
                    onClick={() => addItem(movie)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add GHS {movie.price}
                  </Button>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-amber-500 text-black border-none font-bold">
                    GHS {movie.price}
                  </Badge>
                </div>
              </div>
              <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-amber-500 transition-colors">{movie.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{movie.producer}</span>
                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {movie.rating}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;