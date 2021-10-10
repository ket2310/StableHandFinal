import { gql } from '@apollo/client';

export const QUERY_RIDERS = gql`
  # create a GraphQL query to be executed by Apollo Client

  query getRiders{
      riders {
          _id
          firstName
          lastName
          phone
          email
      }
  }`;

export const QUERY_INSTRUCTORS = gql`
    query getInstructors {
        instructors {
            _id
            firstName
            lastName
        }
    }
    `;

export const QUERY_HORSES = gql`
   query getHorses {
        horses {
            _id
            name
            lessonCount
            lessonLimit
        }
    }
`;