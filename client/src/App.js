import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AuthMenu from './components/AuthMenu';
import Navigation from './components/Navigation';
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
        <header className="header container">         
          <Navigation />
          <AuthMenu />
        </header>
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
