import { gql } from '@apollo/client';

export const QUERY_RIDERS = gql`
  # create a GraphQL query to be executed by Apollo Client

  query getRiders{
      riders {
          _id
          firstName
          lastName         
      }
  }`;

  export const QUERY_A_RIDER = gql`
  query getARider($riderId: ID!) {
    rider(_id: $riderId) {
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

export const QUERY_AN_INSTRUCTOR = gql`
    query getAnInstructor($instructorId: ID!) {
        instructor(instructorId: $instructorId) {
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
        }
    }
`;

export const  QUERY_A_HORSE = gql`
    query getAHorse ($horseId: ID!) {
        horse(horseId: $horseId) {
            _id
            name
            lessonCount
            lessonLimit
        }
    }
`;

export const QUERY_TIMESLOT = gql`
    query getTimeSlot($lessonId: ID!)  {
        lesson(lessonId: $lessonId) {
          timeSlot
        }
      }
`;
