import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Search, Bell, MessageCircle } from 'lucide-react';
import UserAvatar from '../shared/UserAvatar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Feed', path: '/feed' },
    { name: 'Explore', path: '/explore' },
    { name: 'Itinerary Hub', path: '/itineraryhub' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">
              Travel<span className="text-primary-600">Buddy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="rounded-full p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary-500"></span>
            </button>
            <button className="rounded-full p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100">
              <MessageCircle className="h-5 w-5" />
            </button>
            <UserAvatar />
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 animate-fade-in">
          <div className="container mx-auto px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2 pb-1 border-t border-gray-100 mt-2">
              <div className="flex gap-4">
                <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
                  <Search className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary-500"></span>
                </button>
                <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100">
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>
              <UserAvatar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;