import { gql } from '@apollo/client';

export const BOOK_LESSON = gql`
mutation bookLesson (  $lessonDate: date!,
                       $startTime: String!,
                       $duration: Int!,
                       $timeSlot: String!,
                       $rider: RiderData,
                       $instructor: InstructorData,
                       $horse: HorseData
                    ) 
                    {
                         bookLesson (lessonDate: $lessonDate,
                                     startTime: $startTime, 
                                     duration: $duration,
                                     timeSlot: $timeSlot,
                                     rider: $rider, 
                                     instructor: $instructor, 
                                     horse: $horse 
                                    ) 
                                    {
                                        lessonDate
                                        startTime
                                        duration
                                        
                                          rider {
                                            _id
                                            lastName
                                            firstName
                                          }
                                          instructor {
                                            _id
                                            firstName
                                            lastName
                                          }
                                          horse {
                                            _id
                                            name
                                          }
                                    }
                    }`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RIDER_TO_LESSON = gql`
mutation addRidertoLesson( $rider: RiderData!) {
    addRidertoLesson(rider: $rider) {
        FirstName
        LastName
        phone
        email
    }
}

`;

export const ADD_HORSE_TO_LESSON = gql`
mutation addHorsetoLesson( $horse: HorseData!) {
    addHorsetoLesson(horse: $horse) {
        name
        lessonCount
        lessonLimit
    }
}
`;

export const ADD_INSTRUCTOR_TO_LESSON = gql`
mutation addInstructortoLesson( $instructor: InstructorData) {
    addInstructortoLesson(instructor: $instructor) {
        FirstName
        LastName        
    }
}
`;
export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;


export const CREATE_HORSE = gql`
mutation createHorse(
    $name: String
    $lessonCount: Int
    $lessonLimit: Int
){
  createHorse ( 
      name: $name,
      lessonCount: $lesonCount,
      lessonLimit: $lessonLimit
  ){
    horse {
      _id
      name
      lessonCount
      lessonLimit
    }
  }
}
`;

export const CREATE_INSTRUCTOR = gql`
mutation createInstructor(
    $FirstName: String!
    $LastName: String!
    
){
  createInstructor ( 
    firstname: $FirstName
    lastname: $LastName
  ){
    Instructor {
      _id
      FirstName
      LastName
    }
  }
}
`;