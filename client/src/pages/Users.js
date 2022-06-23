import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../query/users';
import { Link } from 'react-router-dom';
import { List, ListItem, Skeleton, Typography } from '@mui/material';

export default function Users() {
  const [users, setUsers] = useState([]);
  const { data, loading } = useQuery(GET_USERS);

  useEffect(() => {
    if (!loading) {
      setUsers(data.users);
    }
  }, [data]);

  return (
    <div>
      <Typography variant="h2" component="h2">
        Authors
      </Typography>
      {loading && [1,2,3,4,5,6,7,8,9,10].map(a => <Skeleton/>)}
      {!loading && 
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {users.map((user) => (
            <ListItem key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </ListItem>
          ))}
        </List>
      }
    </div>
  );
}
