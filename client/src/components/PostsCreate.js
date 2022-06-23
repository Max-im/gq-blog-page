import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../mutations/posts';
import { GET_POSTS } from '../query/posts';
import { Alert, Button, TextField, Typography } from '@mui/material';

export default function PostsCreate({setVisible}) {
  const postTmpl = { title: '', body: '', published: true };
  const [newPostInput, setPostInput] = useState({ ...postTmpl });
  const [errors, setErrors] = useState([]);
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const onCreatePost = (e) => {
    e.preventDefault();
    setErrors([]);

    const errArr = [];

    if (!newPostInput.title.length) {
      errArr.push('Title is required')
    }
    if (!newPostInput.body.length) {
      errArr.push('Body is required')
    }

    if (errArr.length) {
      setErrors(errArr);
      return;
    }

    createPost({
      variables: { input: { ...newPostInput } },
      refetchQueries: [{ query: GET_POSTS }] 
    });
  };

  useEffect(() => {
    if (!loading && data) {
      setVisible(false);
      setPostInput({...postTmpl});
    }
  }, [data]);

  const inputChange = (e) => {
    setPostInput({ ...newPostInput, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Typography variant="h4" component="h4">
        Create Post
      </Typography>
      <form onSubmit={onCreatePost}>
        <div style={{marginTop: '10px'}}>
          <TextField id="outlined-basic" label="Title" variant="outlined"  name="title" value={newPostInput.title} onChange={inputChange} />
        </div>
        <div style={{marginTop: '20px', width: '500px'}}>
          <TextField
            id="filled-multiline-static"
            label="Body"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            name="body" value={newPostInput.body} onChange={inputChange}
          />
        </div>
        <Button type="submit" sx={{mt: 2}} variant="contained">Create Post</Button>
        {errors.length > 0 && errors.map((err) => <Alert severity="error">{err}</Alert>)}
      </form>
    </div>
  );
}
