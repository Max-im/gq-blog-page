import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../query/users';
import { Link, useParams } from 'react-router-dom';
import Modal from '../components/UI/Modal/Modal';
import UsersUpdate from '../components/UsersUpdate';

export default function UsersItem() {
  const [currentUser, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const { data, loading } = useQuery(GET_USER, { variables: { id } });

  useEffect(() => {
    if (!loading) {
      setUser(data.user);
    }
  }, [data]);

  const onUpdateUser = () => {
    setVisible(true);
  };

  console.log(currentUser)

  return (
    <div>
      <h1>User Data:</h1>
      {loading && 'Loading...'}
      {currentUser && (
        <>
          <h3>{currentUser.name}</h3>
          {currentUser.id === user.user.id && (
            <>
              <button onClick={onUpdateUser}>Update User</button>
              <Modal visible={visible} setVisible={setVisible}>
                <UsersUpdate
                  setVisible={setVisible}
                  age={currentUser.age}
                  name={currentUser.name}
                />
              </Modal>
            </>
          )}
          <p>{currentUser.email}</p>
          <p> age: {currentUser.age}</p>
          <h3>Posts:</h3>
          <ul>
            {currentUser.posts.map(({ id, title }) => (
              <li key={id}>
                <Link to={`/posts/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
          <h3>Comments:</h3>
          <ul>
            {currentUser.comments.map(({ id, text }) => (
              <li key={id}>{text}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
