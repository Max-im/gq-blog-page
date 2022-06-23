import React, { useEffect, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../mutations/users';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Skeleton, TextField, Typography } from '@mui/material';

export default function Register() {
  const userData = { name: '', email: '', password: '', age: 0 };
  const [user, serUserData] = useState({ ...userData });
  const [createUser, { data, loading, error }] = useMutation(REGISTER);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    createUser({
      variables: { input: { ...user, age: Number(user.age) } },
    });
  };

  const inputChange = (e) => {
    serUserData({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!loading && data) {
      const currentUser = { token: data.createUser.token, user: data.createUser.user };
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
      serUserData({ ...userData });
      navigate('/');
    }
  }, [data]);

  return (
    <div>
      {loading && <Skeleton variant="rectangular" width={210} height={118} />}
      {!loading && (
        <>
          <Typography variant="h2" component="h2">
              Regisger
          </Typography>
          <form onSubmit={register}>
            <div>
              <TextField 
              sx={{mb:2}}
                id="name" 
                value={user.name} 
                onChange={inputChange} 
                label="Name" 
                size="small"
                variant="outlined" 
                name="name" />
            </div>
            <div>
              <TextField 
                sx={{mb:2}}
                id="email" 
                value={user.email} 
                onChange={inputChange} 
                label="Email" 
                size="small"
                variant="outlined" 
                name="email" />
            </div>
            <div>
            <TextField 
                sx={{mb:2}}
                id="password" 
                value={user.password} 
                onChange={inputChange} 
                label="Password" 
                size="small"
                type="password"
                variant="outlined" 
                name="password" />
            </div>
            <div>
            <TextField 
                sx={{mb:2}}
                id="age" 
                value={user.age} 
                onChange={inputChange} 
                label="Age" 
                size="small"
                type="number"
                variant="outlined" 
                name="age" />
            </div>
            <Button type="submit" sx={{mt: 2, mb: 3}} variant="contained">Register</Button>
          </form>
          <Button variant="text">
            <Link to="/login">Login</Link>
          </Button>

        </>
      )}
    </div>
  );
}
