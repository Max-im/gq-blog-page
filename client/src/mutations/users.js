import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      user {
          name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginUserInput!) {
    login(input: $input) {
      token
      user {
          id
          name
      }
    }
  }
`;


export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      age
    }
  }
`;
