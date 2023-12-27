import { gql } from "@apollo/client";

export const GET_LEEDS = gql`
  query Leeds {
    leeds {
      _id
      status
      createdAt
      data
      onboarder_id
      prospect_id
      updatedAt
      school {
        onboarder_id
      }
    }
  }
`;

export const ASSIGN_ONBORDER_TO_LEED = gql`
  mutation Assign_onboarder($leed_id: String!, $onboarder_id: String!) {
    assign_onboarder(leed_id: $leed_id, onboarder_id: $onboarder_id)
  }
`;

export const FETCH_LEEDS = gql`
  mutation Fetch_leeds {
    fetch_leeds {
      _id
      createdAt
      data
      onboarder_id
      prospect_id
      school_id
      updatedAt
    }
  }
`;
