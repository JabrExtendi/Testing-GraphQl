import { ApolloClient, InMemoryCache, HttpLink, ApolloLink,  } from '@apollo/client';

import { getSession } from 'next-auth/react'



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const authLink = new ApolloLink( (operation, forward) => {
  // Retrieve the authorization token from local storage.
  // const token = getCookie("next-auth.session-token")
  const token = localStorage.getItem("next-auth.session-token")

  // const session = await getSession()



  // const token = sessionStorage.getItem("next-auth.session-token")

  console.log("The token sent is: " + token)

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});


const httpLink = new HttpLink( {uri: "http://localhost:8080/v1/graphql"})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;




