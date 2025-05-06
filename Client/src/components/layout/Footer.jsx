import React from 'react';
import { Globe, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold text-white">
                Travel<span className="text-primary-400">Buddy</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Connect with fellow travelers, share experiences, and discover breathtaking destinations around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/feed" className="text-gray-400 hover:text-primary-400 transition-colors">Feed</Link></li>
              <li><Link to="/destinations" className="text-gray-400 hover:text-primary-400 transition-colors">Destinations</Link></li>
              <li><Link to="/experiences" className="text-gray-400 hover:text-primary-400 transition-colors">Experiences</Link></li>
              <li><Link to="/guides" className="text-gray-400 hover:text-primary-400 transition-colors">Travel Guides</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-primary-400 transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-primary-400 transition-colors">Press Kit</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-primary-400 transition-colors">Help Center</Link></li>
              <li><Link to="/safety" className="text-gray-400 hover:text-primary-400 transition-colors">Safety Center</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-primary-400 transition-colors">Community Guidelines</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 TravelBuddy. All rights reserved.</p>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 flex gap-4">
            <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-primary-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;