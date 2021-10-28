export type Token = {
    sub: string,
    email: string,
    iat: number,
    exp: number,
    name: string,
    "https://hasura.io/jwt/claims" : {
        "x-hasura-allowed-roles": string[],
        "x-hasura-default-role": string,
        "x-hasura-role": string
    }

};




export default async function addUser(token : Token) {

    console.log("My token is: " + JSON.stringify( token))

    let initialString = JSON.stringify({
        operationName: "InsertUserMutation", query: `mutation InsertUserMutation($token: String, $name: String) { insert_user_one(object: { token: $token, name: $name}) {  token name  } }`, variables: { token: token.sub, name: token.name }
    })

    // console.log(initialString)

    await fetch("http://localhost:8080/v1/graphql", {
        method: "post",
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'password'
        },

        body: initialString
    })
        .then((response) => {
            console.log("The response is: " + JSON.stringify(response))
            console.log("The response is: " + response)
        })
        .catch((error) => {
            console.log("The error is :" + error)
        });
}

