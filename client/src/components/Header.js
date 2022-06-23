import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Navigation from './Navigation';
import AuthMenu from './AuthMenu';
import { Toolbar } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Navigation />
          <AuthMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
