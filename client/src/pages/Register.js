import React, { useEffect, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../mutations/users';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const userData = { name: '', email: '', password: '', age: 0 };
  const [user, serUserData] = useState({ ...userData });
  const [createUser, { data, loading, error }] = useMutation(REGISTER);
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    createUser({
      variables: { input: {...user, age: Number(user.age)} },
    });
  };

  const inputChange = (e) => {
    serUserData({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
      if (!loading && data) {
          const currentUser = {token: data.createUser.token, user: data.createUser.user};
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
      <form onSubmit={register}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={inputChange} />
        </div>
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
        <div>
          <label>Age</label>
          <input type="text" name="age" value={user.age} onChange={inputChange} />
        </div>

        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}
