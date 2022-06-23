import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../mutations/users';
import { GET_USERS } from '../query/users';
import { Button, TextField, Typography } from '@mui/material';

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
      <Typography variant="h4" component="h4">
        Update Your Info
      </Typography>
      <form onSubmit={onUpdate}>
        <div style={{marginTop: '10px'}}>
          <TextField 
            id="name" 
            size="small" 
            label="Name" 
            variant="outlined"  
            name="name" 
            value={userInput.name} 
            onChange={inputChange} />
        </div>
        <div style={{marginTop: '10px'}}>
        <TextField 
            id="age" 
            size="small" 
            label="Age" 
            variant="outlined"  
            name="age" 
            type="number"
            value={userInput.age} 
            onChange={inputChange} />
        </div>
        <Button type="submit" sx={{mt: 2}} variant="contained">Update</Button>
      </form>
    </div>
  );
}
