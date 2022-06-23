import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../mutations/posts';
import { GET_POSTS } from '../query/posts';

export default function PostsCreate({setVisible}) {
  const postTmpl = { title: '', body: '', published: true };
  const [newPostInput, setPostInput] = useState({ ...postTmpl });
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const onCreatePost = (e) => {
    e.preventDefault();
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
      <h3>Create Post</h3>
      <form onSubmit={onCreatePost}>
        <div style={{marginTop: '10px'}}>
          <p>Title</p>
          <input type="text" name="title" value={newPostInput.title} onChange={inputChange} />
        </div>
        <div style={{marginTop: '10px'}}>
          <p>Body</p>
          <textarea style={{width: '500px', height: '150px'}} type="text" name="body" value={newPostInput.body} onChange={inputChange} />
        </div>

        <button type="submit" style={{marginTop: '10px'}}>Create Post</button>
      </form>
    </div>
  );
}
