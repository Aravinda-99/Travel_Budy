import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Compass, BookOpen, Calendar, Award, Settings } from 'lucide-react';
import UserAvatar from '../shared/UserAvatar';

const ItinerarySideebar = () => {
  const sidebarLinks = [
    { icon: <Users size={20} />, label: 'Friends', path: '/friends' },
    { icon: <Compass size={20} />, label: 'Explore', path: '/explore' },
    { icon: <BookOpen size={20} />, label: 'Travel Guides', path: '/guides' },
    { icon: <Calendar size={20} />, label: 'Events', path: '/events' },
    { icon: <Award size={20} />, label: 'Top Locations', path: '/top-locations' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-full md:max-w-xs"> {/* Added md:max-w-xs for responsiveness */}
      {/* User Profile Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col items-center text-center">
          <UserAvatar size="xl" status="online" />
          <h2 className="mt-3 font-bold text-gray-900">Alex Johnson</h2>
          <p className="text-sm text-gray-600">Travel enthusiast · 28 posts</p>

          <div className="mt-4 grid grid-cols-3 w-full gap-2 text-center text-xs">
            <div className="p-2">
              <p className="font-semibold text-gray-900">167</p>
              <p className="text-gray-600">Followers</p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-gray-900">143</p>
              <p className="text-gray-600">Following</p>
            </div>
            <div className="p-2">
              <p className="font-semibold text-gray-900">12</p>
              <p className="text-gray-600">Countries</p>
            </div>
          </div>

          <Link to="/profile" className="mt-3 w-full btn btn-outline py-1.5">
            View Profile
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-800">Explore</h3>
        </div>

        <nav className="p-1">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
            >
              <span className="text-gray-500">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer Links */}
      <div className="mt-6 px-2 text-xs text-gray-500">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <Link to="/help" className="hover:underline">Help Center</Link>
        </div>
        <p className="mt-2">© 2025 Travel Buddy</p>
      </div>
    </div>
  );
};

export default ItinerarySideebar;