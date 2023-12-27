// Querries.ts for Trustees

import { gql } from "@apollo/client";

export const GET_TRUSTEES = gql`
  query Trustees {
    trustees {
      _id
      createdAt
      name
      email_id
      school_limit
      IndexOfApiKey
      phone_number
    }
  }
`;

export const CREATE_TRUSTEE = gql`
  mutation Create_trustee(
    $name: String!
    $email_id: String!
    $password_hash: String!
    $school_limit: Int
    $IndexOfApiKey: Int
    $phone_number: Int
  ) {
    create_trustee(
      name: $name
      email_id: $email_id
      password_hash: $password_hash
      school_limit: $school_limit
      IndexOfApiKey: $IndexOfApiKey
      phone_number: $phone_number
    ) {
      _id
      createdAt
      name
      email_id
      school_limit
      IndexOfApiKey
      phone_number
    }
  }
`;

export const EDIT_TRUSTEE = gql`
  mutation Edit_trustee(
    $_id: String!
    $name: String
    $email_id: String
    $password_hash: String
    $school_limit: Int
    $IndexOfApiKey: Int
    $phone_number: Int
  ) {
    edit_trustee(
      _id: $_id
      name: $name
      email_id: $email_id
      password_hash: $password_hash
      school_limit: $school_limit
      IndexOfApiKey: $IndexOfApiKey
      phone_number: $phone_number
    ) {
      _id
      createdAt
      name
      email_id
      school_limit
      IndexOfApiKey
      phone_number
    }
  }
`;

export const DELETE_TRUSTEE = gql`
  mutation Delete_trustee($id: String!) {
    delete_trustee(id: $id)
  }
`;
