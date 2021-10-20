import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, } from '@apollo/client';
// import { getToken } from 'next-auth/jwt';

import { getSession, signIn, signOut, useSession } from 'next-auth/react'


import cookie from 'js-cookie'


// async function getSessionToken(name) {

//   const session = await getSession()


// }

// const getToken = () => {
//   let token = null
//   if(typeof document !== 'undefined') {
//     token = 'Bearer ' + cookie.get('token')
//     console.log("The token is: " + token)
//   }

//   return token
// }


// const secret = process.env.SECRET
// const getFinalToken = async (req, res) => {
//   const token = await getToken({ req, secret })
//   if (token) { console.log("JSON Web Token", JSON.stringify(token, null, 2)) } else { res.status(401) } res.end()
// }


// const { dat a: session, status } = useSession()

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // const token = getCookie("next-auth.session-token")
  // const token = localStorage.getItem("next-auth.session-token")
  // const session = await getSession()



  const token = sessionStorage.getItem("next-auth.session-token")

  // console.log("The token sent is: " + session.id)

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      // authorization: getToken()
      authorization: 'Bearer ' + token
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});


const httpLink = new HttpLink(
  {
    uri: "http://localhost:8080/v1/graphql",
    credentials: 'same-origin'
  })

const client = new ApolloClient({
  connectToDevTools: process.browser,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;




