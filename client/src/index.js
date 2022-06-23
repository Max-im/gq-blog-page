import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import './style.css';

import App from './App';
import Error from './pages/Error';
import Posts from './pages/Posts';
import Users from './pages/Users';
import PostsItem from './pages/PostsItem';
import Register from './pages/Register';
import Login from './pages/Login';
import UsersItem from './pages/UsersItem';

const authLink = setContext((_, { headers }) => {
  const currentUser = localStorage.getItem('user');
  let token;
  
  if (currentUser) {
    const userData = JSON.parse(currentUser);
    token = userData.token;
  }  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({ uri: '/graphql' });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
      <Route exect path="/" element={<App />}>
        <Route index element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostsItem />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UsersItem />} />
        <Route path="error" element={<Error />} />
      </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
