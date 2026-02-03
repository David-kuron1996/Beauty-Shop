import React from 'react';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import AdminProfile from './AdminProfile';

const ProfileRouter = () => {
  const { user } = useSelector((state) => state.auth);
  
  // Show admin profile for admin users, regular profile for customers
  if (user?.role === 'admin') {
    return <AdminProfile />;
  }
  
  return <Profile />;
};

export default ProfileRouter;