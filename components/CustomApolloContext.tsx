import * as React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import jwt_decode from 'jwt-decode'
import addUser from '../pages/api/addUser';


function createApolloClient(cache: InMemoryCache) {
  const graphql_url = `http://localhost:8080/v1/graphql`;

  const httpLink = createHttpLink({
    uri: graphql_url,
  });
  

  const authorizationHeaderLink = setContext(async (_, { headers }) => {
    const token = await fetch('/api/getToken');
    const body = await token.json();
    const jwt = body['jwt'];
    const decoded = jwt_decode(jwt)
    addUser(decoded)
    // console.log("Token from CAC: " +JSON.stringify(decoded))
    // console.log('from CustomApolloContext.tsx, token: ', body['jwt']);
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${jwt}`,
      },
    };
  });
  return new ApolloClient({
    link: authorizationHeaderLink.concat(httpLink),
    cache,
  });
}

const CustomAppolloContext: React.FC = ({ children }) => {
  // this hook gets me the token asynchronously
  // token is '' initially but eventually resolves... or not
  const cache = new InMemoryCache();
  const [client, setClient] = React.useState(createApolloClient(cache));

  // first initialize the client without the token, then again upon receiving it
  React.useEffect(() => {
    const initApollo = async () => {
      setClient(createApolloClient(cache));
    };

    initApollo();
  }, []);

  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
};

export default CustomAppolloContext;
