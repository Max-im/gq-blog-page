import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../mutations/users';
import { GET_USERS } from '../query/users';

export default function UsersUpdate({setVisible, name='', age=''}) {
  const userTmpl = { name, age };
  const [userInput, setUserInput] = useState({ ...userTmpl });
  const [updateUser, { data, loading }] = useMutation(UPDATE_USER);

  const onUpdate = (e) => {
    e.preventDefault();
    const input = { ...userInput }
    if (input.age) input.age = Number(input.age);

    updateUser({
      variables: { input },
      refetchQueries: [{ query: GET_USERS }] 
    });
  };

  useEffect(() => {
    if (!loading && data) {
      setVisible(false);
    }
  }, [data]);

  const inputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3>Update User</h3>
      <form onSubmit={onUpdate}>
        <div style={{marginTop: '10px'}}>
          <p>Name</p>
          <input type="text" name="name" value={userInput.name} onChange={inputChange} />
        </div>
        <div style={{marginTop: '10px'}}>
          <p>Age</p>
          <input type="text" name="age" value={userInput.age} onChange={inputChange} />
        </div>

        <button type="submit" style={{marginTop: '10px'}}>Update</button>
      </form>
    </div>
  );
}
