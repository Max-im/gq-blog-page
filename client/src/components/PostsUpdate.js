import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../mutations/posts';
import { GET_POSTS } from '../query/posts';
import { Button, TextField, Typography } from '@mui/material';

export default function PostsUpdate({ id, setVisible, title = '', body = '' }) {
  const postTmpl = { title, body, published: true };
  const [postInput, setPostInput] = useState({ ...postTmpl });
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);

  const onUpdatePost = (e) => {
    e.preventDefault();
    updatePost({
      variables: { id, input: { ...postInput } },
      refetchQueries: [{ query: GET_POSTS }],
    });
  };

  useEffect(() => {
    if (!loading && data) {
      setVisible(false);
      setPostInput({ ...postTmpl });
    }
  }, [data]);

  const inputChange = (e) => {
    setPostInput({ ...postInput, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Typography variant="h4" component="h4">
        Update Post
      </Typography>
      <form onSubmit={onUpdatePost}>
        <div style={{ marginTop: '10px' }}>
          <TextField
            size="small"
            label="Title"
            variant="outlined"
            name="title"
            value={postInput.title}
            onChange={inputChange}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <TextField
            id="filled-multiline-static"
            label="Body"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            name="body"
            value={postInput.body}
            onChange={inputChange}
          />
        </div>
        <Button type="submit" sx={{mt: 2}} variant="contained">Update</Button>
      </form>
    </div>
  );
}
