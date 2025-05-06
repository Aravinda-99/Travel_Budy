import React from 'react';

const UserAvatar = ({ size = 'md', src, status }) => {
  // Set different sizes
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  // Default avatar if no src is provided
  const defaultAvatar = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150';
  
  return (
    <div className="relative inline-block">
      <img 
        src={src || defaultAvatar} 
        alt="User avatar" 
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
      />
      {status && (
        <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${
          status === 'online' ? 'bg-green-500' : 
          status === 'busy' ? 'bg-red-500' : 
          status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
        }`} />
      )}
    </div>
  );
};

export default UserAvatar;