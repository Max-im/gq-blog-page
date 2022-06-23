import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID!) {
    user (id: $id) {
      id
      name
      age
      email
      comments {
        id
        text
      }
      posts {
        id
        title
        body
      }
    }
  }
`;