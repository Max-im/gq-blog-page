import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // version 5.2.0

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <Box component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button onClick={() => navigate('/')} sx={{ my: 2, color: 'white', display: 'block' }}>
        Posts
      </Button>
      <Button onClick={() => navigate('/users')} sx={{ my: 2, color: 'white', display: 'block' }}>
        Users
      </Button>
    </Box>
  );
}
