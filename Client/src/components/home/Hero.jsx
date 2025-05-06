import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Travel background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 z-0"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Share Your Adventures,<br />Connect With Travelers
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join our global community of passionate travelers. Share experiences, discover hidden gems, and create unforgettable memories together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/feed" className="btn btn-primary py-3 px-8 text-base rounded-full">
                Explore Feed
              </Link>
              <Link to="/signup" className="btn btn-outline py-3 px-8 text-base rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                Join Now
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white">
              <MapPin size={14} /> Bali
            </span>
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white">
              <MapPin size={14} /> Tokyo
            </span>
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white">
              <MapPin size={14} /> Paris
            </span>
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white">
              <MapPin size={14} /> New York
            </span>
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white">
              <MapPin size={14} /> Barcelona
            </span>
            <Link to="/destinations" className="inline-flex items-center gap-1 py-1.5 px-3 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">
              View More <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;