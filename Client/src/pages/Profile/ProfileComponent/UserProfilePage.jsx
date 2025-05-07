import React from 'react';
import UserDetails from '../Profile/ProfileComponent/UserDetails.jsx';
import { mockUser } from '../Profile/ProfileComponent/mockUser.jsx';

const UserProfilePage = () => {
  return (
   
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
          <UserDetails user={mockUser} />
      </div>

  );
};

export default UserProfilePage;