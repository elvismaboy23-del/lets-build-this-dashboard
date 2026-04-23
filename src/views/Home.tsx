import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info, TrendingUp, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c059819b-d684-4156-96a9-538e4535c3e0/hero-movie-poster-3251420b-1776967973646.webp" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-widest rounded">NEW RELEASE</span>
              <span className="text-white/60 text-sm font-medium">8.9 IMDB • 2h 45m</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]">
              THE LAST <br/> <span className="text-amber-500">PRODUCER.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
              Experience the cinematic masterpiece everyone is talking about. Buy full movies or watch high-quality trailers before you decide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/browse">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold h-14 px-8 text-lg rounded-xl flex gap-2">
                  <Play className="fill-black" />
                  Explore Catalog
                </Button>
              </Link>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white h-14 px-8 text-lg rounded-xl flex gap-2">
                <Info />
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Smartphone className="w-10 h-10 text-amber-500" />,
                title: "Momo Payments",
                desc: "Secure and fast payments via Mobile Money (MTN, Vodafone, AirtelTigo) or Visa."
              },
              {
                icon: <Shield className="w-10 h-10 text-amber-500" />,
                title: "Safe Downloads",
                desc: "Get full movie downloads only after successful purchase. Encrypted and secure."
              },
              {
                icon: <TrendingUp className="w-10 h-10 text-amber-500" />,
                title: "Producer Growth",
                desc: "Producers can subscribe for 100 GHS/mo and keep their sales with easy withdrawals."
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-all group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Producer CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-amber-500 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="max-w-xl text-black">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight italic uppercase">
                Are you a filmmaker? <br/> Reach your audience.
              </h2>
              <p className="text-xl font-medium opacity-80 mb-8">
                Subscribe for just GHS 100/month or GHS 1000/year and start selling your movies today. Keep 100% of your earnings.
              </p>
              <Link to="/auth?role=producer">
                <Button className="bg-black text-white hover:bg-zinc-900 h-16 px-10 text-xl font-bold rounded-2xl flex gap-3 group">
                  Start Selling Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-black/10 backdrop-blur-md rounded-2xl p-8 border border-black/5 rotate-3">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold">Subscription</span>
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">Pro Plan</span>
                </div>
                <div className="text-5xl font-black mb-2 italic">GHS 100<span className="text-lg opacity-60">/mo</span></div>
                <ul className="space-y-3 mb-8 text-black/70 font-medium">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Unlimited Uploads</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Real-time Analytics</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Instant Withdrawals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;