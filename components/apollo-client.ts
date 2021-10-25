import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  credentials: 'same-origin',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = fetch('/api/hello').then((response) => response.json());
  console.log('hello', token);
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      // authorization: getToken()
      authorization: 'Bearer ' + token,
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
