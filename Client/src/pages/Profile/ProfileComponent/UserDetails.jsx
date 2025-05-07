import React from 'react';
import { MapPin, Calendar, Globe, Users, Compass, Heart } from 'lucide-react';

const UserDetails = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full transition-shadow duration-300 hover:shadow-lg">
      {/* Cover Image with Subtle Overlay */}
      <div className="relative h-48 md:h-56 bg-gradient-to-br from-blue-400 via-blue-200 to-blue-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="relative px-5 py-6 md:px-8 md:py-8 -mt-16 md:-mt-20">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6">
          {/* Profile Picture */}
          <div className="relative shrink-0 -mt-16 md:-mt-20">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 hover:scale-105"
            />
            {user.isOnline && (
              <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            )}
          </div>

          {/* Name and Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-grow space-y-1.5">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.name}
              {user.isVerified && (
                <span className="ml-1.5 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-gray-600 text-sm">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1.5 text-indigo-500" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1.5 text-indigo-500" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full sm:w-auto mt-2 md:mt-0">
            <button className="px-5 py-1.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm text-sm">
              Follow
            </button>
            <button className="px-5 py-1.5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 text-sm">
              Message
            </button>
          </div>
        </div>

        {/* Bio Section */}
        {user.bio && (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {user.bio}
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-indigo-600 mb-1">
              <Globe size={18} className="mr-1.5" />
              <span className="text-sm font-medium">Recommendations</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{user.stats.recommendationsCount}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-purple-600 mb-1">
              <Compass size={18} className="mr-1.5" />
              <span className="text-sm font-medium">Trips</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{user.stats.tripsCount}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-blue-600 mb-1">
              <Users size={18} className="mr-1.5" />
              <span className="text-sm font-medium">Followers</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{user.stats.followersCount}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-pink-600 mb-1">
              <Heart size={18} className="mr-1.5" />
              <span className="text-sm font-medium">Following</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{user.stats.followingCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;