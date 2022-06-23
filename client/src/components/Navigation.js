import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <ul style={{display: 'flex'}}>
        <li style={{margin: '0 10px'}}>
          <Link to="/">Posts</Link>
        </li>
        <li style={{margin: '0 10px'}}>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
}
