import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../query/posts';
import { Link, useParams } from 'react-router-dom';
import Modal from '../components/UI/Modal/Modal';
import PostsUpdate from '../components/PostsUpdate';
import CommentsCreate from '../components/CommentsCreate';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';

export default function PostsItem() {
  const [post, setPost] = useState(null);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_POST, { variables: { id } });

  useEffect(() => {
    if (!loading) {
      setPost(data.post);
    }
  }, [data]);

  return (
    <div>
      {error && error.message}
      {!(error || loading) && post && (
        <>
          {user && user.user.id === post.author.id && (
            <>
              <Button onClick={() => setVisible(true)} variant="contained" sx={{ mt: 3 }}>
                Update Post
              </Button>
              {visible && (
                <Modal visible={visible} setVisible={setVisible}>
                  <PostsUpdate
                    title={post.title}
                    body={post.body}
                    id={post.id}
                    setVisible={setVisible}
                  />
                </Modal>
              )}
            </>
          )}

          <Typography variant="h2" component="h2">
            {post.title}
          </Typography>
          <Typography variant="p" component="p">
            {post.body}
          </Typography>
          <p>
            author: <Link to={`/users/${post.author.id}`}>{post.author.name}</Link>
          </p>
          <Typography variant="h4" component="h4">
            Comments
          </Typography>
          {user && <CommentsCreate postId={post.id} />}
          <List>
            {post.comments.map(({ id, text }) => (
              <ListItem key={id}>
                <ListItemText secondary={text} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
}
