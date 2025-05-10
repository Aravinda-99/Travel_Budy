import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Search, Bell, MessageCircle, LogOut } from 'lucide-react';
import UserAvatar from '../shared/UserAvatar';
import { authAPI } from '../../services/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status on mount and token change
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authAPI.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        const userData = authAPI.getUser();
        if (userData) {
          const isAdmin = userData.roles?.some(role => role.name === 'ROLE_ADMIN');
          setUserRole(isAdmin ? 'ADMIN' : 'USER');
        }
      } else {
        setUserRole(null);
      }
    };

    checkAuth();
    
    // Add event listener for storage changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

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

  const handleLogout = () => {
    authAPI.logout();
  };

  // Define public and protected navigation links
  const publicLinks = [
    { name: 'Home', path: '/' },
  ];

  const protectedLinks = [
    { name: 'Feed', path: '/feed' },
    { name: 'Recommendation', path: '/RecommendationPage' },
    { name: 'Itinerary Hub', path: '/itineraryhub' },
  ];

  // Combine links based on authentication status
  const navLinks = [
    ...publicLinks,
    ...(isAuthenticated ? protectedLinks : []),
  ];

  // Add admin route if user has admin role
  if (userRole === 'ADMIN') {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </button>
                <Link to="/UserProfilePage">
                  <UserAvatar />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-white bg-primary-600 px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-gray-600"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/UserProfilePage"
                    className="text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 hover:text-primary-600 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;