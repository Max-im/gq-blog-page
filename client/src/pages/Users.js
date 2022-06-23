import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../query/users';
import { Link } from 'react-router-dom';

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
      {loading && 'Loading...'}
      <h1>Authors:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
