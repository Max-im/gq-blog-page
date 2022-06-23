import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../query/posts';
import Modal from '../components/UI/Modal/Modal';
import Post from '../components/Post';
import PostsCreate from '../components/PostsCreate';
import { AuthContext } from '../context/authContext';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [shownModal, setVisible] = useState(false);
  const { data, loading, error } = useQuery(GET_POSTS);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      setPosts(data.posts);
    }
  }, [data]);

  return (
    <div>
      {loading && 'Loading...'}
      {error && error.message}
      {!(loading || error) && (
        <>
          <h1>Posts</h1>
          {user && <button onClick={() => setVisible(true)}>Create Post</button>}
          {!user && <p>Login to create a post</p>}
          <Modal visible={shownModal} setVisible={setVisible}>
              <PostsCreate setVisible={setVisible} />
          </Modal>
          <ul>
            {posts.map((post) => <Post key={post.id} post={post} />)}
          </ul>
        </>
      )}
    </div>
  );
}
