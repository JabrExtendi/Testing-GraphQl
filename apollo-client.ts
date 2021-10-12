import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    //   uri: "http://localhost:4000/graphql"
    uri: "https://countries.trevorblades.com"
});

export default client;