import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Search, ShoppingCart, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors">
            <Play className="fill-black text-black ml-0.5" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white uppercase italic">CineStream</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-amber-500 transition-colors">Home</Link>
          <Link to="/browse" className="text-sm font-medium hover:text-amber-500 transition-colors">Movies</Link>
          <Link to="/about" className="text-sm font-medium hover:text-amber-500 transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
          
          <Link to="/cart" className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-400" />
            {items.length > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-amber-500 text-black border-none h-4 min-w-4 flex items-center justify-center p-0 text-[10px] font-bold">
                {items.length}
              </Badge>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2 hover:bg-white/5 rounded-full">
                  <User className="w-5 h-5 text-amber-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white w-48">
                <DropdownMenuItem onClick={() => navigate(`/dashboard/${user.role}`)} className="cursor-pointer hover:bg-white/5">
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:bg-white/5">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full px-6">
                Sign In
              </Button>
            </Link>
          )}
          
          <button className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;