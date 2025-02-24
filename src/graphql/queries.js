// src/graphql/queries.js
import {gql} from '@apollo/client';


// Define the fragment
const VISITOR_DETAILS_FRAGMENT = gql`
  fragment VisitorDetails on visitors {
    companyName
    createdAt
    email
    firstName
    id
    interestsIds
    lastName
    phoneNumber
    updatedAt
  }
`;

export const GET_VISITOR_INTERESTS = gql`
 query GetVisitorInterests {
  visitorInterests{
    translations
    id
  }
}
`;


export const GET_ZONE_ITEMS = gql`
  query GetZoneItems {
    zoneItems {
      id
      status
      name
      classname
      zoneId
    }
  }
`;


export const GET_TYPES = gql`
query GetTypes {
    types {
        name
    }
}
`;

export const GET_EVENT_USERS = gql`
query GetEventUsers {
  eventUsers {
    event
  }
}
`;

export const GET_ZONES = gql`
 query GetZones {
   zones {
    name
    id
    availableNumbers
  }
}
`;

// query MyQuery {
//       visitorInterests {
//             id
//             translations
//             type
//             createdAt
//             updatedAt
//       }
// }

export const ADD_VISITOR = gql`
  mutation AddVisitor(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $notes: String,
    $companyName: String!,
    $interestsIds: json!,
    $phoneNumber: String,
  ) {
    insertVisitors(
      objects: [{
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        notes: $notes,
        companyName: $companyName,
        phoneNumber: $phoneNumber,
        interestsIds: $interestsIds,
      }]
    ) {
      affected_rows
    }
  }
`;

export const ADD_VISITOR_WITH_TYPE = gql`
  mutation AddVisitor(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $notes: String,
    $companyName: String!,
    $interestsIds: json!,
    $phoneNumber: String,
    $type: types_enum
  ) {
    insertVisitors(
      objects: [{
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        notes: $notes,
        companyName: $companyName,
        phoneNumber: $phoneNumber,
        interestsIds: $interestsIds,
        type: $type
      }]
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_VISITOR = gql`
  mutation UpdateVisitor(
    $id: uuid!,
    $_set: visitors_set_input!
  ) {
    updateVisitors(
      where: { id: { _eq: $id } },
      _set: $_set
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_ZONE_ITEM = gql`
  mutation UpdateZoneItem($id: uuid!, $_set: zoneItems_set_input!) {
    updateZoneItem(pk_columns: { id: $id }, _set: $_set) {
      affected_rows
      returning {
        status
      }
    }
  }
`;

export const UPDATE_ZONE_ITEMS = gql`
  mutation UpdateZoneItems($where: zoneItems_bool_exp!, $_set: zoneItems_set_input!) {
    updateZoneItems(where: $where, _set: $_set) {
      affected_rows
      returning {
        status
      }
    }
  }
`

export const UPDATE_ZONE_ITEM_STATUS = gql`
  mutation UpdateZoneItemStatus($id: uuid!, $_set: zoneItemStatuses_set_input!) {
    updateZoneItemStatus(pk_columns: { id: $id }, _set: $_set) {
      affected_rows
      returning {
        status
      }
    }
  }`


export const ADD_EXHIBITOR = gql`
  mutation AddExhibitor(
    $brands: String!,
    $companyName: String!,
    $email: String!,
    $industry: String!,
    $message: String!,
    $notes: String!,
    $phoneNumber: String!,
    $website: String!,
    $zoneId: uuid!,
    $zoneNumbers: jsonb!
  ) {
    insertExhibitors(
      objects: [{
        brands: $brands,
        companyName: $companyName,
        email: $email,
        industry: $industry,
        message: $message,
        notes: $notes,
        phoneNumber: $phoneNumber,
        website: $website,
        zoneId: $zoneId,
        zoneNumbers: $zoneNumbers
      }]
    ) {
      affected_rows
    }
  }
`;


export const SIGN_IN_QUERY = gql`
  query SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      session {
        accessToken
        user 
      }
    }
  }
`;

export const VISITOR_ENTERED_MUTATION = gql`
  mutation VisitorEntered($id: uuid!) {
    updateVisitor(pk_columns: { id: $id }, _set: { status: ENTERED }) {
      id
    }
    insertEntry(object: { visitorId: $id }) {
      id
    }
  }
`;
