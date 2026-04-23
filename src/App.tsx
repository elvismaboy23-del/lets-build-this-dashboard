import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/layout/Navbar';
import Home from './views/Home';
import Browse from './views/Browse';
import MovieDetail from './views/MovieDetail';
import Auth from './views/Auth';
import Cart from './views/Cart';
import ProducerDashboard from './views/ProducerDashboard';
import CustomerDashboard from './views/CustomerDashboard';
import AdminDashboard from './views/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/cart" element={<Cart />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard/producer/*" 
        element={user?.role === 'producer' ? <ProducerDashboard /> : <Navigate to="/auth?role=producer" />} 
      />
      <Route 
        path="/dashboard/customer/*" 
        element={user?.role === 'customer' ? <CustomerDashboard /> : <Navigate to="/auth?role=customer" />} 
      />
      <Route 
        path="/dashboard/admin/*" 
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/auth" />} 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-500/30 selection:text-amber-500">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
            <Toaster position="top-center" richColors theme="dark" />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;