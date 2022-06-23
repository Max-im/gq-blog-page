import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../mutations/comments';
import { GET_POST } from '../query/posts';

export default function CommentsCreate({postId}) {
  const tmpl = { post: postId, text: '' };
  const [commentInput, setInput] = useState({...tmpl});
  const [createComment, { data, loading }] = useMutation(CREATE_COMMENT);

  const onCreatePost = (e) => {
    e.preventDefault();
    createComment({
      variables: { input: { ...commentInput } },
      refetchQueries: [{ query: GET_POST, variables: {id: postId} }] 
    });
  };

  useEffect(() => {
    if (!loading && data) {
      setInput({...tmpl});
    }
  }, [data]);

  const inputChange = (e) => {
    setInput({ ...commentInput, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3>Create Comment</h3>
      <form onSubmit={onCreatePost}>
        <div style={{marginTop: '10px'}}>
          <p>Comment:</p>
          <textarea style={{width: '500px', height: '150px'}} type="text" name="text" value={commentInput.text} onChange={inputChange} />
        </div>

        <button type="submit" style={{marginTop: '10px'}}>Create</button>
      </form>
    </div>
  );
}
