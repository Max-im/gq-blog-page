import React, { useEffect, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../mutations/users';
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Skeleton, TextField, Typography } from '@mui/material';

export default function Login() {
  const userData = { email: '', password: '' };
  const [user, serUserData] = useState({ ...userData });
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    login({ variables: { input: user } });
  };

  const inputChange = (e) => {
    serUserData({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!loading && data) {
      const currentUser = { token: data.login.token, user: data.login.user };
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
      serUserData({ ...userData });
      navigate('/');
    }
  }, [data]);

  return (
    <div>
      {loading && <Skeleton variant="rectangular" width={210} height={118} />}
      <Typography variant="h2" component="h2">
        Login
      </Typography>
      <form onSubmit={onLogin}>
        <div>
          <TextField
            sx={{ mb: 2 }}
            id="email"
            value={user.email}
            onChange={inputChange}
            label="Email"
            size="small"
            variant="outlined"
            name="email"
          />
        </div>
        <div>
          <TextField
            sx={{ mb: 2 }}
            id="password"
            value={user.password}
            onChange={inputChange}
            label="Password"
            type="password"
            size="small"
            variant="outlined"
            name="password"
          />
        </div>
        <Button type="submit" sx={{ mt: 2, mb: 3 }} variant="contained">
          Login
        </Button>
      </form>
      <Button variant="text">
        <Link to="/register">Register</Link>
      </Button>
    </div>
  );
}
