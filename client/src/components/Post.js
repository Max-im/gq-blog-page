import React, { useContext } from 'react';
import { DELETE_POST } from '../mutations/posts';
import { GET_POSTS } from '../query/posts';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MultiActionAreaCard({ post }) {
  const navigate = useNavigate();
  const [deletePost, { error }] = useMutation(DELETE_POST);
  const { user } = useContext(AuthContext);

  const onRemovePost = (id) => {
    deletePost({
      variables: { id },
      refetchQueries: [{ query: GET_POSTS }],
    });
  };

  return (
    <Card sx={{ maxWidth: 345, mr:2 }}>
      {error && error.message}
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => navigate(`/users/${post.author.id}`)}>
          author: {post.author.name}
        </Button>
        {user && user.user.id === post.author.id && (
          <Button size="small" color="error" onClick={() => onRemovePost(post.id)}>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
