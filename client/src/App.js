import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { AuthContext } from './context/authContext';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="app">
        <Header />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
