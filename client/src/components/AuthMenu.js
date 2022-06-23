import { Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function AuthMenu() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      {user && (
        <Button onClick={onLogout} sx={{ my: 2, color: 'white', display: 'block' }}>
          Logout
        </Button>
      )}

      {!user && (
        <Box component="div" sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
          <Button
            onClick={() => navigate('/register')}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Register
          </Button>
          <Button
            onClick={() => navigate('/login')}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Login
          </Button>
        </Box>
      )}
    </>
  );
}
