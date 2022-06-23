import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../query/users';
import { Link, useParams } from 'react-router-dom';
import Modal from '../components/UI/Modal/Modal';
import UsersUpdate from '../components/UsersUpdate';
import { Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function UsersItem() {
  const [author, setAuthor] = useState(null);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const { data, loading } = useQuery(GET_USER, { variables: { id } });

  useEffect(() => {
    if (!loading) {
      setAuthor(data.user);
    }
  }, [data]);

  const onUpdateUser = () => {
    setVisible(true);
  };

  return (
    <div>
      <Typography variant="h2" component="h2">
        Author Info
      </Typography>
      {loading && 'Loading...'}
      {author && (
        <>
          {user && user.user.id === author.id && (
            <>
              <Button onClick={onUpdateUser} variant="contained">
                Update Your Info
              </Button>
              <Modal visible={visible} setVisible={setVisible}>
                <UsersUpdate setVisible={setVisible} age={author.age} name={author.name} />
              </Modal>
            </>
          )}

          <TableContainer sx={{ mt: 2 }}>
            <TableBody>
              <TableRow>
                <TableCell scope="row">name</TableCell>
                <TableCell align="right">{author.name}</TableCell>
              </TableRow>
              {author.email && (
                <TableRow>
                  <TableCell scope="row">email</TableCell>
                  <TableCell align="right">{author.email}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell scope="row">age</TableCell>
                <TableCell align="right">{author.age}</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>

          <Typography variant="h4" component="h4" sx={{ mt: 2 }}>
            Author posts
          </Typography>
          <List>
            {author.posts.map(({ id, title }) => (
              <ListItem key={id}>
                <Link to={`/posts/${id}`}>
                  <ListItemText primary={title} />
                </Link>
              </ListItem>
            ))}
          </List>

          <Typography variant="h4" component="h4" sx={{ mt: 2 }}>
            Author Comments
          </Typography>
          <List>
            {author.comments.map(({ text }, i) => (
              <ListItem key={i}>
                  <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
}
