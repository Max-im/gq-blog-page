import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DELETE_POST } from '../mutations/posts';
import {GET_POSTS} from '../query/posts'
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import classes from './Post.module.css';

export default function Post({post}) {
  const [deletePost, { error }] = useMutation(DELETE_POST);
  const { user } = useContext(AuthContext);

  const onRemovePost = (id) => {
    deletePost({
      variables: { id },
      refetchQueries: [{ query: GET_POSTS }] 
    });
  }

  return (
    <li className={classes.postItem}>
      {error && error.message}
      {user && user.user.id === post.author.id && 
        <p style={{cursor: 'pointer'}} onClick={() => onRemovePost(post.id)}>x</p>
      } 
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p>{post.body}</p>
      <p>
        by {' '}
        <Link to={`/users/${post.author.id}`}>{post.author.name}</Link>
      </p>
    </li>
  );
}
