import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';


const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      // Call the /logout route to log the user out of the authentication session
    //   const response = await fetch('https://fierce-pear-pelican.cyclic.app/api/auth/logout', {
    //     method: 'POST',
    //     credentials: 'include', // Include cookies in the request
    //   });


    localStorage.removeItem('access_token');
    sessionStorage.clear();

    dispatch(logout());

    //   if (response.ok) {
    //     console.log('Logout successful');
    //     // Clear access_token from local storage
    //     localStorage.removeItem('access_token');
    //     sessionStorage.clear();

    //     dispatch(logout());

    //     window.location.reload();
    //     // navigate('/')
    //   } else {
    //     console.error('Logout failed');
    //   }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
