export type Token = {
  sub?: string;
  email?: string;
  name?: string;
};

export default async function addUser(token: Token) {
  console.log('My token is: ' + JSON.stringify(token));

  const initialString = JSON.stringify({
    operationName: 'InsertUserMutation',
    query: `mutation InsertUserMutation($token: String, $name: String) { insert_user_one(object: { token: $token, name: $name}) {  token name  } }`,
    variables: { token: token.sub, name: token.name },
  });

  await fetch('http://localhost:8080/v1/graphql', {
    method: 'post',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': 'password',
    },

    body: initialString,
  })
    .then((response) => {
      console.log('The response is: ' + JSON.stringify(response));
    })
    .catch((error) => {
      console.log('The error is :' + error);
    });
}
