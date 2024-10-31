import React, { useContext } from 'react';
import { AuthContext } from '../Components/Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const Private = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return children;
  }

  // Show alert and redirect if user is not authenticated
  alert('You need to be logged in to access this page.');
  return <Navigate to="/" />;
};

export default Private;
