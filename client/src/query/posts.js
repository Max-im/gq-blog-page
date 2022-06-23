import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      body
      author {
          id
          name
      }
    }
  }
`;

export const GET_POST = gql`
  query Post ($id: ID!){
    post (postId: $id) {
      id
      title
      body
      author {
        id
        name
      }
      comments {
        id
        text
      }
    }
  }
`;