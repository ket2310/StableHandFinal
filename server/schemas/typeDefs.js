const { gql } = require('apollo-server-express');

const typeDefs = gql`

    scalar date  

    type Lesson {
        _id: ID
        lessonDate: date
        startTime: String
        endTime: String
        duration: Int
        rider:  Rider!
        instructor: Instructor!
        horse: Horse!
    }

    type User {
        _id: ID!
        username: String
        email: String
        password: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Horse{
        _id: ID!
        name: String
        lessonCount: Int
        lessonLimit: Int        
    }    

    input HorseData {
        _id: ID!
        name: String
        lessonCount: Int
        lessonLimit: Int  
    }

    type Instructor {
        _id: ID!
        firstName: String
        lastName: String
    }

    input InstructorData {
        _id: ID!
        firstName: String
        lastName: String
    }
    type Rider {
        _id: ID!
        firstName: String
        lastName: String
        phone: String
        email: String
    }
  
    input RiderData {
        _id: ID
        firstName: String
        lastName: String
        phone: String
        email: String
    }
    
    type Query {
        users: [User]
        user(_id: ID!): User
        me: User
                
        lesson(_id: ID!): Lesson        

        instructors: [Instructor]
        instructor(_id: ID!): Instructor

        horses: [Horse]
        horse(_id: ID!): Horse

        riders: [Rider]
        rider(_id: ID!): Rider
        
    }
 
    type Mutation {
        createUser(
            username: String!, 
            email: String!, 
            password: String!
        ): 
        Auth
        login(email: String!, password: String!): Auth

        createRider (
            firstName: String!,
            LastName: String!
            phone: String!,
            email: String!
        ): Rider

        createInstructor(
            firstName: String!,
            LastName: String!
        ): Instructor

        createHorse(
            name: String
            lessonCount: Int
            lessonLimit: Int            
        ): Horse

        bookLesson(
            lessonDate: date!
            startTime: String!,
            endTime: String!,
            duration: Int!            
        ): Lesson
        
        
        addRidertoLesson( 
            rider: RiderData
        ): Lesson

        addHorsetoLesson( 
            horse: HorseData
        ): Lesson

        addInstructortoLesson( 
            instructor: InstructorData
        ): Lesson



    }
`;

module.exports = typeDefs;

