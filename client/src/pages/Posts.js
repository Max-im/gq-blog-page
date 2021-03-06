import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../query/posts';
import Modal from '../components/UI/Modal/Modal';
import Post from '../components/Post';
import PostsCreate from '../components/PostsCreate';
import { AuthContext } from '../context/authContext';
import Typography from '@mui/material/Typography';
import { Box, Button, Skeleton } from '@mui/material';

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
      {error && error.message}
      {!error && (
        <>
          <Typography variant="h2" color="inherit" component="h2">
            Posts
          </Typography>

          {user && (
            <Button onClick={() => setVisible(true)} variant="contained">
              Create Post
            </Button>
          )}
          {!user && <p>Login to create a post</p>}
          <Modal visible={shownModal} setVisible={setVisible}>
            <PostsCreate setVisible={setVisible} />
          </Modal>

          <Box sx={{ mt: 3, display: 'flex' }}>
            {loading &&
              [1, 2, 3].map((i) => (
                <Box sx={{ mr: 2 }} key={i}>
                  <Skeleton />
                  <Skeleton variant="rectangular" width={150} height={110} />
                </Box>
              ))}

            {!loading && posts.map((post) => <Post key={post.id} post={post} />)}
          </Box>
        </>
      )}
    </div>
  );
}
