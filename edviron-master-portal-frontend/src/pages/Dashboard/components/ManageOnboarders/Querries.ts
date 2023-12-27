import { gql } from "@apollo/client";

export const GET_ONBOARDERS = gql`
  query Onboarders {
    onboarders {
      _id
      createdAt
      email
      name
      phone_number
      updatedAt
      schools {
        _id
        leed {
          _id
          status
        }
      }
    }
  }
`;

export const CREATE_ONBORDER = gql`
  mutation Create_onboarder(
    $email: String!
    $name: String!
    $password: String!
    $phone_number: String!
  ) {
    create_onboarder(
      email: $email
      name: $name
      password: $password
      phone_number: $phone_number
    ) {
      _id
      createdAt
      email
      name
      phone_number
      updatedAt
    }
  }
`;

export const EDIT_ONBORDERS = gql`
  mutation Edit_onboarder(
    $_id: String!
    $email: String
    $name: String
    $password: String
    $phone_number: String
  ) {
    edit_onboarder(
      _id: $_id
      email: $email
      name: $name
      password: $password
      phone_number: $phone_number
    ) {
      _id
      createdAt
      email
      name
      phone_number
      updatedAt
    }
  }
`;

export const DELETE_ONBORDER = gql`
  mutation Delete_onboarder($id: String!) {
    delete_onboarder(id: $id)
  }
`;
