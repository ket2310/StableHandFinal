import React, { useState } from 'react';
import MainContainer from './components/MainContainer';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token
// to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  const [currentPg, setPage] = useState('HomePage');
  const [farmName, setFarm] = useState('Fox Hill Farms');
  const [task, setTask] = useState('Welcome to your stable hand!')
  return (
    <div>
      <ApolloProvider client={client}>
        <MainContainer
          currentPg={currentPg} setPage={setPage} farmName={farmName} setFarm={setFarm} task={task} setTask={setTask}>
        </MainContainer>
      </ApolloProvider>
    </div>
  );
}

export default App;
