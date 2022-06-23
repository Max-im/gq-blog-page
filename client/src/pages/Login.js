import React, { useEffect, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../mutations/users';
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const userData = { email: '', password: '' };
  const [user, serUserData] = useState({ ...userData });
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    login({ variables: {input: user}});
  };

  const inputChange = (e) => {
    serUserData({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
      if (!loading && data) {
          const currentUser = {token: data.login.token, user: data.login.user};
          setUser(currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser));
          serUserData({...userData});
          navigate('/');
      }
  }, [data]);
    
  return (
    <div>
        {loading && 'Loading...'}
      <h1>Regisger</h1>
      <form onSubmit={onLogin}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={inputChange} />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={inputChange}
          />
        </div>
        
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}
