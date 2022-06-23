import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../mutations/posts';
import { GET_POSTS } from '../query/posts';

export default function PostsUpdate({id, setVisible, title='', body=''}) {
  const postTmpl = { title, body, published: true };
  const [postInput, setPostInput] = useState({ ...postTmpl });
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);

  const onUpdatePost = (e) => {
    e.preventDefault();
    updatePost({
      variables: { id, input: { ...postInput } },
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
    setPostInput({ ...postInput, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3>Create Post</h3>
      <form onSubmit={onUpdatePost}>
        <div style={{marginTop: '10px'}}>
          <p>Title</p>
          <input type="text" name="title" value={postInput.title} onChange={inputChange} />
        </div>
        <div style={{marginTop: '10px'}}>
          <p>Body</p>
          <textarea style={{width: '500px', height: '150px'}} type="text" name="body" value={postInput.body} onChange={inputChange} />
        </div>

        <button type="submit" style={{marginTop: '10px'}}>Update Post</button>
      </form>
    </div>
  );
}
