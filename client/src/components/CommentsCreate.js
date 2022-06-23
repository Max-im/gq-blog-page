import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../mutations/comments';
import { GET_POST } from '../query/posts';
import { Alert, Button, TextField } from '@mui/material';

export default function CommentsCreate({ postId }) {
  const tmpl = { post: postId, text: '' };
  const [commentInput, setInput] = useState({ ...tmpl });
  const [createComment, { data, loading, error }] = useMutation(CREATE_COMMENT, {
    errorPolicy: 'all',
  });

  const onCreatePost = (e) => {
    e.preventDefault();
    createComment({
      variables: { input: { ...commentInput } },
      refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
    });
  };

  useEffect(() => {
    if (!loading && data) {
      setInput({ ...tmpl });
    }
  }, [data]);

  const inputChange = (e) => {
    setInput({ ...commentInput, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={onCreatePost}>
        <div style={{ marginTop: '10px' }}>
          <TextField
            label="Comment"
            multiline
            rows={6}
            variant="outlined"
            name="text"
            value={commentInput.text}
            onChange={inputChange}
          />
        </div>
        {error &&
          error.graphQLErrors.map(({ message }, i) => (
            <Alert severity="error" key={i}>
              {message}
            </Alert>
          ))}
        <Button type="submit" sx={{ mt: 2 }} variant="contained">
          Add Comment
        </Button>
      </form>
    </div>
  );
}
