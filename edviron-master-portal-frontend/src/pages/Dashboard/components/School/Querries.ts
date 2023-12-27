import { gql } from "@apollo/client";

export const SEND_CREDENTIALS_TO_SUPER_ADMIN = gql`
  mutation SendCredentialsToSuperAdmin($school_id: String!) {
    sendCredentialsToSuperAdmin(school_id: $school_id)
  }
`;

export const SCHOOL_LOGO_UPLOAD = gql`
  mutation UploadSchoolLogo($image_data: String!, $school_id: String!) {
    uploadSchoolLogo(image_data: $image_data, school_id: $school_id)
  }
`;
