import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function AuthMenu() {
  const { user, setUser } = useContext(AuthContext);
  
  const onLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <ul style={{display: 'flex'}}>
      {user && <li onClick={onLogout}>Logout</li>}
      {!user && (
        <>
          <li style={{margin: '0 10px'}}>
            <Link to="/register">Register</Link>
          </li>
          <li style={{margin: '0 10px'}}>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </ul>
  );
}
